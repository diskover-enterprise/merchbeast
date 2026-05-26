'use client'

import { use, useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Product, Restaurant } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import { ProductCard } from '@/components/storefront/ProductCard'

async function fetchData(slug: string, productId: string) {
  const [rRes, pRes] = await Promise.all([
    fetch(`/api/restaurants/${slug}`),
    fetch(`/api/restaurants/${slug}/products`),
  ])
  if (!rRes.ok) return null
  const restaurant: Restaurant = await rRes.json()
  const products: Product[] = await pRes.json()
  const product = products.find((p) => p.id === productId) ?? null
  const related = products.filter((p) => p.id !== productId).slice(0, 4)
  return { restaurant, product, related }
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>
}) {
  const { slug, productId } = use(params)
  const { addItem } = useCart()
  const [data, setData] = useState<{ restaurant: Restaurant; product: Product; related: Product[] } | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    fetchData(slug, productId).then((d) => {
      if (!d || !d.product) notFound()
      setData(d as { restaurant: Restaurant; product: Product; related: Product[] })
    })
  }, [slug, productId])

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-0">
          <div className="aspect-square bg-[#E0DFDB]" />
          <div className="px-8 py-20 space-y-4">
            <div className="h-3 bg-[#E0DFDB] rounded w-1/4" />
            <div className="h-10 bg-[#E0DFDB] rounded w-3/4 mt-4" />
            <div className="h-5 bg-[#E0DFDB] rounded w-1/4 mt-2" />
            <div className="h-px bg-[#E0DFDB] mt-6" />
            <div className="h-4 bg-[#E0DFDB] rounded w-full mt-4" />
            <div className="h-4 bg-[#E0DFDB] rounded w-2/3" />
            <div className="h-14 bg-[#E0DFDB] rounded mt-8" />
          </div>
        </div>
      </div>
    )
  }

  const { restaurant, product, related } = data

  function handleAdd() {
    addItem({
      productId: product.id,
      restaurantId: restaurant.id,
      restaurantSlug: restaurant.slug,
      restaurantName: restaurant.name,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? null,
      quantity: qty,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-0">
        <Link
          href={`/restaurants/${restaurant.slug}`}
          className="text-xs tracking-[0.2em] uppercase text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors"
        >
          ← {restaurant.name}
        </Link>
      </div>

      {/* Product layout */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-0">
        {/* Left — images */}
        <div>
          <div className="aspect-square overflow-hidden bg-[#F0EFEC] relative">
            {product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-[#F0EFEC]" />
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 p-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 overflow-hidden border transition-colors ${
                    selectedImage === i
                      ? 'border-[var(--color-primary)]'
                      : 'border-transparent hover:border-[#E0DFDB]'
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — purchase panel */}
        <div className="md:sticky md:top-14 md:self-start px-6 py-10 md:px-8 md:py-20 flex flex-col">
          {/* Category */}
          <span className="text-xs tracking-[0.2em] uppercase text-[#6B6B6B]">
            {product.category}
          </span>

          {/* Name */}
          <h1
            className="font-[family-name:var(--font-display)] font-light leading-[1.05] mt-2"
            style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', color: 'var(--color-primary)' }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <p className="text-xl font-medium mt-2" style={{ color: 'var(--color-primary)' }}>
            {formatCurrency(product.price)}
          </p>

          {/* Divider */}
          <div className="h-px bg-[#E0DFDB] my-6" />

          {/* Description */}
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            {product.description}
          </p>

          {/* Stock status */}
          <p className={`text-xs tracking-wider uppercase mt-4 ${product.stock > 0 ? 'text-[#6B6B6B]' : 'text-red-500'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          {/* Quantity */}
          {product.stock > 0 && (
            <div className="flex items-center gap-3 mt-6">
              <span className="text-xs tracking-[0.2em] uppercase text-[#6B6B6B]">Qty</span>
              <div className="flex items-center border border-[#E0DFDB]">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 flex items-center justify-center hover:bg-[#F8F7F4] transition-colors text-sm font-medium"
                  style={{ color: 'var(--color-primary)' }}
                >
                  −
                </button>
                <span
                  className="w-10 text-center text-sm font-medium"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="w-9 h-9 flex items-center justify-center hover:bg-[#F8F7F4] transition-colors text-sm font-medium"
                  style={{ color: 'var(--color-primary)' }}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="mt-8 w-full border py-4 text-sm tracking-[0.2em] uppercase font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              borderColor: 'var(--color-primary)',
              color: added ? 'var(--color-secondary)' : 'var(--color-primary)',
              backgroundColor: added ? 'var(--color-primary)' : 'transparent',
            }}
            onMouseEnter={(e) => {
              if (product.stock > 0 && !added) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-primary)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-secondary)'
              }
            }}
            onMouseLeave={(e) => {
              if (!added) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary)'
              }
            }}
          >
            {added ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs tracking-[0.2em] uppercase font-medium text-[#6B6B6B] mb-10">
              You May Also Like
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} restaurant={restaurant} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
