"use client";
import { UserSession } from "@/interfaces";
import { createContext, useState, useEffect } from "react";

interface AuthContextProps {
    user: UserSession | null;
    setUser: (user:UserSession | null) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,         
    setUser: () => {},
    logout: () => {},
});

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<UserSession | null>(null);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    useEffect (() => {
        const localUser = JSON.parse(localStorage.getItem("user")!);
        setUser(localUser);
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

