import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPassword || !answer) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });

      if (res?.data?.success) {
        toast.success(res.data.message || "Password reset successful");
        navigate("/login");
      } else {
        toast.error(res?.data?.message || "Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce APP"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="answer" className="form-label">
              Security Question: Your Favorite Sport
            </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="answer"
              placeholder="Enter Your Favorite Sport Name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="newPassword"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
