import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "../config/axios";
import toast from "react-hot-toast";
import AdBlockerWarning from "../components/AdBlockerWarning";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth() || [{ user: null, token: null }, () => {}];
  const [cart, setCart] = useCart() || [[], () => {}];
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adBlockerDetected, setAdBlockerDetected] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    if (!cart?.length) return "$0.00";
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item");
    }
  };

  // Fetch payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch payment token");
      // Check if the error might be due to an ad blocker
      if (error.message === 'Network Error' || error.isAdBlockerError) {
        setAdBlockerDetected(true);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payment
  const handlePayment = async () => {
    if (!instance) {
      toast.error("Payment instance not initialized");
      return;
    }

    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment completed successfully");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Payment failed");
    }
  };

  return (
    <Layout>
      <AdBlockerWarning show={adBlockerDetected} />
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout!"
                    }`
                  : "Your cart is empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {/* Cart Items */}
            <div className="col-md-7 p-0 m-0">
              {cart?.length ? (
                cart.map((p) => (
                  <div className="row card flex-row" key={p._id}>
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        width="100%"
                        height="130px"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/default-product.png";
                        }}
                      />
                    </div>
                    <div className="col-md-4">
                      <p>{p.name}</p>
                      <p>{p.description.substring(0, 30)}</p>
                      <p>Price: {p.price}</p>
                    </div>
                    <div className="col-md-4 cart-remove-btn">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Your cart is empty!</p>
              )}
            </div>

            {/* Cart Summary */}
            <div className="col-md-5 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>
              {auth?.user?.address ? (
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", { state: "/cart" })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              {/* Payment Section */}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(inst) => setInstance(inst)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
