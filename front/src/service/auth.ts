import { UserLogin, UserRegister } from "@/interfaces";

const apiUrl = process.env.API_URL || "http://localhost:3000";

/* export const register = async (data:UserRegister) => {
    const res = await fetch (`${apiUrl}/users/register`, {
        method:"POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
    if (!res.ok) {
        const errorText = await res.text(); 
        throw new Error(`Error registering: ${errorText}`); 
    }

    return await res.json(); 
}; */

export const login = async (data:UserLogin) => {
    const res = await fetch (`${apiUrl}/users/login`, {
        method:"POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
    if (!res.ok) {
        const errorText = await res.text(); 
        throw new Error(`Error registering: ${errorText}`); 
    }

    return await res.json(); 
};