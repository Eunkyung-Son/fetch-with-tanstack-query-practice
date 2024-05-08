import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import PhotoList from "./PhotoList";
import { PhotoPrefetchQuery } from "@/apis/Photo/Photo.prefetchQuery";

export default async function HydratedPhotoList() {
  const queryClient = new QueryClient();
  const photoPrefetchQuery = new PhotoPrefetchQuery(queryClient);

  await photoPrefetchQuery.usePhotoListPrefetchQuery();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PhotoList />
    </HydrationBoundary>
  );
}
