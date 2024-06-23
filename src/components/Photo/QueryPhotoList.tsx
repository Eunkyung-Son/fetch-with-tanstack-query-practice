"use client";

import { usePhotoListQuery } from "@/apis/Photo/Photo.query";
import Image from "next/image";

interface QueryPhotoListProps {
  isSuspense?: boolean;
}
const QueryPhotoList = ({ isSuspense }: QueryPhotoListProps) => {
  const { data: photoList } = usePhotoListQuery({
    options: {
      staleTime: 1000 * 5,
      suspense: isSuspense,
    },
  });

  return (
    <div className="flex flex-col gap-2">
      {photoList?.map(({ id, albumId, title, url }) => (
        <div
          key={id}
          className="flex flex-row h-36 border border-gray-400 rounded justify-between p-5 items-center gap-4"
        >
          <div className="flex flex-col justify-between flex-1 h-full">
            <p>albumId: {albumId}</p>
            <p>title: {title}</p>
          </div>
          <div className="relative w-16 h-16">
            <Image src={url} alt="image" fill sizes="60px" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QueryPhotoList;
