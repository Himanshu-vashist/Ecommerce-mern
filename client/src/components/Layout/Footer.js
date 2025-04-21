import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer text-white py-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <h4>Shopify</h4>
            <p className="mt-3">Your one-stop shop for premium products at affordable prices. Discover a world of quality and convenience.</p>
            <div className="social-links mt-3">
              <a href="#" className="me-2"><FaFacebook /></a>
              <a href="#" className="me-2"><FaTwitter /></a>
              <a href="#" className="me-2"><FaInstagram /></a>
              <a href="#" className="me-2"><FaLinkedin /></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h4>Quick Links</h4>
            <ul className="list-unstyled mt-3">
              <li className="mb-2"><Link to="/">Home</Link></li>
              <li className="mb-2"><Link to="/about">About Us</Link></li>
              <li className="mb-2"><Link to="/contact">Contact</Link></li>
              <li className="mb-2"><Link to="/policy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h4>Categories</h4>
            <ul className="list-unstyled mt-3">
              <li className="mb-2"><Link to="/categories">All Categories</Link></li>
              <li className="mb-2"><Link to="/">Featured Products</Link></li>
              <li className="mb-2"><Link to="/">New Arrivals</Link></li>
              <li className="mb-2"><Link to="/">Best Sellers</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h4>Contact Us</h4>
            <ul className="list-unstyled mt-3">
              <li className="mb-2"><FaMapMarkerAlt className="me-2" /> 123 Street, City, Country</li>
              <li className="mb-2"><FaPhoneAlt className="me-2" /> +1 234 567 8900</li>
              <li className="mb-2"><FaEnvelope className="me-2" /> info@shopify.com</li>
            </ul>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 text-center border-top pt-3">
            <p className="mb-0">© {new Date().getFullYear()} Shopify. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
