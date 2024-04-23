import HydratedPhotoList from "@/components/Photo/hydratedPhotoList";
import HydratedTodoList from "@/components/Todo/hydratedTodoList";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1>Various examples</h1>
      <Link href="/dehydrate-with-streaming">
        go to dehydrate-with-steaming
      </Link>
      <Link href="/fetch-with-streaming">go to fetch-with-streaming</Link>
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
