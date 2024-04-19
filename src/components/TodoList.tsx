"use client";

import { TodosType } from "@/apis/@types/data-contracts";
import { useTodosListQuery } from "@/apis/Todos/Todos.query";
import { use } from "react";

interface TodoListProps {
  todosPromise: Promise<TodosType[]>;
}
const TodoList = ({ todosPromise }: TodoListProps) => {
  const todos = use(todosPromise);

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
