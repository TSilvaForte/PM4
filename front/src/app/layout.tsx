import type { Metadata } from "next";
import { Poiret_One, Montserrat } from 'next/font/google';
// import { NextUIProvider } from "@nextui-org/react"; // Importa el proveedor de NextUI

import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "../../context/authContext";
import { CartProvider } from "../../context/cartContext";


const primaryFont = Poiret_One({
  subsets: ['latin'],
  variable: '--font-primary',
  weight: ['400'],
});

const secondaryFont = Montserrat({
  subsets: ['latin'],
  variable: '--font-secondary',
  weight: ['400'],
});

export const metadata: Metadata = {
  title: "E-commerce Project M4",
  description: "A modern e-commerce platform built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <CartProvider>
        <html lang="en">
          <body
            className={`${primaryFont.variable} ${secondaryFont.variable} antialiased`}
          >
            <header>
              <Navbar />
            </header>
            <main className="container">
              {children}
            </main>
            <footer>
              <Footer />
            </footer>
          </body>
        </html>
      </CartProvider>
    </AuthProvider>
  );
}
