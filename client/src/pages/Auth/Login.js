import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout.js';
import { useNavigate,useLocation } from 'react-router-dom'; // Ensure useNavigate is imported
import axios from 'axios'; // Ensure axios is imported
import './Login.css'; // Ensure CSS file exists
import toast from 'react-hot-toast';
import {useAuth} from '../../context/auth.js';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth({

  });
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
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
    }
  };

  return (
    <Layout title={"Login"}>
      <div className="login-page">
        
        <div className="login-left">
          <img
            src="https://imgs.search.brave.com/FknaFjq8noVoQ4ITqP-aVqlydOe4uhYNM8h9bVfGkls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9j/b21wdXRlci1zZWN1/cml0eS13aXRoLWxv/Z2luLXBhc3N3b3Jk/LXBhZGxvY2tfMTA3/NzkxLTE2MTkxLmpw/Zz9zZW10PWFpc19o/eWJyaWQ"
            alt="Login"
            className="login-image"
          />
          <div className="login-branding">
            <h2>Welcome Back!</h2>
            <p>Your journey to explore the best products begins here.</p>
          </div>
        </div>

       
        <div className="login-right">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Login to Your Account</h2>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-primary btn-block" onClick={() => {navigate('/forgot-password')}}>
              Forgot Password
            </button>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
            <p className="signup-link">
              Don’t have an account? <a href="/signup">Sign up here</a>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
