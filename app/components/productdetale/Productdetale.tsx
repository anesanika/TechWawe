"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { ProductType } from "@/app/types/productTpyes";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { openModal } from "@/app/redux/modalSlice";

export const Productdetale = () => {
  const getParam = useSearchParams();
  const [product, setProduct] = useState<ProductType>();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const productPrice = Number(product?.price || 999);
  const numericSale = Number(product?.sale);
  const saleNumber = 1 - numericSale / 100;
  const dispatch = useDispatch();

  useEffect(() => {
    const productId = getParam.get("pId");
    const getProdctDetail = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/products/${productId}`
        );
        setProduct(data);
      } catch (e) {
        console.log(e);
      }
    };
    getProdctDetail();
  }, [getParam]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const id = getParam.get("pId");
    const updatedCart = [...cart, Number(id)];
    console.log(updatedCart, cart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(openModal());
  };

  return (
    <div>
      <div className="w-full flex justify-between p-5 max-[800px]:flex-col">
        <div className="flex w-[50%] justify-around max-[800px]:w-full">
          <div className="flex flex-col border overflow-auto border-[#0000005b] rounded-md">
            {product?.images.map((photo, index) => (
              <Image
                key={index}
                className={`border cursor-pointer transition-all rounded-lg ${
                  activeIndex === index
                    ? "border-[#60d81a]"
                    : "border-[#0000003b]"
                }`}
                onClick={() => setActiveIndex(index)}
                src={
                  photo?.image ||
                  "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg"
                }
                alt={product?.title}
                width={100}
                height={100}
              />
            ))}
          </div>
          <div className="border border-[#0000005b] p-6 rounded-md">
            <Image
              src={
                product?.images[activeIndex].image ||
                "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg"
              }
              alt="mianImage"
              width={400}
              height={400}
            />
          </div>
        </div>

        <div className="w-[50%] flex flex-col justify-between p-2 max-[800px]:w-full mt-10">
          <div className="w-full flex flex-col justify-center h-[80%]">
            <div className="mb-8">
              <h1 className="text-4xl font-bold font-[roboto]">
                {product?.title}
              </h1>
            </div>
            <div className="flex gap-2">
              {numericSale > 0 ? (
                <div className="flex gap-2 my-2">
                  <h1 className="text-2xl text-[#0b8548] font-bold">
                    ${productPrice * saleNumber}
                  </h1>
                  <h5 className="text-[#d61616] line-through italic text-[15px]">
                    ${product?.price}
                  </h5>
                </div>
              ) : (
                <h1 className="text-2xl text-[#0b8548] font-bold">
                  ${productPrice}
                </h1>
              )}
            </div>
            <div className="my-3">
              <Link
                href={`/products?category=${product?.categories[0].name.toLocaleLowerCase()}`}
                className="bg-[#63e91571] p-2 rounded-full text-[13px] text-[green]"
              >
                {product?.categories[0].name}
              </Link>
            </div>
            <div className="my-3">
              <h2 className="text-[#0000009f] my-2 text-[15px]">
                {product?.description}
              </h2>
            </div>
          </div>
          <button
            className="w-full bg-[#00c950] rounded-lg font-[roboto] font-bold py-2 cursor-pointer text-white hover:scale-95 transition-all"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
