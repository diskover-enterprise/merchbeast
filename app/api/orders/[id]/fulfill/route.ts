import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const CHITCHATS_CLIENT_ID = '561262'
const CHITCHATS_API = `https://chitchats.com/api/v1/clients/${CHITCHATS_CLIENT_ID}/shipments`

// HTS codes by product type + material (cotton vs synthetic)
function getHtsCode(productType: string | null, material: string | null): string {
  const mat = (material || '').toLowerCase()
  const isCotton = mat.includes('cotton') || mat === ''
  switch (productType) {
    case 'tshirt':    return isCotton ? '6109.10.00' : '6109.90.10'
    case 'hoodie':    return isCotton ? '6110.20.20' : '6110.30.30'
    case 'crewneck':  return isCotton ? '6110.20.20' : '6110.30.30'
    case 'hat':       return isCotton ? '6505.00.60' : '6505.00.30'
    case 'tote':      return isCotton ? '6305.20.00' : '6305.32.00'
    default:          return '6217.90.00' // misc clothing accessories
  }
}

function parseAddress(address: string) {
  const parts = address.trim().split(', ')
  const country = parts[parts.length - 1].trim()
  const postal = parts[parts.length - 2].trim()
  const province = parts[parts.length - 3].trim()
  const city = parts[parts.length - 4].trim()
  const line1 = parts.slice(0, parts.length - 4).join(', ').trim()
  return { line1, city, province, postal, country }
}

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies()
  if (cookieStore.get('mb-dashboard-auth')?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const apiKey = process.env.CHITCHATS_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'CHITCHATS_API_KEY not configured' }, { status: 500 })

  const order = await prisma.order.findUnique({
    where: { id },
    include: { customer: true, items: true },
  })

  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  if (!order.shippingAddress) return NextResponse.json({ error: 'Order has no shipping address' }, { status: 400 })

  const addr = parseAddress(order.shippingAddress)
  const isUS = addr.country === 'US'
  const valueDollars = (order.total / 100).toFixed(2)

  // Fetch product specs for all items
  const slugs = order.items.map(i => i.productSlug).filter(Boolean) as string[]
  const products = slugs.length > 0
    ? await prisma.merchProduct.findMany({ where: { slug: { in: slugs } } })
    : []
  const productMap = Object.fromEntries(products.map(p => [p.slug, p]))

  // Calculate total weight from per-product weights
  let totalWeightGrams = 0
  for (const item of order.items) {
    const prod = item.productSlug ? productMap[item.productSlug] : null
    const grams = (prod as any)?.weightGrams ?? 0
    totalWeightGrams += grams > 0 ? grams * item.quantity : 250 * item.quantity // fallback 250g
  }
  const weightLbs = totalWeightGrams / 453.592

  const description = order.items.map(i => `${i.productName || '—'} ×${i.quantity}`).join(', ')

  // Build customs items for US shipments
  const customsItems = isUS ? order.items.map(item => {
    const prod = item.productSlug ? productMap[item.productSlug] : null
    const pa = prod as any
    return {
      description: item.productName || 'Clothing',
      quantity: item.quantity,
      value: ((item.priceAtPurchase / 100) / item.quantity).toFixed(2),
      hts_code: getHtsCode(pa?.productType ?? null, pa?.material ?? null),
      country_of_origin: pa?.countryOfOrigin || 'CA',
      cusma: pa?.cusmaCertified ?? false,
    }
  }) : undefined

  const payload: Record<string, any> = {
    to_name: order.customer.name,
    to_address_1: addr.line1,
    to_city: addr.city,
    to_province_code: addr.province,
    to_postal_code: addr.postal,
    to_country_code: addr.country,
    package_contents: 'merchandise',
    description,
    value: valueDollars,
    value_currency: 'cad',
    order_id: order.id,
    order_store: 'Merch Beast',
    package_type: 'thick_envelope',
    size_unit: 'in',
    size_x: 10,
    size_y: 8,
    size_z: 2,
    weight_unit: 'lb',
    weight: Math.max(0.1, parseFloat(weightLbs.toFixed(3))),
    postage_type: 'chit_chats_select',
  }

  if (customsItems) payload.customs_items = customsItems

  const res = await fetch(CHITCHATS_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: `Chit Chats error: ${err}` }, { status: res.status })
  }

  const shipment = await res.json()

  await prisma.order.update({
    where: { id },
    data: {
      status: 'shipped',
      chitchatsId: shipment.id,
      trackingUrl: shipment.tracking_url,
    },
  })

  return NextResponse.json({
    ok: true,
    chitchatsId: shipment.id,
    trackingUrl: shipment.tracking_url,
  })
}
