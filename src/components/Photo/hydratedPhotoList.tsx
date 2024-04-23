import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import PhotoList2 from "./PhotoList2";
import { QUERY_KEY_PHOTO_API } from "@/apis/Photo/Photo.query";
import { photoApi } from "@/apis/Photo/Photo.api";

export default async function HydratedPhotoList() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY_PHOTO_API.LIST(),
    queryFn: () =>
      photoApi.photoList({
        params: {
          cache: "force-cache",
        },
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PhotoList2 />
    </HydrationBoundary>
  );
}
