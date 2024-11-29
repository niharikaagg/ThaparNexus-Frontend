// login form

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Student_Login_Form = () => {
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
        "https://thapar-nexus-backend.onrender.com/api/v1/auth/student/login",
        {
          email,
          password,
        }
      );

      console.log("Response:", response.data);

      setSuccess("Login successful!");
      setError("");
      setEmail("");
      setPassword("");

      // Redirect to userpage after successful login
      navigate("/userpage");
    } catch (error) {
      console.error("Error during login:", error);
      setError(
        error.response?.data?.message || "Login failed. Please try again."
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
        className="bg-white bg-opacity-50 p-6 rounded shadow-md lg:w-96 md:w-64 lg:h-[360px] md:h-[360px]"
      >
        <h2 className="text-2xl lg:mb-4 text-center">Student Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

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
          {loading ? "Logging In..." : "Login"}
        </button>
        <p className="lg:mt-4 text-center">
          New user?{" "}
          <a href="/studentsignup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Student_Login_Form;
