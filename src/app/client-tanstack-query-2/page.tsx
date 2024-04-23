import TodoList2 from "@/components/Todo/TodoList2";
import Link from "next/link";
import { Suspense } from "react";

export default async function ClientTanstackQuery2() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/client-tanstack-query">go to client-tanstack-query</Link>
      <Suspense fallback={"loading!!!"}>
        <TodoList2 />
      </Suspense>
    </main>
  );
}
