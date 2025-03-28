"use client";
import { useState, useEffect } from "react";
import { ProductType } from "@/app/types/productTpyes";
import { useGetProductsQuery } from "@/app/redux/apiSlice";
import Image from "next/image";
import { CiTrash } from "react-icons/ci";

export const Cart = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery(null);
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (products) {
      const cartIds: number[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const filteredProducts = products?.filter((product: ProductType) =>
        cartIds.includes(product.id)
      );

      setCartProducts(filteredProducts || []);
    }
  }, [products]);

  const handleRemoveFromCart = (id: number) => {
    const cartIds: number[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const updatedCart = cartIds.filter((productId) => productId !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCartProducts((prev) => prev.filter((product) => product.id !== id));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

  return (
    <div className="p-4  mt-34">
      <div className="content">
        <h2 className="font-bold mb-10 font-mono text-amber-500 text-center text-4xl">
          Shopping Cart
        </h2>
        {cartProducts.length === 0 ? (
          <p className="text-center text-2xl text-[#00000038] font-extrabold italic">
            Your cart is empty.
          </p>
        ) : (
          cartProducts.map((product) => {
            const numericSale = product.sale ? Number(product.sale) : 0;
            const salePrice =
              numericSale > 0
                ? product.price * (1 - numericSale / 100)
                : product.price;

            return (
              <div
                key={product.id}
                className="flex items-center justify-between p-2 mt-3 border rounded-md border-gray-200"
              >
                <div className="flex items-center">
                  <div className="w-30 h-30 relative">
                    <Image
                      src={product.images[0].image}
                      alt={product.title}
                      fill
                      priority
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-[roboto]">{product.title}</p>
                    {numericSale > 0 ? (
                      <>
                        <p className="text-gray-400 italic text-[14px] line-through">
                          ${product.price.toFixed(2)}
                        </p>
                        <p className="text-green-500 text-2xl font-bold">
                          ${salePrice.toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p className="text-green-500 text-2xl font-bold">
                        ${product.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(product.id)}
                  className="bg-red-300 text-red-700 text-2xl p-2 mr-3 rounded-lg cursor-pointer border border-red-500"
                  title="Remove"
                >
                  <CiTrash />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
