import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "../../config/axios";
import "./Login.css";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth.js";
import AdBlockerWarning from "../../components/AdBlockerWarning";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth({});
  const [adBlockerDetected, setAdBlockerDetected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/auth/login`,
        { email, password }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error.response || error.message);
      toast.error("Error during login, please try again later.");
      // Check if the error might be due to an ad blocker
      if (error.message === 'Network Error' || error.isAdBlockerError) {
        setAdBlockerDetected(true);
      }
    }
  };

  return (
    <Layout title={"Login"}>
      <AdBlockerWarning show={adBlockerDetected} />
      <div className="login-container">
        <div className="login-card">
          <div className="login-left">
            <img
              src="/images/login-img.jpg"
              alt="Login"
              className="login-image"
            />
            <h2 className="welcome-text">Welcome Back!</h2>
            <p className="welcome-description">
              Your journey to explore the best products begins here.
            </p>
          </div>

          <div className="login-right">
            <form className="login-form" onSubmit={handleSubmit}>
              <h2 className="form-title">Sign In</h2>

              <div className="form-group">
                <label htmlFor="email">
                  <FiMail className="input-icon" /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <FiLock className="input-icon" /> Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-link forgot-password"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </button>
                <button type="submit" className="btn btn-primary">
                  <FiLogIn className="btn-icon" /> Login
                </button>
              </div>

              <p className="signup-link">
                Don’t have an account? <Link to="/register">Sign up here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
