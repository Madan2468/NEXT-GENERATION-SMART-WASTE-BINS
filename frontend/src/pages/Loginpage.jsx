import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginpage.css";
import axios from "axios";

const LoginPage = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password }
      );

      if (response.status === 200) {
        const { token } = response.data;
        setToken(token);
        navigate("/dashboard");
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again later."
      );
    }
  };

  const handleRedirect = () => {
    navigate("/register");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1548873247-8fabc02e010f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80')`, // Replace with Smart Bin background
      }}
    >
      <div className="bg-gray-800 bg-opacity-90 p-8 rounded-xl shadow-xl w-full max-w-lg text-gray-200">
        <h1 className="text-4xl font-extrabold text-green-400 mb-6 text-center">
          Smart Bin Management
        </h1>
        <h2 className="text-xl text-gray-300 mb-8 text-center">
          Keep Your Environment Clean!
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-lg font-semibold transition-all"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Not a member?{" "}
          <button
            type="button"
            onClick={handleRedirect}
            className="text-green-400 hover:text-green-300 underline font-medium"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
