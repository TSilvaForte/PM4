"use client";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";

const MyShop = () => {
    const { user: userData } = useContext(AuthContext);
    const user = userData?.user;
    console.log(user);

    return (
        <div className="font-secondary container mx-auto my-6 p-6 bg-secondary rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-text">My Account</h1>
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-text">Name: <span className="font-normal">{user?.name}</span></h2>
                <h2 className="text-lg font-semibold text-text">Email: <span className="font-normal">{user?.email}</span></h2>
                <h2 className="text-lg font-semibold text-text">Phone number: <span className="font-normal">{user?.phone}</span></h2>
                <h2 className="text-lg font-semibold text-text">Address: <span className="font-normal">{user?.address}</span></h2>
            </div>

            <h1 className="text-3xl font-bold mt-8 mb-4 text-text">My Orders</h1>
            {user?.orders.length ? (
                user.orders.map((order) => {
                    const orderTotal = order.products?.reduce((total, product) => total + product.price, 0);
                    
                    return (
                        <div key={order.id} className="mb-4 p-4 border rounded-lg bg-primary shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
                                <h3 className="text-lg font-semibold text-text">Order ID: {order.id}</h3>
                                <div className="flex space-x-4 text-gray-600">
                                    <span className="font-semibold">Status: {order.status}</span>
                                    <span>Date: {new Date(order.date).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {Array.isArray(order.products) && order.products.length > 0 ? (
                                order.products.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between mb-2 p-2 bg-secondary rounded shadow">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded mr-4"
                                        />
                                        <h3 className="text-lg font-medium flex-1 text-text">{product.name}</h3>
                                        <p className="text-lg font-semibold text-text">${product.price.toFixed(2)}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No products found in this order.</p>
                            )}

                            <div className="flex justify-end mt-4">
                                <h3 className="text-lg font-bold text-text">Total: ${orderTotal?.toFixed(2)}</h3>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="text-gray-500">You have no orders yet.</p>
            )}
        </div>
    );
};

export default MyShop;



