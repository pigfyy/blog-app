import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-[900px] rounded-lg px-3 py-10 shadow-2xl min-[585px]:px-10">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div>
              <Skeleton circle={true} height={48} width={48} />
            </div>
            <div>
              <p className="text-base font-normal hover:underline">
                <Skeleton width={100} />
              </p>
              <span className="text-sm text-neutral-500">
                <Skeleton width={100} />
              </span>
              <span className="text-sm text-neutral-500">
                <Skeleton width={45} />
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* <LinkToEdit params={params} />
        <HeartButton params={params} /> */}
          </div>
        </div>
        <h1 className="mt-8 text-5xl font-extrabold">
          <Skeleton width={750} />
        </h1>
        <p className="mt-3 text-lg text-neutral-600">
          <Skeleton count={2} />
        </p>
        <div className="mt-5 mb-5 w-full">
          <Skeleton className="h-96 w-full" />
        </div>
        <Skeleton count={15} />
      </div>
    </div>
  );
}
