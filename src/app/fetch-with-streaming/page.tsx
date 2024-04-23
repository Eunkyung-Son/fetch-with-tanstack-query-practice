import { todoApi } from "@/apis/Todo/Todo.api";
import TodoList from "@/components/Todo/TodoList";
import Link from "next/link";
import { Suspense } from "react";

export default async function FetchWithStreaming() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1>fetch with streaming</h1>
      <Link href="/">go to home</Link>
      <section className="flex min-h-screen flex-row p-24">
        <Suspense fallback={"loading...."}>
          <TodoList
            todosPromise={todoApi.todoList({
              params: {
                cache: "force-cache",
                next: {
                  tags: ["todo"],
                },
              },
            })}
          />
        </Suspense>
      </section>
    </main>
  );
}
