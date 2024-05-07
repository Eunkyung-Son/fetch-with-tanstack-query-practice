import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { QUERY_KEY_PHOTO_API } from "@/apis/Photo/Photo.query";
import { photoApi } from "@/apis/Photo/Photo.api";
import PhotoList from "./PhotoList";

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
      <PhotoList />
    </HydrationBoundary>
  );
}
