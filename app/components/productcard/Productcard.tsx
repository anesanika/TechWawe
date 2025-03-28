// components/Productcard.tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { ProductType } from "@/app/types/productTpyes";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { openModal } from "@/app/redux/modalSlice";
import { motion, AnimatePresence } from "motion/react";

export const Productcard = ({
  id,
  title,
  categories,
  price,
  description,
  images,
  sale,
}: ProductType) => {
  const [onHover, setOnHover] = useState<number>(0);
  const numericSale = Number(sale);
  const saleNumber = 1 - numericSale / 100;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...cart, id];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(openModal());
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-gray-100 shadow-md w-52 flex flex-col h-[400px] justify-between p-4 rounded-md max-[710px]:w-60 max-[710px]:max-[610px]:w-80 max-[610px]:h-[500px] max-[500px]:w-full max-[500px]:h-[550px]"
      >
        <Link
          href={`/products/${title.toLowerCase()}?pId=${id}`}
          className="flex flex-col items-center justify-center relative"
        >
          {numericSale > 0 ? (
            <h1 className="absolute top-2 left-0 z-40 text-[10px] p-2 rounded-full text-white font-bold  bg-blue-700">
              sale
            </h1>
          ) : null}

          <div
            className="w-full max-w-[330px] relative h-44 max-[620px]:h-62 max-[500px]:h-72 max-[400px]:h-62 max-[400px]:max-w-[270px]"
            onMouseEnter={() => setOnHover(1)}
            onMouseLeave={() => setOnHover(0)}
          >
            <Image
              src={images[onHover].image}
              priority
              alt={title}
              fill
              sizes="50vw"
            />
          </div>
          <div className="w-full">
            <div>
              <p className="text-sm text-[#000000a4]">{categories[0].name}</p>
              <h1
                className="text-md font-bold font-[roboto] break-words line-clamp-1 max-h-6"
                title={title}
              >
                {title}
              </h1>
            </div>
            <div className="flex font-mono">
              {numericSale > 0 ? (
                <>
                  <p className="italic line-through text-[#00000091] text-[12px]">
                    {price}$
                  </p>
                  <h1 className="text-[25px] font-boldn text-blue-600">
                    {price * saleNumber}$
                  </h1>
                </>
              ) : (
                <h1 className="text-[25px] font-bold text-end">{price}$</h1>
              )}
            </div>
            <div className="w-full">
              <p className="text-[#000000b4] text-[13px] font-[roboto] max-h-12 overflow-hidden break-words line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </Link>
        <div className="flex flex-col w-full gap-2 mt-4 justify-end">
          <button
            onClick={handleAddToCart}
            className="bg-green-500 rounded-lg flex items-center justify-center gap-3 py-2 text-gray-200 font-[roboto] cursor-pointer"
          >
            Add To Cart
            <CiShoppingCart />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
