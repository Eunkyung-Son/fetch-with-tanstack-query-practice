"use client";

import revalidate from "@/actions/revalidate";
import { TodosType } from "@/apis/@types/data-contracts";
import {
  QUERY_KEY_BANNER_API,
  useTodosListQuery,
} from "@/apis/Todos/Todos.query";
import { useQueryClient } from "@tanstack/react-query";
import { revalidateTag } from "next/cache";
import { use } from "react";

interface TodoListProps {
  todosPromise: Promise<TodosType[]>;
}
const TodoList = ({ todosPromise }: TodoListProps) => {
  const queryClient = useQueryClient();
  const todos = use(todosPromise);

  const handleClick = () => {
    revalidate();
    queryClient.invalidateQueries({
      queryKey: QUERY_KEY_BANNER_API.LIST(),
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center,",
        border: "1px solid white",
        flexDirection: "column",
      }}
    >
      <button onClick={handleClick}>revalidate</button>
      {todos?.map(({ userId, title, completed }) => (
        <div
          key={`${userId}-${title}`}
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <p>{userId}</p>
          <p>{title}</p>
          <p>{completed}</p>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
