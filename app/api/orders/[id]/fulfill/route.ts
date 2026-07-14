import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const CHITCHATS_CLIENT_ID = '561262'
const CHITCHATS_API = `https://chitchats.com/api/v1/clients/${CHITCHATS_CLIENT_ID}/shipments`

function parseAddress(address: string) {
  const parts = address.split(', ')
  const country = parts[parts.length - 1]
  const postal = parts[parts.length - 2]
  const province = parts[parts.length - 3]
  const city = parts[parts.length - 4]
  const line1 = parts.slice(0, parts.length - 4).join(', ')
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
  const description = order.items.map(i => `${i.productName || '—'} ×${i.quantity}`).join(', ')
  const valueDollars = (order.total / 100).toFixed(2)

  const payload = {
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
    weight: 0.75,
    postage_type: 'chit_chats_select',
  }

  const res = await fetch(CHITCHATS_API, {
    method: 'POST',
    headers: {
      'Authorization': apiKey,
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
      status: 'fulfilled',
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
