import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';
import { FaArrowUp } from 'react-icons/fa';

import 'react-toastify/dist/ReactToastify.css';
import './Layout.css';

const Layout = ({
  children,
  title = "Shopify - Modern eCommerce",
  description = "A modern eCommerce platform with a wide range of products",
  keywords = "ecommerce, online shopping, products, modern, react, node, mongodb",
  author = "Himanshu"
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="layout-wrapper">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="main-content">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#fff',
              color: '#333',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              padding: '16px'
            },
            success: {
              iconTheme: {
                primary: '#4cc9f0',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#e63946',
                secondary: '#fff',
              },
            },
          }}
        />
        {children}
      </main>
      <Footer />
      <div
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
      >
        <FaArrowUp />
      </div>
    </div>
  );
};

export default Layout;
