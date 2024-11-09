"use client"; //para poder usar el useRouter
import React, { useContext } from 'react';
import { Product } from '@/interfaces';
import { FaShoppingCart } from "react-icons/fa";
import { AuthContext } from '../../../context/authContext';
import { useRouter } from 'next/navigation';
import { CartContext } from '../../../context/cartContext';
import Swal from 'sweetalert2';


interface ProductDetailProps {
    id: number,
    product: Product,
}

const ProductDetail = ({ id, product }: ProductDetailProps) => {
    const { name, price, image, description } = product; //desestructuramos las props de product
    const { user } = useContext(AuthContext);
    const { cart, addToCart } = useContext(CartContext);
    const router = useRouter();
    const isOnCart = cart.some(cartItem => cartItem.id === id)

    const handleAddToCart = () => {
        if (user?.login) {
            addToCart({ id, name, price, image });

            Swal.fire({
                icon: 'success',
                title: 'Added to cart!',
                text: 'The item has been added to your cart.',
                confirmButtonText: 'OK',
            }).then(() => {
                router.push("/cart");
            });
        } 
    };

    return (
        <article className="flex max-w-4xl mx-auto shadow-xl border border-secondary rounded-lg transition-transform duration-200 transform hover:scale-105 mb-12">
            <img className="w-1/2 rounded-l-lg object-cover" src={image} alt={name} />
            <div className="flex flex-col justify-between p-6 w-1/2">
                <div>
                    <h1 className="text-2xl font-bold mb-2">{name}</h1>
                    <p className="text-3xl font-bold mb-4">${price.toFixed(2)}</p>
                    <p className="text-700 mb-4 mt-4">{description}</p>
                </div>
                <button
                    onClick={isOnCart ? () => router.push("/cart") : () => handleAddToCart()}
                    className={`bg-secondary hover:bg-tertiary focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center flex items-center mt-4 w-40 ${!user?.login ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                    disabled={!user?.login}
                    title={!user?.login ? "You must login to buy" : ""} 
                >
                    <FaShoppingCart className="mr-2" />
                    {isOnCart ? "Go to Cart" : "Add to cart"}
                </button>
            </div>
        </article>
    );
};

export default ProductDetail;

