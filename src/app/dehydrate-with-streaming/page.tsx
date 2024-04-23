import HydratedPhotoList from "@/components/Photo/hydratedPhotoList";
import HydratedTodoList from "@/components/Todo/hydratedTodoList";
import Link from "next/link";
import { Suspense } from "react";

export default async function DehydrateWithStreaming() {
  return (
    <main className="flex min-h-screen flex-row p-24">
      <h1>tanstack-query dehydrate & fetch & streaming</h1>
      <Link href="/">go to home</Link>
      <section className="flex min-h-screen flex-row p-24">
        <Suspense fallback={"todo loading!!!"}>
          {/* @ts-expect-error Async Server Component */}
          <HydratedTodoList />
        </Suspense>
        <Suspense fallback={"photo loading!!!"}>
          {/* @ts-expect-error Async Server Component */}
          <HydratedPhotoList />
        </Suspense>
      </section>
    </main>
  );
}
