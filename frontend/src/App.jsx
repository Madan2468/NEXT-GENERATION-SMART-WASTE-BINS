import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Loginpage";
import RegisterPage from "./pages/Registerpage";
import Dashboard from "./pages/Dashboard";
import CreateBin from "./pages/CreateBin";
import TotalBins from "./pages/TotalsBins";
import UpdateBin from "./pages/UpdateBin"; // Import UpdateBin component
import RouteOptimization from "./pages/RouteOptimization"; // Import RouteOptimization component

const App = () => {
  // Initialize token from localStorage
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("authToken");
    console.log("Initial token from localStorage:", storedToken); // Debug
    return storedToken;
  });

  // Sync token state with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      console.log("Token saved to localStorage:", token); // Debug
    } else {
      localStorage.removeItem("authToken");
      console.log("Token removed from localStorage"); // Debug
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage setToken={setToken} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Route - Dashboard */}
        <Route
          path="/dashboard"
          element={
            token ? (
              <Dashboard />
            ) : (
              <Navigate to="/" replace /> // Redirect if not logged in
            )
          }
        />

        {/* Protected Route - CreateBin */}
        <Route
          path="/create-bin"
          element={
            token ? (
              <CreateBin />
            ) : (
              <Navigate to="/" replace /> // Redirect to login if not logged in
            )
          }
        />

        {/* Protected Route - TotalBins */}
        <Route
          path="/total-bins"
          element={
            token ? (
              <TotalBins />
            ) : (
              <Navigate to="/" replace /> // Redirect to login if not logged in
            )
          }
        />

        {/* Protected Route - UpdateBin */}
        <Route
          path="/update-bin"
          element={
            token ? (
              <UpdateBin />
            ) : (
              <Navigate to="/" replace /> // Redirect to login if not logged in
            )
          }
        />

        {/* Protected Route - RouteOptimization */}
        <Route
          path="/route-optimization"
          element={
            token ? (
              <RouteOptimization />
            ) : (
              <Navigate to="/" replace /> // Redirect to login if not logged in
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
