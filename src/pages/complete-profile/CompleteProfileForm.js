import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompleteProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    branch: "",
    year: "",
    cgpa: "",
    email: "",
    phone: "",
    linkedin: "",
    skills: "",
  });
  const [dropdownOptions, setDropdownOptions] = useState({
    branches: [],
    years: [],
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch dropdown options
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/student/homepage-dropdown-options"
        );
        setDropdownOptions(response.data);
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };
    fetchDropdownOptions();
  }, []);

  useEffect(() => {
    // Fetch student data if profile is not complete
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/student/profile"
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudentData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/auth/student/complete-profile",
        formData
      );

      console.log("Student Details Saved:", response.data);
      setSuccess("Profile saved successfully!");
      setError("");
      setTimeout(() => {
        navigate("/userpage"); // Redirect to user page after successful save
      }, 1500);
    } catch (error) {
      console.error("Error saving student details:", error);
      setError(
        error.response?.data?.message ||
          "Failed to save details. Please try again."
      );
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg pt-8 ml-10 mr-32 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Complete Profile</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Roll No.</label>
            <input
              type="text"
              name="rollno"
              value={formData.rollno}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Branch</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Branch</option>
              {dropdownOptions.branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Year</option>
              {dropdownOptions.years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CGPA</label>
            <input
              type="text"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Save Details Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-900 text-white py-2 rounded hover:bg-black"
        >
          {loading ? "Saving Details..." : "Save Details"}
        </button>
      </form>
    </div>
  );
}

export default CompleteProfileForm;
