import TodoList2 from "@/components/TodoList2";

import Link from "next/link";
import { Suspense } from "react";

export default async function ClientTodo() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/client-todo-2">go to client-todo-2</Link>
      <Suspense fallback={"loading!!!"}>
        <TodoList2 />
      </Suspense>
    </main>
  );
}
