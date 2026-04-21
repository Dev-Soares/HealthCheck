export default function HomeSkeleton() {
  return (
    <div className="animate-pulse px-4 sm:px-6 py-8 max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="h-3 w-20 rounded-full bg-neutral-200" />
        <div className="h-7 w-64 rounded-full bg-neutral-200" />
        <div className="h-3 w-36 rounded-full bg-neutral-200" />
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-5">
        <div className="space-y-1.5">
          <div className="h-4 w-28 rounded-full bg-neutral-200" />
          <div className="h-3 w-40 rounded-full bg-neutral-200" />
        </div>
        <div className="flex justify-between gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-22 h-22 rounded-full bg-neutral-100" />
              <div className="h-2.5 w-14 rounded-full bg-neutral-200" />
              <div className="h-2 w-12 rounded-full bg-neutral-200" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-4 w-36 rounded-full bg-neutral-200" />
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className="w-10 h-10 rounded-xl bg-neutral-100" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3.5 w-32 rounded-full bg-neutral-200" />
                <div className="h-2.5 w-48 rounded-full bg-neutral-200" />
              </div>
              <div className="h-4 w-10 rounded-full bg-neutral-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
