"use client";
import { productsMock } from "@/app/mocks/products";
import ProductDetail from "@/components/ProductDetail/ProductDetail";

//Acá mandamos un params, el id, para obtener el detalle del producto. 
const page = ({params}:{params:{id:number}}) => {
  const {id} = params;
  return (
      <ProductDetail product={productsMock[id]}/>
  )
}

export default page;

