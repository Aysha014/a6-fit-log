import { Suspense } from "react";

import Banner from "@/components/homepage/Banner";
import Library from "@/components/homepage/Library";
import LibraryLoading from "@/components/homepage/LibraryLoading";

export default function Home() {
  return (
    <>
      <Banner />

      <Suspense fallback={<LibraryLoading />}>
        <Library />
      </Suspense>
    </>
  );
}