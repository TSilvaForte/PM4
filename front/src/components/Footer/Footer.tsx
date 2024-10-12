import React from 'react';
import { FaInstagram, FaFacebook, FaEnvelope, FaPhone } from 'react-icons/fa';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footercolumn}>
          <h3 className={styles.sectionTitle}>About FullTechno</h3>
          <img src="./logo.png" alt="Logo" className={styles.logo}/>
          <p className={styles.sectionText}>
            FullTechno brings you the latest technology products and accessories to meet your needs. Quality guaranteed and worldwide support!
          </p>
        </div>
        
        <div className={styles.footercolumn}>
          <h3 className={styles.sectionTitle}>Quick Links</h3>
          <ul className={styles.footerList}>
            <li className={styles.footerListItem}>
              <Link href="/shop" className={styles.footerLink}>Shop</Link>
            </li>
            <li className={styles.footerListItem}>
              <Link href="/products" className={styles.footerLink}>Products</Link>
            </li>
            <li className={styles.footerListItem}>
              <Link href="/categories" className={styles.footerLink}>Categories</Link>
            </li>
            <li className={styles.footerListItem}>
              <Link href="/about" className={styles.footerLink}>About Us</Link>
            </li>
            <li className={styles.footerListItem}>
              <Link href="/support" className={styles.footerLink}>Support</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footercolumn}>
          <h3 className={styles.sectionTitle}>Contact Us</h3>
          <div className={styles.infocontainer}>
          <p className={styles.sectionText}>
            <FaEnvelope className={styles.icon} /> support@fulltechno.com
          </p>
          </div>
          <div className={styles.infocontainer}>
          <p className={styles.sectionText}>
            <FaPhone className={styles.icon} /> +1 234 567 890
          </p>
          </div>
        </div>

        <div className={styles.footercolumn}>
          <h3 className={styles.sectionTitle}>Follow Us</h3>
          <div className={styles.socialIcons}>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className={styles.socialIcon} />
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className={styles.socialIcon} />
                </a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} FullTechno. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
