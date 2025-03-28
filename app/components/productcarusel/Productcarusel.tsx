"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductType } from "@/app/types/productTpyes";
import { Productcard } from "../productcard/Productcard";
import { useGetProductsQuery } from "@/app/redux/apiSlice";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export const Productcarusel = () => {
  const { data: products } = useGetProductsQuery(null);
  const [filtered, setFiltered] = useState<ProductType[]>([]);
  const searchParam = useSearchParams();
  const [productCat, setProductCat] = useState("");
  useEffect(() => {
    if (!products) return;

    let filteredProducts = [...products];

    const prodId = searchParam.get("pId");
    if (prodId) {
      const id = Number(prodId);

      const productToExclude = products.find((p: ProductType) => p.id === id);

      setProductCat(productToExclude.categories[0].name.toLowerCase());

      filteredProducts = filteredProducts.filter(
        (product: ProductType) => product.id !== id
      );
    }

    if (productCat) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.categories[0]?.name.toLowerCase() === productCat.toLowerCase()
      );
    }

    setFiltered(filteredProducts);
  }, [productCat, products, searchParam]);

  return (
    <div className="mt-7">
      <h1 className="px-7 font-bold fotn-[roboto] text-2xl text-[#3f8f1a]">
        Same Products :
      </h1>
      {filtered.length !== 0 ? (
        <>
          <Swiper spaceBetween={20} slidesPerView={5}>
            {filtered?.map((item: ProductType) => (
              <SwiperSlide key={item.id}>
                <Productcard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <h1 className="text-center mt-35 text-6xl font-bold text-[#00000033] font-[roboto] max-[800px]:text-4xl">
          Procut Not found
        </h1>
      )}
    </div>
  );
};
