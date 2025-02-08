import { product } from "@/sanity/schemaTypes/product";
import CartManager from "../components/cartManager";
import ProductGrid from "../components/productGrid";
import Product from "../product/page";




export default function FetchedProducts() {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-8 bg-blue-200 text-black p-4 mx-12 rounded-lg ">
        {" "}
        Fetched Products From API
      </h1>



      <Product />
      <ProductGrid products={product} />
    </div>
  );
}
