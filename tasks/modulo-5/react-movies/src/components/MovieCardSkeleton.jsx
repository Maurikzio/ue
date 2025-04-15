import { Skeleton } from "./ui/Skeleton";

export default function MovieCardSkeleton() {
  return (
    <div className="group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg mb-2">
        <Skeleton className="w-full h-full" />
      </div>
      <Skeleton className="h-5 w-3/4 mb-2" />
      <div className="flex items-center gap-1">
        <Skeleton className="h-3 w-3 rounded-full" />
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-1 mx-2 rounded-full" />
        <Skeleton className="h-3 w-6" />
      </div>
    </div>
  );
} 