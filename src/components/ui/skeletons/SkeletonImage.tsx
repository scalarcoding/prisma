import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonImage() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-full w-full rounded-xl" />
    </div>
  )
}
