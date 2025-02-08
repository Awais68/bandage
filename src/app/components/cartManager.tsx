"use client";

import { useState } from "react";


import ProductGrid from "./productGrid";
import { Product } from '@/interfaces/index'


const CartManager = ({ products }: { products: Product[] }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleAddToCart = (product: Product) => {
    setCart((prevProduct) => [...prevProduct, product]);
  };

  const handleRemoveFromCart = (product_id: string) => {
    const newData = cart.filter((item) => {
      return item._id != product_id;
    });
    setCart(newData);
  };

  return (
    <>
      <ProductGrid product={products} addtoCart={handleAddToCart} />
      <div className="container mx-auto my-8 ">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left text-gray-600 font-semibold py-3 px-4 ">
                  Product Name{" "}
                </th>
                <th className="text-left text-gray-600 font-semibold py-3 px-4 ">
                  Description{" "}
                </th>
                <th className="text-left text-gray-600 font-semibold py-3 px-4 ">
                  Price{" "}
                </th>
                <th className="text-left text-gray-600 font-semibold py-3 px-4 ">
                  Quantity{" "}
                </th>
                <th className="text-left text-gray-600 font-semibold py-3 px-4 ">
                  Action{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: Product) => {
                return (
                  <tr
                    className="border-b hover:bg-gray-50 transtion "
                    key={item._id}
                  >
                    <td className="py-4 px-4 font-medium text-gray-800 ">
                      {item.title}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-800 ">
                      {item.description.substring(0, 100)}...
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-800 ">
                      {item.price}
                    </td>
                    <td className="py-4 px-4 text-center ">
                      <input
                        type="number"
                        className="w-16 text-center border-gray-300 rounded-md"
                        min="1"
                        readOnly
                      />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="bg-red-500 text-white px-2 py-2 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="w-full mt-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded">
            CheckOut
          </button>
        </div>
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 ">
              {" "}
              Name
            </label>
            <input
              type="text"
              name="name"
              value=""
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 ">
              {" "}
              Email
              <input
                type="text"
                name="email"
                value=""
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartManager;
