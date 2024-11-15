import { CartItem } from "../../context/cartContext";

export const postOrders = async (userId: number, cart: CartItem[], token:string) => {
    const data = { userId, products: cart.map((item) => item.id) };
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    console.log("Datos enviados al backend:", data);
    try {
        const res = await fetch(`${apiUrl}/orders`, { 
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            } 
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Error ${res.status}: ${errorText}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error("Error posting orders:", error);
        throw error; 
    }
};