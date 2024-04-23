"use client";

import revalidate from "@/actions/revalidate";
import { TodoType } from "@/apis/@types/data-contracts";
import { QUERY_KEY_PHOTO_API } from "@/apis/Photo/Photo.query";
import { useQueryClient } from "@tanstack/react-query";
import { use } from "react";

interface TodoListProps {
  photosPromise: Promise<TodoType[]>;
}
const PhotoList = ({ photosPromise }: TodoListProps) => {
  const queryClient = useQueryClient();
  const photos = use(photosPromise);

  const handleClick = () => {
    revalidate();
    queryClient.invalidateQueries({
      queryKey: QUERY_KEY_PHOTO_API.LIST(),
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
      {photos?.map(({ userId, title, completed }) => (
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

export default PhotoList;
