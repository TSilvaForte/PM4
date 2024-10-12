"use client";
import ProductDetail from "@/components/ProductDetail/ProductDetail";

//Acá mandamos un params, el id, para obtener el detalle del producto. 
const page = ({params}:{params:{id:number}}) => {
  const {id} = params;
  return (
    <div>
      <ProductDetail/>
    </div>
  )
}

export default page;