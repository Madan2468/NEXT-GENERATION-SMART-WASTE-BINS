import React from "react";
import { motion } from "framer-motion";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="container mx-auto p-8 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Bin Status Dashboard
        </h1>
        <motion.div
          className="mb-6 text-center flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Button to Create New Bin */}
          <button
            className="px-6 py-3 bg-purple-600 text-white text-xl font-semibold rounded-full shadow-md hover:bg-purple-700 transition duration-300"
            onClick={() => (window.location.href = "/create-bin")}
          >
            Create New Bin
          </button>

          {/* Button to View Total Bins */}
          <button
            className="px-6 py-3 bg-blue-600 text-white text-xl font-semibold rounded-full shadow-md hover:bg-blue-700 transition duration-300"
            onClick={() => (window.location.href = "/total-bins")}
          >
            View Total Bins
          </button>

          {/* Button to Update Bin */}
          <button
            className="px-6 py-3 bg-green-600 text-white text-xl font-semibold rounded-full shadow-md hover:bg-green-700 transition duration-300"
            onClick={() => (window.location.href = "/update-bin")}
          >
            Update Bin
          </button>

          {/* Button to Route Optimization Map */}
          <button
            className="px-6 py-3 bg-red-600 text-white text-xl font-semibold rounded-full shadow-md hover:bg-red-700 transition duration-300"
            onClick={() => (window.location.href = "/route-optimization")}
          >
            Route Optimization
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
