import axios from "axios";
import Allproduct from "../components/allproduct/Allproduct";
import { Providers } from "../providers";
import { Suspense } from "react";
// import { notFound } from "next/navigation";

export default async function Product() {
  // const baseURL = process.env.NEXT_PUBLIC_API_URL;

  // const { data } = await axios.get(`${baseURL}/api/allproducts/`);

  return (
    <Providers>
      <Allproduct />
    </Providers>
  );
}
