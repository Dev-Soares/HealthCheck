export default function FoodSkeleton() {
  return (
    <div className="space-y-4">
      <div className="animate-pulse h-4 w-36 rounded-full bg-neutral-200" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bg-white border border-neutral-200 rounded-2xl p-4 space-y-2.5">
            <div className="animate-pulse h-4 w-3/4 rounded-full bg-neutral-200" />
            <div className="animate-pulse h-3 w-16 rounded-full bg-neutral-200" />
            <div className="animate-pulse h-3.5 w-1/2 rounded-full bg-neutral-200" />
          </div>
        ))}
      </div>
    </div>
  )
}
