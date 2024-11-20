import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[200px] md:w-[150px] xl:w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="min-h-4 min-w-[200px] md:w-[150px] xl:w-[250px]" />
        <Skeleton className="min-h-4 min-w-[200px] md:w-[150px] xl:w-[200px]" />
      </div>
    </div>
  )
}
