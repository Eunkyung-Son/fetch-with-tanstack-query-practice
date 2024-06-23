"use server";

import { TodoPrefetchQuery } from "@/apis/Todo/Todo.prefetchQuery";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import QueryTodoList from "@/components/Todo/QueryTodoList";

export default async function HydratedTodoList() {
  const queryClient = new QueryClient();
  const todoPrefetchQuery = new TodoPrefetchQuery(queryClient);
  todoPrefetchQuery.useTodoListPrefetchQuery({
    variables: {
      params: {
        cache: "force-cache",
      },
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryTodoList isSuspense />
    </HydrationBoundary>
  );
}
