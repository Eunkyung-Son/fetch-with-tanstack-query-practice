"use client";

import { usePhotoListQuery } from "@/apis/Photo/Photo.query";

const PhotoList2 = () => {
  const { data: photos } = usePhotoListQuery({
    options: {
      staleTime: 1000 * 5,
      suspense: true,
    },
  });

  return (
    <div
      style={{
        display: "flex",
        border: "1px solid white",
        flexDirection: "column",
      }}
    >
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

export default PhotoList2;
