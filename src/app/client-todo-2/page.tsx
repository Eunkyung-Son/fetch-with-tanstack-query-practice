import TodoList2 from "@/components/TodoList2";

import Link from "next/link";
import { Suspense } from "react";

export default async function ClientTodo2() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/client-todo">go to client-todo</Link>
      <Suspense fallback={"loading!!!"}>
        <TodoList2 />
      </Suspense>
    </main>
  );
}
