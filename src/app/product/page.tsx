import { client } from "@/sanity/lib/client";

interface Product {
  title: string;
  // description: string; // Added description back
  imageUrl: string;
  price: number;
  tags?: string[];
  discountPercentage?: number;
  isNew?: boolean;
}

async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "product"] {
    title,
    description,
    "imageUrl": productImage.asset->url,
    price,
    tags,
    discountPercentage,
    isNew
  }`;

  const products = await client.fetch(query);
  return products;
}

export default async function ProPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="p-5 max-w-7xl mx-auto">
        {/* Centered and Responsive Heading */}
        <h1 className="text-center text-3xl font-bold mb-8">Products</h1>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.title}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col items-center text-center"
            >
              {/* Product Image */}
              <img
                src={product.imageUrl}
                alt={product.title}
                className=" w-[500ox] h-[500px] object-cover"
              />

              {/* Product Details */}
              <div className="p-4 flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                {/* <p className="text-gray-600 mb-4">{product.description}</p> */}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
