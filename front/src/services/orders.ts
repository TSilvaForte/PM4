import { CartItem } from "../../context/cartContext";

export const postOrders = async (userId: number, cart: CartItem[]) => {
    const data = { userId, products: cart.map((item) => item.id) };
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
        const res = await fetch(`${apiUrl}/orders`, { 
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            } 
        });

        console.log(res); // recordar eliminar! 
        
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`); 
        }
        
        return await res.json();
    } catch (error) {
        console.error("Error posting orders:", error); 
    }
};