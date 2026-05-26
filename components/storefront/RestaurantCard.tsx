import Link from 'next/link'
import Image from 'next/image'
import { Restaurant } from '@/types'

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link href={`/shop/${restaurant.slug}`} className="group block">
      <div
        className="aspect-[3/2] overflow-hidden relative"
        style={{ backgroundColor: restaurant.primaryColor }}
      >
        {restaurant.bannerImage ? (
          <Image
            src={restaurant.bannerImage}
            alt={restaurant.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full" />
        )}
      </div>
      <div className="pt-4 pb-6">
        <p className="text-sm font-semibold tracking-wide uppercase">{restaurant.name}</p>
        <p className="text-xs text-[#6B6B6B] mt-1 line-clamp-1">{restaurant.description}</p>
        <span className="text-xs tracking-wider uppercase mt-3 inline-block border-b border-[#0A0A0A] hover:opacity-60 transition-opacity">
          Visit Store →
        </span>
      </div>
    </Link>
  )
}
