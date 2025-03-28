"use client";

import { Productcard } from "../productcard/Productcard";
import { ProductType, CategoriesType } from "@/app/types/productTpyes";
import { useRouter, useSearchParams } from "next/navigation";
import { RxReset } from "react-icons/rx";
import { CiFilter } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Allproduct() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filtredProduct, setFiltredProduct] = useState<ProductType[]>([]);
  const [allCategories, setAllCategories] = useState<CategoriesType[]>([]);
  const [radioValue, setRadioValue] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState("");

  const [price, setPrice] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_API_URL;
        const { data } = await axios.get(`${baseURL}/api/allproducts/`);
        setProducts(data);
        setFiltredProduct(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/caregories/`
        );
        setAllCategories(data);
      } catch (e) {
        console.error(e);
      }
    };
    getAllCategories();
  }, []);

  useEffect(() => {
    if (!products.length) return;

    const category = searchParam.get("category");
    const minPrice = searchParam.get("min-price");
    const maxPrice = searchParam.get("max-price");
    const sort = searchParam.get("sort");

    let filtered = products;

    // Filter by category if exists
    if (category && category !== "all") {
      filtered = filtered.filter(
        (product) => product.categories[0].name.toLowerCase() === category
      );
    }

    // Filter by price range
    filtered = filtered.filter((product) => {
      const finalPrice = product.sale
        ? product.price - (product.price * product.sale) / 100
        : product.price;

      return (
        (!minPrice || finalPrice >= Number(minPrice)) &&
        (!maxPrice || finalPrice <= Number(maxPrice))
      );
    });

    // Sort if a sort option exists
    if (sort) {
      filtered = [...filtered].sort((a, b) => {
        const priceA = a.sale ? a.price - (a.price * a.sale) / 100 : a.price;
        const priceB = b.sale ? b.price - (b.price * b.sale) / 100 : b.price;

        if (sort === "lth") return priceA - priceB;
        if (sort === "htl") return priceB - priceA;
        return 0;
      });
    }

    setFiltredProduct(filtered);
  }, [searchParam, products]);

  const setFilter = () => {
    const queryParams = new URLSearchParams();
    if (radioValue) queryParams.set("category", radioValue);
    if (price.min) queryParams.set("min-price", price.min.toString());
    if (price.max) queryParams.set("max-price", price.max.toString());
    if (selectValue) queryParams.set("sort", selectValue);
    router.push(`?${queryParams.toString()}`);
    setShowFilter(false);
  };

  const clearFilter = () => {
    setPrice({ max: 0, min: 0 });
    setShowFilter(false);
    router.push("/products");
  };

  return (
    <div className="mt-30">
      <div className="content p-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="p-2 mb-1 border border-green-400 rounded-lg text-green-500 text-[20px] hover:bg-green-400 hover:text-white transition-all "
        >
          <CiFilter />
        </button>
        <div className="flex max-[770px]:flex-col">
          <AnimatePresence>
            {showFilter && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 300 }}
                exit={{ opacity: 0, width: 0 }}
                className="flex flex-col justify-between overflow-hidden max-h-[700px] min-h-[450px] mr-10 border border-neutral-200 left-0  p-4 z-[50] max-[770px]:w-full! "
              >
                <div className="flex flex-col gap-3">
                  <select
                    defaultValue="rel"
                    onChange={(e) => setSelectValue(e.target.value)}
                    className="p-2 border border-neutral-300 rounded-md text-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    <option value="rel">Relative</option>
                    <option value="htl">High to Low</option>
                    <option value="lth">Low to High</option>
                  </select>
                  <div className="flex flex-col gap-2">
                    <input
                      type="number"
                      placeholder="Min Price"
                      onChange={(e) =>
                        setPrice((prev) => ({
                          ...prev,
                          min: Number(e.target.value),
                        }))
                      }
                      className="p-2 border border-neutral-300 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      onChange={(e) =>
                        setPrice((prev) => ({
                          ...prev,
                          max: Number(e.target.value),
                        }))
                      }
                      className="p-2 border border-neutral-300 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        id={"all"}
                        onChange={() => setRadioValue("")}
                        value={"all"}
                        defaultChecked
                        className="peer hidden"
                      />
                      <span className="rounded-[100%] w-4 h-4 border border-gray-400 peer-checked:bg-amber-300" />
                      <label htmlFor={"All"} className="cursor-pointer ml-2">
                        {"All"}
                      </label>
                    </div>
                    {allCategories.map((cat) => (
                      <div key={cat.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          id={cat.name}
                          onChange={() => setRadioValue(cat.name.toLowerCase())}
                          value={cat.name.toLowerCase()}
                          className="peer hidden"
                        />
                        <span
                          className="rounded-[100%] w-4 h-4 border border-gray-400 peer-checked:bg-amber-300"
                          id={cat.name}
                        />
                        <label
                          htmlFor={cat.name}
                          className="cursor-pointer ml-2"
                        >
                          {cat.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    className="bg-green-600 w-[70%] py-1 text-[20px] text-white rounded-sm"
                    onClick={setFilter}
                  >
                    Filter
                  </button>
                  <button
                    onClick={clearFilter}
                    className="w-[25%] bg-red-500 grid place-content-center rounded-md text-white"
                  >
                    <RxReset />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex w-full gap-6 flex-wrap justify-center">
            {filtredProduct.map((item) => (
              <Productcard {...item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
