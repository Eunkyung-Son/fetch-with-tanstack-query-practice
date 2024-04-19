import { todosApi } from "@/apis/Todos/Todos.api";
import { QUERY_KEY_BANNER_API } from "@/apis/Todos/Todos.query";
import TodoList from "@/components/TodoList";
import HydratedTodos from "@/components/hydratedTodoList";
import { QueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY_BANNER_API.LIST(),
    queryFn: () =>
      todosApi.todosList({
        params: {
          cache: "no-store",
        },
      }),
  });
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <Link href="/">home</Link>

      {/* <Suspense fallback={"loading...."}>
        <TodoList
          todosPromise={todosApi.todosList({
            params: {
              cache: "force-cache",
              next: {
                tags: ["todos"],
              },
            },
          })}
        />
      </Suspense> */}
      <Suspense fallback={"loading@@@@@@@@@@@@@@@@@@@@@@@@@@@"}>
        {/* @ts-expect-error Async Server Component */}
        <HydratedTodos />
      </Suspense>
    </main>
  );
}
