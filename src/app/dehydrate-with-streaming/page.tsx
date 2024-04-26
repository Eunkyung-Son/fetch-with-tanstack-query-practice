import ParentA from "@/components/ParentA";
import HydratedPhotoList from "@/components/Photo/hydratedPhotoList";
import { RenderingPageSkeleton } from "@/components/RenderingPageSkeleton";
import { SkeletonCard } from "@/components/SkeletonCard";
import Link from "next/link";
import { Suspense } from "react";

export default async function DehydrateWithStreaming() {
  return (
    <main className="flex min-h-screen h-full flex-row p-24">
      <h1>tanstack-query dehydrate & fetch & streaming</h1>
      <Link href="/">go to home</Link>
      <section className="flex min-h-screen flex-row p-24">
        <Suspense fallback={<SkeletonCard />}>
          <ParentA />
        </Suspense>
        <Suspense fallback={<RenderingPageSkeleton />}>
          <HydratedPhotoList />
        </Suspense>
      </section>
    </main>
  );
}
