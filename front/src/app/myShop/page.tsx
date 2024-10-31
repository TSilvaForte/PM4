"use client";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { CartContext } from "../../../context/cartContext";
import { GrOrderedList } from "react-icons/gr";

const MyShop = () => {
    const { user: userData } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const user = userData?.user;

    // Calcula el total del carrito
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="font-secondary container mx-auto my-6 p-6 bg-secondary rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-text">My Account</h1>
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-text">Name: <span className="font-normal">{user?.name}</span></h2>
                <h2 className="text-lg font-semibold text-text">Email: <span className="font-normal">{user?.email}</span></h2>
                <h2 className="text-lg font-semibold text-text">Phone number: <span className="font-normal">{user?.phone}</span></h2>
                <h2 className="text-lg font-semibold text-text">Address: <span className="font-normal">{user?.address}</span></h2>
            </div>

            <h1 className="text-3xl font-bold mb-4 text-text">My Cart</h1>
            {cart.length ? (
                <>
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center border-b border-gray-200 py-4 justify-between">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded mr-4"
                            />
                            <h3 className="text-xl font-semibold flex-1">{item.name}</h3>
                            <p className="min-w-24 text-2xl font-bold text-text">${item.price.toFixed(2)}</p>
                        </div>
                    ))}
                    <div className="flex justify-between mt-6 border-t pt-4">
                        <h3 className="text-2xl font-bold text-text">Total:</h3>
                        <p className="text-2xl font-bold text-text">${total.toFixed(2)}</p>
                    </div>
                </>
            ) : (
                <p className="text-gray-500">Your cart is empty.</p>
            )}

            <h1 className="text-3xl font-bold mt-8 mb-4 text-text">My Orders</h1>
            {user?.orders?.length ? (
                user.orders.map((order, i) => (
                    <div key={i} className="mb-4 p-4 border rounded-lg bg-primary shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                        <p className="text-lg font-semibold text-text">Order ID: <span className="font-normal">{order.id}</span></p>
                        {/* Agrega otros detalles relevantes del pedido aquí */}
                    </div>
                ))
            ) : (
                <p className="text-gray-500">You have no orders yet.</p>
            )}
        </div>
    );
}

export default MyShop;

