"use client";
import React, { useContext } from "react";
import { CartContext } from "../../../context/cartContext";
import { useRouter } from 'next/navigation';
import { AuthContext } from "../../../context/authContext";
import { postOrders } from "@/services/orders";
import Swal from 'sweetalert2';

const CartComponent = () => {
    const { cart, removeFromCart } = useContext(CartContext);
    const router = useRouter();

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    const { user } = useContext(AuthContext);
    const handleBuy = async () => {
        if (!user || !user.user) {
            Swal.fire({
                icon: 'warning',
                title: 'Not Logged In',
                text: 'You must be logged in to make a purchase.',
            });
            return;
        }

        try {
            await postOrders(user.user.id, cart);
            Swal.fire({
                icon: 'success',
                title: 'Order Placed',
                text: 'Order placed successfully!',
            });
            router.push('/');
        } catch (error) {
            console.error("Error placing order:", error);
            Swal.fire({
                icon: 'error',
                title: 'Order Error',
                text: 'There was an error placing your order. Please try again.',
            });
        }
    };

    const handleContinueShopping = () => {
        router.push("/products");
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {cart.length === 0 ? (
                <div>
                    <h2 className="text-3xl font-bold text-text mb-12">Your cart is empty</h2>
                    <button onClick={() => router.push('/products')} className="bg-secondary text-white py-2 px-4 rounded">
                        Go to Products
                    </button>
                </div>
            ) : (
                <div>
                    <h2 className="text-3xl font-bold text-text mb-6">Your Cart</h2>
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center border-b border-gray-200 py-4 justify-between">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded mr-4"
                            />
                            <h3 className="text-xl font-semibold flex-1">{item.name}</h3>
                            <div className="flex items-center">
                                <button
                                    className="hover:bg-red-600 text-text font-semibold py-2 px-4 rounded mr-8"
                                    onClick={() => removeFromCart(item.id)} // Pasar el ID del artículo
                                >
                                    Remove from Cart
                                </button>
                                <p className="text-2xl font-bold text-text">${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between mt-6 border-t pt-4">
                        <h3 className="text-2xl font-bold text-text">Total:</h3>
                        <p className="text-2xl font-bold text-text">${total.toFixed(2)}</p>
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