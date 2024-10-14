import React from 'react';
import { Product } from '@/interfaces';
interface ProductDetailProps {
    id: number,
    product: Product,
}

const ProductDetail = ({id, product}: ProductDetailProps) => {
    const {name, price, image, description} = product
    return (
        <article>
            <h1>{name}</h1>
            <img src= {image} alt= {name}/>
            <p>{price}</p>
            <p>{description}</p>
            <button>Add to cart</button>
        </article>
    )
}
  
export default ProductDetail;
  
  