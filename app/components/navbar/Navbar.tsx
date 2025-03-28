"use client";
import Link from "next/link";
import { useGetProductsQuery } from "@/app/redux/apiSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductType } from "@/app/types/productTpyes";
import { Searchcard } from "../searchcard/Searchcard";
import { motion } from "framer-motion";
import Cartmodal from "../modals/cartmodal/Cartmodal";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import { useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: products } = useGetProductsQuery(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const { data: session }: any = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!searchValue) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products?.filter((product: ProductType) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredProducts(filtered || []);
  }, [searchValue, products]);

  return (
    <nav className="bg-[#b4cf54] w-full fixed top-0 left-0 z-[99] shadow-md">
      <Cartmodal />
      <div className="w-full p-1 bg-neutral-900">
        <Breadcrumbs />
      </div>
      <div className="content px-4 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <Link
          href="/"
          className="font-[roboto] font-extrabold text-2xl md:text-4xl"
        >
          TECHWAWE :
        </Link>

        {/* Search Bar for desktop */}
        <div className="hidden md:block w-[50%] relative">
          <input
            type="search"
            className="bg-white rounded-lg w-full p-3 outline-none font-[roboto] font-bold"
            placeholder="Search For Anything"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue !== "" && (
            <motion.div
              className="absolute top-14 left-0 w-full min-h-2 flex flex-col gap-1 bg-white p-2 rounded-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {filteredProducts?.map((item: ProductType) => (
                <Searchcard
                  key={item.id}
                  title={item.title}
                  category={item.categories[0].name}
                  url={`/products/${item.title}?pId=${item.id}`}
                  setValueZero={() => setSearchValue("")}
                />
              ))}
              <Link
                href={"/products"}
                className="text-green-600 font-bold font-[roboto] text-sm text-center underline"
              >
                View More
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={26} />}
        </button>

        {/* Mobile Navigation Menu */}
        <motion.div
          className={`absolute top-16 right-0 w-full bg-[#b4cf54] flex flex-col items-center gap-4 font-bold font-[roboto] px-4 py-2 md:hidden ${
            menuOpen ? "block" : "hidden"
          }`}
          initial={{ x: "100%" }}
          animate={{ x: menuOpen ? 0 : "100%" }}
        >
          {/* Search Bar in mobile menu */}
          <div className="w-full p-2 relative">
            <input
              type="search"
              className="bg-white rounded-lg w-full p-3 outline-none font-[roboto] font-bold"
              placeholder="Search For Anything"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue !== "" && (
              <motion.div
                className="absolute top-14 left-0 w-full min-h-2 flex flex-col gap-1 bg-white p-2 rounded-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {filteredProducts?.map((item: ProductType) => (
                  <Searchcard
                    key={item.id}
                    title={item.title}
                    category={item.categories[0].name}
                    url={`/products/${item.title}?pId=${item.id}`}
                    setValueZero={() => setSearchValue("")}
                  />
                ))}
                <Link
                  href={"/products"}
                  className="text-green-600 font-bold font-[roboto] text-sm text-center underline"
                >
                  View More
                </Link>
              </motion.div>
            )}
          </div>

          {/* Navigation Links */}
          <Link
            href="/cart/"
            className="p-2 border border-transparent hover:border-neutral-50 rounded-md transition-all duration-300 relative"
          >
            Cart
          </Link>
          {session?.user ? (
            <Link
              href={"/settings"}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                <Image
                  title="settings"
                  src={
                    session.user.image ||
                    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                  }
                  fill
                  alt={session.user.name || "profile_image"}
                />
              </div>
              <h1
                className="line-clamp-1 text-center first-letter:uppercase"
                title={session.user.name || "..."}
              >
                {session.user.name}
              </h1>
            </Link>
          ) : (
            <Link
              href="/login"
              className="p-2 border border-transparent hover:border-neutral-50 rounded-md transition-all duration-300"
            >
              Log In
            </Link>
          )}
        </motion.div>

        {/* Desktop Navigation Links */}
        <div
          className={`hidden md:flex flex-row items-center gap-4 font-bold font-[roboto] px-4 py-2 md:p-0 transition-all duration-300`}
        >
          <Link
            href="/cart/"
            className="p-2 border border-transparent hover:border-neutral-50 rounded-md transition-all duration-300 relative"
          >
            Cart
          </Link>
          {session?.user ? (
            <Link
              href={"/settings"}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                <Image
                  title="settings"
                  src={
                    session.user.image ||
                    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                  }
                  fill
                  alt={session.user.name || "profile_image"}
                />
              </div>
              <h1
                className="line-clamp-1 text-center first-letter:uppercase"
                title={session.user.name || "..."}
              >
                {session.user.name}
              </h1>
            </Link>
          ) : (
            <Link
              href="/login"
              className="p-2 border border-transparent hover:border-neutral-50 rounded-md transition-all duration-300"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
