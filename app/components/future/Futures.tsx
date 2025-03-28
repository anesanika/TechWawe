"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "@/app/redux/apiSlice";
import { Productcard } from "../productcard/Productcard";
import { ProductType } from "@/app/types/productTpyes";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Futures() {
  const { data: products } = useGetProductsQuery(null);
  const [saleProduct, setSaleProduct] = useState<ProductType[]>([]);
  const [bannerImage, setBannerImage] = useState<
    { id: number; path: string }[]
  >([]);

  useEffect(() => {
    const getSomething = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/bannerImage/"
        );

        setBannerImage(data);
      } catch (e) {
        console.error(e);
      }
    };
    getSomething();
  }, []);
  useEffect(() => {
    if (products) {
      const filtered = products.filter(
        (product: ProductType) => product.sale == 30
      );
      setSaleProduct(filtered);
    }
  }, [products]);
  return (
    <div className="w-full mt-10 max-[1300px]:px-1">
      <div className="content">
        <div className="w-full h-[300px] relative overflow-hidden rounded-md max-[500px]:h-[200px]">
          {bannerImage.length > 0 && bannerImage[0].path && (
            <Image
              src={bannerImage[0].path}
              fill
              // style={{ objectFit: "cover", }}
              className="object-cover max-[650px]:object-contain max-[500px]:object-cover"
              alt="future-banner"
              priority
            />
          )}
        </div>
        <div className="my-10">
          <Swiper
            spaceBetween={20}
            slidesPerView={5}
            breakpoints={{
              160: { slidesPerView: 1, spaceBetween: 10 },
              540: { slidesPerView: 3, spaceBetween: 20 },
              640: { slidesPerView: 4, spaceBetween: 20 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
            }}
          >
            {saleProduct.map((item) => (
              <SwiperSlide key={item.id}>
                <Productcard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
