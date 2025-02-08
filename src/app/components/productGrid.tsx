import { product } from "@/sanity/schemaTypes/product";
import Image from "next/image";

export default function ProductGrid({
  product,
  addtoCart,
}: {
  product: Products[];
  addtoCart: (product: Products) => void;
}) {
  return (
    <div className="w-[70%] m-auto grid grid-cols-1 sm:grid-cols2 md:grid-cols-3 gap-12">
        (products.map((product: Product) => (
            <div key={product.slug} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <div className="relative h-40 bg-gray-100 flex items-center justify-center">
                    <Image 
                    src={product.image_url}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                    className="p-4"
                    />
                    </div>
                    <div className="p-4 ">
                        <h2 className="text-lg font-semibold text-gray-800 truncate">
                            {product.name}
                        </h2>
                            <p className="text-lg font-semibold text-gray-500 mt-2 line-clamp-2">
                                {product.rating}
                            </p>
                    </div>
                    <button onClick={()=> addtoCart(product)} className="w-full mt-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-900">
                        Add To Cart
                    </button>

            </div>
        )))
    </div>
  );
}
