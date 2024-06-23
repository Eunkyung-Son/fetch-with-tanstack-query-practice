import ListSkeleton from "@/components/ListSkeleton";
import ParentA from "app/dehydrate-with-streaming/_source/components/ParentA";
import HydratedPhotoList from "app/dehydrate-with-streaming/_source/components/HydratedPhotoList";
import Link from "next/link";
import { Suspense } from "react";

export default async function DehydrateWithStreamingPage() {
  return (
    <div className="flex flex-col items-center p-6">
      <p className="text-5xl font-bold mb-6">dehydrate with streaming</p>
      <Link href="/" className="text-blue-500 mb-8 hover:underline">
        Go to Home
      </Link>
      <div className="flex w-full max-w-screen-xl gap-10 justify-center flex-wrap">
        <div className="flex flex-col items-center w-full max-w-md">
          <p className="text-2xl font-medium mb-4">Todo List</p>
          <Suspense fallback={<ListSkeleton />}>
            <ParentA />
          </Suspense>
        </div>
        <div className="flex flex-col items-center w-full max-w-md">
          <p className="text-2xl font-medium mb-4">Photo List</p>
          <Suspense fallback={<ListSkeleton />}>
            <HydratedPhotoList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
