import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

function EditProfileForm() {
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
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          "https://thapar-nexus-backend.onrender.com/api/v1/student/profile"
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

  // Fetch dropdown options
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const response = await axios.get(
          "https://thapar-nexus-backend.onrender.com/api/v1/student/homepage-dropdown-options"
        );
        setDropdownOptions(response.data);
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };
    fetchDropdownOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        "https://thapar-nexus-backend.onrender.com/api/v1/student/profile",
        formData
      );
      setLoading(false);
      setViewMode(true); // Switch back to view mode after saving
      window.location.reload(); // Refresh the page after saving
    } catch (error) {
      setLoading(false);
      setError("Failed to save details. Please try again.");
    }
  };

  const toggleEditMode = () => {
    setViewMode(false);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg pt-8 ml-10 mr-32 mb-8 relative">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>

      {viewMode && (
        <button
          type="button"
          onClick={toggleEditMode}
          className="absolute top-4 right-4 flex items-center px-4 py-2 text-black border border-gray-300 rounded hover:bg-black hover:text-white transition-colors duration-300"
        >
          <FaEdit size={20} className="mr-2" />{" "}
          {/* Adjust icon size and margin */}
          Edit
        </button>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={viewMode}
              className={`w-full p-2 border border-gray-300 rounded ${
                viewMode ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Roll No.</label>
            <input
              type="text"
              name="rollno"
              value={formData.rollno}
              onChange={handleChange}
              readOnly={viewMode}
              className={`w-full p-2 border border-gray-300 rounded ${
                viewMode ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Branch</label>
            <select
              name="branch"
              value={formData.branch}
              disabled={viewMode}
              onChange={handleChange}
              className={`w-full p-2 border border-gray-300 rounded ${
                viewMode ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
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
              disabled={viewMode}
              onChange={handleChange}
              className={`w-full p-2 border border-gray-300 rounded ${
                viewMode ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
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
              readOnly={viewMode}
              className={`w-full p-2 border border-gray-300 rounded ${
                viewMode ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              readOnly={viewMode}
              className={`w-full p-2 border border-gray-300 rounded ${
                viewMode ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              readOnly={viewMode}
              className={`w-full p-2 border border-gray-300 rounded ${
                viewMode ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              readOnly={viewMode}
              className={`w-full p-2 border border-gray-300 rounded ${
                viewMode ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
          </div>
        </div>

        {/* Show Save Details button if not in View Mode */}
        {!viewMode && (
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-900 text-white py-2 rounded hover:bg-black"
          >
            {loading ? "Saving Details..." : "Save Details"}
          </button>
        )}
      </form>
    </div>
  );
}

export default EditProfileForm;
