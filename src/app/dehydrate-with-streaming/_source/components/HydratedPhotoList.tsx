"use server";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { PhotoPrefetchQuery } from "@/apis/Photo/Photo.prefetchQuery";
import QueryPhotoList from "../../../../components/Photo/QueryPhotoList";

export default async function HydratedPhotoList() {
  const queryClient = new QueryClient();
  const photoPrefetchQuery = new PhotoPrefetchQuery(queryClient);

  photoPrefetchQuery.usePhotoListPrefetchQuery({
    variables: {
      params: {
        cache: "force-cache",
      },
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryPhotoList isSuspense />
    </HydrationBoundary>
  );
}
