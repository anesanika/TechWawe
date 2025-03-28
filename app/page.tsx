import Categories from "./components/categories/Categories";
import Futures from "./components/future/Futures";
import { Providers } from "./providers";

export default function Home() {
  return (
    <header className="mt-[180px]">
      <Categories />
      <Providers>
        <Futures />
      </Providers>
    </header>
  );
}
