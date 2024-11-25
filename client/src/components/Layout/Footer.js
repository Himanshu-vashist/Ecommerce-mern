import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <h4 className="fw-bold">E-commerce</h4>
            <p className="mb-0">Your one-stop shop for everything you need.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-2">
              <Link to="/about" className="footer-link">
                About
              </Link>
              {" | "}
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
              {" | "}
              <Link to="/policy" className="footer-link">
                Privacy Policy
              </Link>
            </p>
            <p className="mb-0">© {new Date().getFullYear()} E-commerce. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
