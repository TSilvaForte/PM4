"use client"
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { Order } from "@/interfaces";
import { Image } from "@nextui-org/react";

const MyShop = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState<Order[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const token = user?.token;

    const featuredOrders = async () => {
        try {
            const response = await fetch(`${apiUrl}/users/orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": token } : {}),
                },
            });

            if (!response.ok) {
                throw new Error('Error loading orders');
            }

            const dataOrders = await response.json();
            // console.log(dataOrders)
            setOrders(dataOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            featuredOrders();
        }
    }, [token]);


    return (
        <div className="min-h-[70vh] font-secondary container mx-auto my-6 p-6 bg-secondary rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">My Account</h1>
            <div className="mb-6">
                <h2 className="text-lg font-semibold">Name: <span className="font-normal">{user?.user.name}</span></h2>
                <h2 className="text-lg font-semibold">Email: <span className="font-normal">{user?.user.email}</span></h2>
                <h2 className="text-lg font-semibold">Phone number: <span className="font-normal">{user?.user.phone}</span></h2>
                <h2 className="text-lg font-semibold">Address: <span className="font-normal">{user?.user.address}</span></h2>
            </div>

            <h1 className="text-3xl font-bold mt-8 mb-4">My Orders</h1>
            {orders?.length ? (
                orders.map((order) => {
                    const orderTotal = order.products?.reduce((total, product) => total + product.price, 0);

                    return (
                        <div key={order.id} className="mb-4 p-4 border rounded-lg bg-primary shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
                                <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
                                <div className="flex space-x-4 text-gray-600">
                                    <span className="font-semibold">Status: {order.status}</span>
                                    <span>Date: {new Date(order.date).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {Array.isArray(order.products) && order.products.length > 0 ? (
                                order.products.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between mb-2 p-2 bg-secondary rounded shadow">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={64}
                                            height={64}
                                            className="object-cover rounded mr-4"
                                        />
                                        <h3 className="text-lg font-medium flex-1">{product.name}</h3>
                                        <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No products found in this order.</p>
                            )}

                            <div className="flex justify-end mt-4">
                                <h3 className="text-lg font-bold">Total: ${orderTotal?.toFixed(2)}</h3>
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



