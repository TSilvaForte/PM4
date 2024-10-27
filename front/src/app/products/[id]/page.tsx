import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { getProductById } from "@/services/products";
import { notFound } from "next/navigation";

//Acá mandamos un params, el id, para obtener el detalle del producto. 
const ProductDetailPage = async ({params}:{params:{id:string}}) => {
  const {id} = params;

  let product;
  try {
    product = await getProductById(Number(id));
    if (!product) {notFound()};
  } catch (error) {
    console.error("Error fetching product:", error);
    {notFound()};
  }

  return (
    <ProductDetail id={Number(id)} product={product} />
  )
}

export default ProductDetailPage;

