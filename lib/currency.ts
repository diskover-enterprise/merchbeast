type Priced = { price: string; priceUsd?: number | null }

export function hasUsdPrice(product: Priced) {
  return !!product.priceUsd && product.priceUsd > 0
}

// "$X.XX USD" for US visitors when the product has a USD price; null means show the CAD price as-is
export function usdPriceLabel(product: Priced, isUS: boolean): string | null {
  return isUS && hasUsdPrice(product) ? `$${(product.priceUsd! / 100).toFixed(2)} USD` : null
}

// Price string to feed calcSalePrice, in the same currency the visitor sees
export function salePriceBasis(product: Priced, isUS: boolean): string {
  return isUS && hasUsdPrice(product) ? (product.priceUsd! / 100).toFixed(2) : product.price
}
