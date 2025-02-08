import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Product } from '@/interfaces/index'


// GROQ Query Function to Fetch Products
async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "product"]{
    _id,
    title,
    description,
    price,
    tags,
    discountPercentage,
    isNew,
    "imageUrl": productImage.asset._ref
  }`;

  const data = await client.fetch(query);
  console.log("Fetched Data:", data);
  return data;
}

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <div className="bg-blue-300">
      <div className="p-5 max-w-8xl mx-auto">
        {/* Centered and Responsive Heading */}
        <h1 className="text-center text-3xl font-bold mb-8">Fetched From Sanity CMS Products</h1>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-blue-400">
          {products.map((product: any) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <div
                className="border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col items-center text-center"
              >
                {/* Product Image */}
                <img
                  src={urlFor(product.imageUrl).url()} // Convert _ref to actual image URL
                  alt={product.title}
                  className="w-[300px] h-[300px] object-cover"
                />

                {/* Product Details */}
                <div className="p-4 flex flex-col items-center">
                  <h2 className="text-xl font-semibold mb-2">{product.title}</h2>

                  <p className="text-lg font-bold text-gray-800">
                    Price: ${product.price}
                  </p>
                  {product.discountPercentage && (
                    <p className="text-green-600">
                      Discount: {product.discountPercentage}%
                    </p>
                  )}

                  {product.isNew && (
                    <p className="text-red-600 font-semibold">New Product</p>
                  )}
                  {product.tags && (
                    <p className="text-gray-500 text-sm">
                      Tags: {product.tags.join(", ")}
                    </p>
                  )}
                  <Button>See Detail</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
