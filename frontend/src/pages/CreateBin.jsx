import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const CreateBin = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    status: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form fields (name, location, status)
    if (!formData.name || !formData.location || !formData.status) {
      setError("All fields (name, location, status) are required.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/bins/create", formData);
      setSuccess("Bin created successfully!");
      setFormData({ name: "", location: "", status: "" }); // Reset form
      setTimeout(() => navigate("/dashboard"), 1500); // Redirect to dashboard after 1.5 seconds
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="create-bin">
      <h1>Create Bin</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateBin;
