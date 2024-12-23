import React, { useState } from "react";
import axios from "axios";

const UpdateBin = () => {
  const [binId, setBinId] = useState("");
  const [status, setStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!binId || !status) {
      setErrorMessage("Bin ID and status are required.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setErrorMessage("Unauthorized: No token found. Please log in again.");
        return;
      }

      console.log("Request payload:", { binId, status }); // Debug
      console.log("Authorization token:", token); // Debug

      const response = await axios.post(
        "http://localhost:8000/api/bins/update",
        { binId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Ensure JSON format
          },
        }
      );

      console.log("Response from server:", response.data); // Debug
      setSuccessMessage(response.data.message || "Bin updated successfully!");
      setBinId("");
      setStatus("");
    } catch (error) {
      console.error("Error updating bin:", error);
      if (error.response) {
        setErrorMessage(
          error.response.data.message ||
            "Failed to update bin. Please try again."
        );
      } else {
        setErrorMessage("Failed to connect to the server.");
      }
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-xl shadow-xl">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Update Bin
      </h1>
      {successMessage && (
        <p className="text-green-400 text-center mb-4">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-400 text-center mb-4">{errorMessage}</p>
      )}
      <form onSubmit={handleUpdate} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label
            htmlFor="binId"
            className="block text-white font-semibold mb-2"
          >
            Bin ID
          </label>
          <input
            type="text"
            id="binId"
            value={binId}
            onChange={(e) => setBinId(e.target.value)}
            className="w-full p-2 rounded border focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-white font-semibold mb-2"
          >
            Status
          </label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 rounded border focus:outline-none"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition duration-300"
          >
            Update Bin
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBin;
