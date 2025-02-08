'use client';
import ProductDetails from "@/app/components/productDetails";
import { useParams } from "next/navigation";


export default function ProductDetailsPage() {
  const { slug }: any = useParams();
  console.log(slug, "===>> id")
  return (
    <ProductDetails slug={slug} />
    
  );
};
