//signup form

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Student_Signup_form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await axios.post(
        "https://thapar-nexus-backend.onrender.com/api/v1/auth/student/signup",
        {
          name,
          email,
          password,
        }
      );

      console.log("Response:", response.data);

      setSuccess("Signup successful!");
      setError("");
      setName("");
      setEmail("");
      setPassword("");

      navigate("/completeprofile");
    } catch (error) {
      console.error("Error during signup:", error);
      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-center inline-block ml-20 w-fit">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-50 p-6 rounded shadow-md lg:w-96 md:w-64 lg:h-[410px] md:h-[350px]"
      >
        <h2 className="text-2xl lg:mb-4 text-center">Student Sign Up</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <div className="lg:mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-transparent"
            required
          />
        </div>

        <div className="lg:mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-transparent"
            required
          />
        </div>

        <div className="lg:mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-900 text-white py-2 rounded hover:bg-black"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Student_Signup_form;
