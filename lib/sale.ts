export type ActiveSale = {
  id: string
  name: string
  type: 'percentage' | 'fixed'
  value: number
  scope: 'cart' | 'products'
  productSlugs: string[]
} | null

export function calcSalePrice(priceStr: string, sale: ActiveSale, slug: string): string | null {
  if (!sale) return null
  const applies = sale.scope === 'cart' || sale.productSlugs.length === 0 || sale.productSlugs.includes(slug)
  if (!applies) return null
  const original = parseFloat(priceStr.replace(/[^0-9.]/g, ''))
  if (isNaN(original) || original === 0) return null
  const discounted = sale.type === 'percentage'
    ? original * (1 - sale.value / 100)
    : Math.max(0, original - sale.value / 100)
  return `$${discounted.toFixed(2)}`
}

export function calcSaleDiscountCents(totalCents: number, sale: ActiveSale): number {
  if (!sale) return 0
  return sale.type === 'percentage'
    ? Math.round(totalCents * sale.value / 100)
    : Math.min(sale.value, totalCents)
}
