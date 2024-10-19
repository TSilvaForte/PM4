import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { getProductById } from "@/service/products";
import { notFound } from "next/navigation";

//Acá mandamos un params, el id, para obtener el detalle del producto. 
const page = async ({params}:{params:{id:string}}) => {
  const {id} = params;
  const product = await getProductById(Number(id));
  if(!product) {
    notFound();
  }
  return (
    <ProductDetail id={Number(id)} product={product} />
  )
}

export default page;

