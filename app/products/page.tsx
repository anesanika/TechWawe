import Allproduct from "../components/allproduct/Allproduct";
import { Providers } from "../providers";

export default async function Product() {
  return (
    <Providers>
      <Allproduct />
    </Providers>
  );
}
