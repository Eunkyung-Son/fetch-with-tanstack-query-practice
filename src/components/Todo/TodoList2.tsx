"use client";

import { useTodoListQuery } from "@/apis/Todo/Todo.query";

const TodoList2 = () => {
  const { data: todos } = useTodoListQuery({
    options: {
      staleTime: 1000 * 5,
      suspense: true,
    },
  });

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid yellow",
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
