"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { Product } from "@/interfaces";
import { postOrders } from "@/services/orders";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";
import { AuthContext } from "./authContext";

// Defino una interfaz para cada producto en el carrito
export interface CartItem {
    id: Product['id'];
    name: string;
    price: number;
    image: string;
}

interface CartContextProps {
    cart: CartItem[];
    setCart: (cart: CartItem[]) => void;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    handleCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
    cart: [], 
    setCart: () => { },
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    handleCart: () => { }
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const router = useRouter();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem("cart")!);
        if (localCart) { 
            setCart(localCart);
        }
    }, []);


    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            if (prevCart.some((cartItem) => cartItem.id === item.id)) {
                return prevCart;
            }
            return [...prevCart, item];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        localStorage.removeItem("cart");
        setCart([]);
    };

    const handleCart = async () => {
        if (!user || !user.user || !user.token) {
            Swal.fire({
                icon: 'warning',
                title: 'Not Logged In',
                text: 'You must be logged in to start shopping.',
            });
            return;
        }

        const token = user.token;

        try {
            await postOrders(user.user.id, cart, token);
            Swal.fire({
                icon: 'success',
                title: 'Order Placed',
                text: 'Order placed successfully!',
            });
            router.push('/myShop');
            clearCart();
        } catch (error) {
            console.error("Error placing order:", error);
            Swal.fire({
                icon: 'error',
                title: 'Order Error',
                text: 'There was an error placing your order. Please try again.',
            });
        }
    }

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart, handleCart }}>
            {children}
        </CartContext.Provider>
    );
};

