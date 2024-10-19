import React from 'react';
import { Product } from '@/interfaces';
import Link from 'next/link';
import { FaShoppingCart } from "react-icons/fa"; 


interface ProductDetailProps {
    id: number,
    product: Product,
}

const ProductDetail = ({ id, product }: ProductDetailProps) => {
    const { name, price, image, description } = product
    return (
        <article className="flex max-w-4xl mx-auto shadow-xl border border-secondary rounded-lg transition-transform duration-200 transform hover:scale-105 mb-12">
            <img className="w-1/2 rounded-l-lg object-cover" src={image} alt={name} />
            <div className="flex flex-col justify-between p-6 w-1/2">
                <div>
                    <h1 className="text-2xl font-bold text-text mb-2">{name}</h1>
                    <p className="text-3xl font-bold text-text mb-4">${price.toFixed(2)}</p>
                    <p className="text-text text-700 mb-4 mt-4">{description}</p>
                </div>
                <Link
                    href={`/cart`}
                    className="bg-secondary hover:bg-tertiary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center text-white flex items-center mt-4 w-40"
                >
                    <FaShoppingCart className="mr-2" />
                    Add to cart
                </Link>
            </div>
        </article>
    );
};

export default ProductDetail;

