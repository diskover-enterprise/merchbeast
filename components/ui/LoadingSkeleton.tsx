export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl overflow-hidden bg-white shadow">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-8 bg-gray-200 rounded w-1/3 mt-2" />
      </div>
    </div>
  )
}

export function RestaurantCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl overflow-hidden bg-white shadow">
      <div className="h-32 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-9 bg-gray-200 rounded mt-2" />
      </div>
    </div>
  )
}
