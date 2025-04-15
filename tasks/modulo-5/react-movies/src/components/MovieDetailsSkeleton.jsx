import { Skeleton } from "./ui/Skeleton";

export default function MovieDetailsSkeleton() {
  return (
    <>
      <div className="relative min-h-[500px] bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="container mx-auto px-4 relative z-10 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <Skeleton className="aspect-[2/3] rounded-lg w-full" />
            </div>

            <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col justify-end">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-6" />

              <div className="flex flex-wrap gap-2 mb-4">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-8 w-20 rounded-full" />
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-1 mx-2" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-1 mx-2" />
                <Skeleton className="h-5 w-24" />
              </div>

              <div className="space-y-4">
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-6 w-48 mb-6" />
        <Skeleton className="h-24 w-full mb-12" />

        <Skeleton className="h-6 w-36 mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex flex-col">
              <Skeleton className="aspect-[2/3] rounded-lg w-full mb-2" />
              <Skeleton className="h-5 w-3/4 mb-1" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 