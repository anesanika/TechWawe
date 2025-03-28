import Allproduct from "../components/allproduct/Allproduct";
import { Providers } from "../providers";
import { Suspense } from "react";

export default async function Product() {
  return (
    <Providers>
      <Suspense fallback={<>loading..</>}>
        <Allproduct />
      </Suspense>
    </Providers>
  );
}
