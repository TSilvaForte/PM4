"use client";

import React from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { CartContext } from '../../../context/cartContext';
import { useRouter } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode; // Tipado del contenido de NavLink
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <Link href={href} className="text-text text-base transition-colors duration-300 ease-in-out hover:text-tertiary">
    {children}
  </Link>
);

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const router = useRouter();

  const totalItems = cart.length;

  const handleLogout = () => {
    logout();
    router.push('/');
  };
  return (
    <nav className="bg-secondary shadow-md fixed top-0 w-full z-50">
      <div className="mx-12 flex items-center justify-between h-[64px]">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="font-bold text-xl">FullTechno</span>
        </Link>

        <div className="flex items-center gap-[2rem]">
        {user &&(<NavLink href="/myShop">My Shop</NavLink>)}
          <NavLink href="/products">Products</NavLink>
          {/* <NavLink href="/categories">Categories</NavLink> */}
          <NavLink href="/aboutUs">About Us</NavLink>
          <NavLink href="/support">Support</NavLink>

          <div className="relative">
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Type to search"
              className="pl-10 h-10 rounded-full bg-primary text-white outline-none placeholder:text-white"
            />
          </div>

          {user? (
            <>
              <Link href="/cart" className="relative text-text text-[1.25rem] no-underline transition-colors duration-300 ease-in-out">
                <FaShoppingCart />
                <span className="absolute top-[-5px] right-[-10px] bg-red-600 rounded-full px-1.5 py-[2px] text-[0.75rem] font-bold">{totalItems}</span>
              </Link>
              <button onClick={handleLogout} className="hover:bg-primary">
                Logout
              </button>
            </>
          ) : (
            // Si no está autenticado, mostrar botón de Login
            <Link href="/login">
              <button className="hover:bg-primary">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

