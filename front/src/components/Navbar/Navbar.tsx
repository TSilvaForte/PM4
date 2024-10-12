"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaSearch } from 'react-icons/fa'; 
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
          <span className={styles.logoText}>FullTechno</span>
        </Link>

        <div className={styles.navLinks}>

          <Link href="/shop" className={styles.navLink}>
            Shop
          </Link>
          <Link href="/products" className={styles.navLink}>
            Products
          </Link>
          <Link href="/categories" className={styles.navLink}>
            Categories
          </Link>
          <Link href="/about" className={styles.navLink}>
            About Us
          </Link>
          <Link href="/support" className={styles.navLink}>
            Support
          </Link>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.searchContainer}>
            {/* Icono de lupa */}
            <FaSearch className={styles.searchIcon} onClick={toggleSearch} />
            {/* Mostrar input solo si `isSearchOpen` es true */}
            <div className={`${styles.searchDropdown} ${isSearchOpen ? styles.show : ''}`}>
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchInput}
              />
            </div>
          </div>
          <Link href="/cart" className={styles.cartIcon}>
            <FaShoppingCart />
            <span className={styles.cartCount}>3</span>
          </Link>
          <Link href="/login" className={styles.loginButton}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

