import React from 'react';
import { FaInstagram, FaFacebook, FaEnvelope, FaPhone } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  const quickLinks = [
    { href: '/login', label: 'Login' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About Us' },
    { href: '/support', label: 'Support' },
  ];

  return (
    <footer className="bg-secondary py-8 px-8 text-center">
      <div className="flex mx-auto gap-6">
        <div className="flex-grow flex-shrink w-1/3">
          <h3 className="text-xl mb-4 text-tertiary">About FullTechno</h3>
          <img src="./logo.png" alt="Logo" className="h-12 w-12 inline-block mb-4" />
          <p className="text-sm leading-6">
            FullTechno brings you the latest technology products and accessories to meet your needs. Quality guaranteed and worldwide support!
          </p>
        </div>

        <div className="flex-grow flex-shrink w-1/3">
          <h3 className="text-xl mb-4 text-tertiary">Quick Links</h3>
          <ul className="list-none p-0">
            {quickLinks.map((link, index) => (
              <li key={index} className="mb-2 text-text">
                <Link href={link.href} className="transition-colors duration-300 ease-in-out hover:text-tertiary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-grow flex-shrink w-1/3">
          <h3 className="text-xl mb-4 text-tertiary">Contact Us</h3>
          <div className="flex justify-center items-center mb-2">
            <FaEnvelope className="mr-2 text-text" />
            <p className="text-sm leading-6">support@fulltechno.com</p>
          </div>
          <div className="flex justify-center items-center mb-4">
            <FaPhone className="mr-2 text-text" />
            <p className="text-sm leading-6">+1 234 567 890</p>
          </div>

          <h3 className="text-xl mb-4 text-tertiary">Follow Us</h3>
          <div className="flex justify-center gap-4">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-text text-2xl transition-colors duration-300 ease-in-out hover:text-tertiary" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-text text-2xl transition-colors duration-300 ease-in-out hover:text-tertiary" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 pt-4 mt-6 text-xs text-gray-400">
        <p>© {new Date().getFullYear()} FullTechno. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

