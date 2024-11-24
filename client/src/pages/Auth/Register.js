 import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout.js';
import './Register.css'; // Import the CSS file

import  toast  from 'react-hot-toast';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name, email, password,phone, address,answer}

        );
     if(res.data.success) {
        toast.success(res.data.message)
        navigate("/login");
     }
     else{
        toast.error(res.data.message)
     }  
      // Handle response logic here
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Error during registration, please try again later.");
    }
  };

  return (
    <Layout title={"Register"}>
      <div className="register-container">
        
        <div className="register-image">
          <img src="https://imgs.search.brave.com/Jm4MzZYKZYn-omIZZpADgFQYgo61GFnHx1Fzc8_vhzI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9jb3B5cmln/aHQtcHJvdGVjdGlv/bi1jb25jZXB0LXJl/Z2lzdHJhdGlvbi10/cmFkZW1hcmstMjYw/bnctMjUwMDg1NTI5/MS5qcGc" alt="Register" />
        </div>

       
        <div className="register-form-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>Create Account</h2>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Password</label>
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

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                className="form-control"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Answer</label>
              <input
                type="text"
                id="answer"
                className="form-control"
                placeholder="What is your Favorite sports"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
