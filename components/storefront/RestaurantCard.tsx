import Link from 'next/link'
import Image from 'next/image'
import { Shop } from '@/types'

export function RestaurantCard({ shop }: { shop: Shop }) {
  return (
    <Link href={`/shop/${shop.slug}`} className="group block">
      <div
        className="aspect-[3/2] overflow-hidden relative"
        style={{ backgroundColor: shop.primaryColor }}
      >
        {shop.bannerImage ? (
          <Image
            src={shop.bannerImage}
            alt={shop.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>
      <div className="pt-4 pb-6">
        <p className="text-sm font-semibold tracking-wide uppercase">{shop.name}</p>
        <p className="text-xs text-[#6B6B6B] mt-1 line-clamp-1">{shop.description}</p>
        <span className="text-xs tracking-wider uppercase mt-3 inline-block border-b border-[#0A0A0A] hover:opacity-60 transition-opacity">
          Visit Store →
        </span>
      </div>
    </Link>
  )
}
