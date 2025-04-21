import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaTachometerAlt } from "react-icons/fa";


const Header = () => {
  const [auth, setAuth] = useAuth() || [{}, () => {}];
  const cartContext = useCart();
  const [cart = []] = Array.isArray(cartContext) ? cartContext : [[]];
  const [categories, setCategories] = useState([]);
  const fetchedCategories = useCategory();

  useEffect(() => {
    if (Array.isArray(fetchedCategories)) {
      setCategories(fetchedCategories);
    }
  }, [fetchedCategories]);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🛒</span> Shopify
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-3">
              <SearchInput />
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/categories"
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu shadow-sm border-0">
                <li>
                  <Link className="dropdown-item" to="/categories">
                    All Categories
                  </Link>
                </li>
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <li key={c.slug}>
                      <Link className="dropdown-item" to={`/category/${c.slug}`}>
                        {c.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="dropdown-item text-muted">
                      No categories available
                    </span>
                  </li>
                )}
              </ul>
            </li>
            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    <FaUserPlus className="me-1" /> Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    <FaSignInAlt className="me-1" /> Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <FaUser className="me-1" /> {auth?.user?.name}
                </NavLink>
                <ul className="dropdown-menu shadow-sm border-0">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="dropdown-item"
                    >
                      <FaTachometerAlt className="me-2" /> Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="dropdown-item text-danger"
                    >
                      <FaSignOutAlt className="me-2" /> Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link position-relative">
                <Badge
                  count={cart?.length ?? 0}
                  showZero
                  offset={[10, -5]}
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  <FaShoppingCart /> Cart
                </Badge>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
