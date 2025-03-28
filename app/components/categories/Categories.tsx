"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Categcard from "../categcard/Categcard";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";
import catImages from "./catImages.json";
import Link from "next/link";

export default function Categories() {
  const [isCategorModal, setIsCategorModal] = useState<boolean>(false);
  const [allCategoeis, setAllCategoris] = useState([]);
  const categoriImage = catImages.catImage;

  useEffect(() => {
    const getAllCategoeis = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/caregories/"
        );
        setAllCategoris(data);
      } catch (e) {
        console.error(e);
      }
    };
    getAllCategoeis();
  }, []);

  return (
    <section>
      <div className="content max-[1300px]:px-1">
        <div className="flex items-center gap-7">
          <button
            className="bg-black rounded-lg p-7 py-10 text-white font-[roboto] max-w-[150px] cursor-pointer"
            onClick={() => setIsCategorModal(true)}
          >
            All Categories
          </button>
          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              160: { slidesPerView: 1, spaceBetween: 0 },
              360: { slidesPerView: 1, spaceBetween: 0 },
              640: { slidesPerView: 3, spaceBetween: 15 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
          >
            {allCategoeis.map((item: any, index: number) => (
              <SwiperSlide key={item?.id}>
                <Categcard title={item?.name} image={categoriImage[index]} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <AnimatePresence>
        {isCategorModal ? (
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full h-screen fixed top-32 z-50"
          >
            <div className="w-full h-[60ch] overflow-y-scroll bg-white p-3 ">
              <div className="content">
                <div className=" w-full flex justify-end p-5">
                  <button
                    className="text-3xl font-bold text-neutral-800 cursor-pointer"
                    onClick={() => setIsCategorModal(false)}
                  >
                    X
                  </button>
                </div>
                <div className="flex flex-wrap gap-7 max-[1250px]:justify-center max-[650px]:grid grid-cols-2 max-[600px]:flex max-[600px]:flex-wrap">
                  {allCategoeis.map((item: any, index: number) => (
                    <Categcard
                      key={item.id}
                      title={item.name}
                      small={true}
                      image={categoriImage[index]}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div
              className="w-full h-full bg-[#00000034]"
              onClick={() => setIsCategorModal(false)}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="mt-2">
        <div className="content flex justify-end p-1">
          <Link
            href={"/products"}
            className="font-[roboto] text-green-700 underline font-bold"
          >
            View More&rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
