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
    clearCart:() => void;
    handleCart:() => void;
}

// Crear el contexto, donde vamos a guardar los datos
export const CartContext = createContext<CartContextProps>({
    cart: [], // valor inicial
    setCart: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart:()=>{},
    handleCart: () => {}
});

// Crear el provider
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const router = useRouter();
    const { user, setUser } = useContext(AuthContext);
    
    useEffect(() => {
        if (cart.length>0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    useEffect (() => {
        const localCart = JSON.parse(localStorage.getItem("cart")!);
        if (localCart) { // Verificar si localCart no es null
            setCart(localCart);
        }
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

    const clearCart = () => {
        localStorage.removeItem("cart"); 
        setCart([]); 
    };

    const handleCart = async () => {
        

        if (!user || !user.user || !user.token) {
            Swal.fire({
                icon: 'warning',
                title: 'Not Logged In',
                text: 'You must be logged in to make a purchase.',
            });
            return;
        }

        const token = user.token;

        try {
            const newOrder= await postOrders(user.user.id, cart, token);
            const updatedUser = {
                ...user,
                user: {
                    ...user.user,
                    orders: [...(user.user.orders || []), newOrder] // Agrega la orden a la lista de órdenes del usuario
                }
            };
            setUser(updatedUser);
            console.log(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            Swal.fire({
                icon: 'success',
                title: 'Order Placed',
                text: 'Order placed successfully!',
            });
            clearCart();
            router.push('/');
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

