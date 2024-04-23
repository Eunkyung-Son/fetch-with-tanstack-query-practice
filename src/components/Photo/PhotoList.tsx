"use client";

import revalidate from "@/actions/revalidate";
import { PhotoType, TodoType } from "@/apis/@types/data-contracts";
import { QUERY_KEY_PHOTO_API } from "@/apis/Photo/Photo.query";
import { useQueryClient } from "@tanstack/react-query";
import { use } from "react";

interface PhotoListProps {
  photosPromise: Promise<PhotoType[]>;
}
const PhotoList = ({ photosPromise }: PhotoListProps) => {
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
        border: "1px solid white",
        flexDirection: "column",
      }}
    >
      <button onClick={handleClick}>revalidate</button>
      {photos?.map(({ id, albumId, title, url }) => (
        <div
          key={id}
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <p>{albumId}</p>
          <p>{title}</p>
          <p>{url}</p>
        </div>
      ))}
    </div>
  );
};

export default PhotoList;
