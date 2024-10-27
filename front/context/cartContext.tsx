"use client";
import { createContext, useState, useEffect } from "react";

// Defino una interfaz para cada producto en el carrito
export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string; 
}

interface CartContextProps {
    cart: CartItem[];
    setCart: (cart: CartItem[]) => void;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
}

// Crear el contexto, donde vamos a guardar los datos
export const CartContext = createContext<CartContextProps>({
    cart: [], // valor inicial
    setCart: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
});

// Crear el provider
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    
    useEffect(() => {
        if (cart.length>0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    useEffect (() => {
        const localCart = JSON.parse(localStorage.getItem("cart")!);
        setCart(localCart);
    }, []);


    // Función para agregar un producto al carrito
    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            // Si el producto ya está en el carrito, no hago nada porque no está definido en el back
            if (prevCart.some((cartItem) => cartItem.id === item.id)) {
                return prevCart;
            }
            // Si no existe, puedo agregar el nuevo producto
            return [...prevCart, item];
        });
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};


