"use client"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const ProductCardSkeleton = () => {
  return (
    <Card className="px-4 pb-3 relative">
      <div className="flex flex-col items-start gap-0.5 w-full">
        <div className="rounded-lg w-full h-52 flex items-center justify-center">
          <Skeleton className="w-4/5 h-4/5 md:w-full md:h-full" />
        </div>

        <Skeleton className="w-1/3 h-3 mt-2" />
        <Skeleton className="w-full h-5 mt-1" />

        <div className="flex items-center gap-1.5 mt-1 w-full">
          <Skeleton className="w-6 h-3" />
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-3.5 w-3.5 rounded-full" />
            ))}
          </div>
          <Skeleton className="w-8 h-3" />
        </div>

        <div className="flex items-center pt-1 gap-2">
          <Skeleton className="w-16 h-5" />
          <Skeleton className="w-12 h-4" />
        </div>

        <div className="max-sm:hidden mt-2 w-full">
          <Skeleton className="h-9 w-full rounded-full" />
        </div>
      </div>
    </Card>
  )
}

export default ProductCardSkeleton
