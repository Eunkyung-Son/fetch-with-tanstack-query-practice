import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { QUERY_KEY_TODO_API } from "@/apis/Todo/Todo.query";
import { todoApi } from "@/apis/Todo/Todo.api";
import TodoList2 from "./TodoList2";

export default async function HydratedTodoList() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY_TODO_API.LIST(),
    queryFn: () =>
      todoApi.todoList({
        params: {
          cache: "force-cache",
        },
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodoList2 />
    </HydrationBoundary>
  );
}
