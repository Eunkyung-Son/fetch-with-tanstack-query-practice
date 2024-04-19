import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { QUERY_KEY_BANNER_API } from "@/apis/Todos/Todos.query";
import { todosApi } from "@/apis/Todos/Todos.api";
import TodoList2 from "./TodoList2";

export default async function HydratedTodos() {
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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodoList2 />
    </HydrationBoundary>
  );
}
