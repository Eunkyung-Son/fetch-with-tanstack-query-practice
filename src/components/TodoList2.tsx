"use client";

import { useTodosListQuery } from "@/apis/Todos/Todos.query";

const TodoList2 = () => {
  const { data: todos } = useTodosListQuery({
    options: {
      staleTime: 1000 * 5,
      suspense: true,
    },
  });

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

export default TodoList2;
