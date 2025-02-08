"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { urlFor } from "@/sanity/lib/image";
import { FaStar } from "react-icons/fa";
import { useCart } from "../cart/context/CartContext";
import ProductCardSlide from "./ProductComponent/productCardSlider";
import { product } from "@/sanity/schemaTypes/product";
import ProductCard from "./product-card";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["700"] });

interface IProducts {
  _id: string;
  title: string;
  description: string;
  productImage: {
    asset: {
      _ref: string;
      _type: "image";
    };
  };
  price: number;
  dicountPercentage: number;
  tags: string[];
}

const ProductDetails = ({ slug }: { slug: string }) => {
  const [result, setResult] = useState<IProducts | null>(null) as any;
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!result) return;
    addToCart(result);
  };

  // Array of colors to use
  const colors = [
    { name: "blue", class: "bg-myBlue" },
    { name: "green", class: "bg-myDarkGreen" },
    { name: "orange", class: "bg-myOrange" },
    { name: "dark", class: "bg-myDark" },
  ];

  const handleColorChange = (colorClass: string) => {
    setSelectedColor(colorClass);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!slug) return;
      setLoading(true);

      try {
        // Query product by _id
        const query = `*[_type == "product" && _id == "${slug}"][0]`;
        const data = await client.fetch(query);

        console.log("Fetched Data:", data);
        setResult(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          aria-label="Loading..."
        ></div>
      </div>
    );
  }

  if (!result) {
    return (
      <p
        className={`${montserrat.className} text-center text-3xl font-semibold text-gray-800`}
      >
        Product not found
      </p>
    );
  }

  // Calculate discounted price
  const discountedPrice = (
    result.price -
    (result.price * result.dicountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="p-2 hover:shadow-lg transition-shadow">
      <ProductCardSlide />

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src={urlFor(result.productImage.asset).url()}
            alt={`Main Image ${result.title}`}
            className="w-full h-auto lg:w-[450px] lg:h-[500px] object-contain rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
            width={506}
            height={450}
            priority
          />
        </div>

        {/* Details Section */}
        <div className="space-y-2">
          <h1
            className={`${montserrat.className} text-3xl font-semibold text-gray-800`}
          >
            {result.title}
          </h1>
          <p className="text-gray-600 p-5 mr-4  flex justify-center text-justify bg-blue-300  rounded-lg  shadow-lg border-5-black">
            {result.description}
          </p>

          <div className="flex items-center space-x-2">
            {[...Array(4)].map((_, index) => (
              <FaStar key={index} className="text-yellow-400" />
            ))}
            <FaStar className="text-gray-300" />
            <span className="text-gray-500">(10 Reviews)</span>
          </div>

          <div className="flex space-x-6">
            <span className="text-xl font-bold text-green-600">
              ${discountedPrice}
            </span>

            <span className="line-through text-gray-500 text-lg">
              ${result.price}
            </span>
          </div>

          <div className="flex space-x-3">
            {colors.map((color) => (
              <div
                key={color.name}
                onClick={() => handleColorChange(color.class)}
                className={`w-8 h-8 rounded-full cursor-pointer ${color.class} ${selectedColor === color.class ? "ring-4 ring-myBlue" : ""}`}
                title={color.name}
              />
            ))}
          </div>
          <button
            onClick={() => handleAddToCart()}
            className="mt-4 bg-blue-500 text-white text-sm py-2 font-medium px-4 ml-5 rounded hover:bg-gray-800"
          >
            Add To Cart
          </button>
        </div>
      </div>
      <ProductCard />
    </div>
  );
};

export default ProductDetails;
