"use server";

import { PhotoType } from "@/apis/Todo/types/model/photo";
import Image from "next/image";

interface FetchPhotoListProps {
  photos: PhotoType[];
}
/**
 * @description
 * Restricted Items in Server Component
 *
 * - Event listeners
 * - State and Lifecycle Effects
 * - Use of browser-only APIs
 * - Custom hooks that depend on state, effects, or browser-only APIs
 * - React Class components
 */
export default async function FetchPhotoList({ photos }: FetchPhotoListProps) {
  return (
    <div className="flex flex-col gap-2">
      {photos?.map(({ id, albumId, title, url }) => (
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
}
