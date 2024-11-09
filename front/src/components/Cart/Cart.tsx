"use client";
import React, { useContext } from "react";
import { CartContext } from "../../../context/cartContext";
import { useRouter } from 'next/navigation';
import Image from "next/image";


const CartComponent = () => {
    const { cart, removeFromCart, handleCart } = useContext(CartContext);
    const router = useRouter();

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    const handleBuy = () => {
        handleCart(); 
    };
        
    const handleContinueShopping = () => {
        router.push("/products");
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {cart.length === 0 ? (
                <div>
                    <h2 className="text-3xl font-bold mb-12">Your cart is empty</h2>
                    <button onClick={handleContinueShopping} className="bg-secondary py-2 px-4 rounded hover:bg-tertiary">
                        Go to Products
                    </button>
                </div>
            ) : (
                <div>
                    <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center border-b border-gray-200 py-4 justify-between">
                             <Image
                                src={item.image}
                                alt={item.name}
                                width={80} 
                                height={80}
                                className="object-cover rounded mr-4"
                            />
                            <h3 className="text-xl font-semibold flex-1">{item.name}</h3>
                            <div className="flex items-center">
                                <button
                                    className="hover:bg-red-600 font-semibold py-2 px-4 rounded mr-8"
                                    onClick={() => removeFromCart(item.id)} 
                                >
                                    Remove from Cart
                                </button>
                                <p className="min-w-24 text-2xl font-bold">${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between mt-6 border-t pt-4">
                        <h3 className="text-2xl font-bold">Total:</h3>
                        <p className="text-2xl font-bold">${total.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={handleBuy}
                            className="py-2 px-4 rounded font-bold text-2xl m-8"
                        >
                            Buy now
                        </button>
                        <button
                            onClick={handleContinueShopping}
                            className="py-2 px-4 rounded font-bold text-2xl m-8"
                        >
                            Continue shopping
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartComponent;