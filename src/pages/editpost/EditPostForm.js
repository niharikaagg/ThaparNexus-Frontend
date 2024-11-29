import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

function EditPostForm() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    organization: "",
    title: "",
    eventType: "",
    details: "",
    registrationLink: "",
    branchesEligible: [],
    year: [],
    cgpa: "",
    applicationDeadline: "",
    prePlacementTalkDate: "",
    personalityAssessmentDate: "",
    aptitudeTestDate: "",
    codingTestDate: "",
    interviewDate: "",
    hackathonDate: "",
    trainingSessionDate: "",
    eventDate: "",
  });

  const [dropdownOptions, setDropdownOptions] = useState({
    branches: [],
    years: [],
    eventTypes: [],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const response = await axios.get(
          "https://thapar-nexus-backend.onrender.com/api/v1/placement-team/homepage-dropdown-options"
        );
        setDropdownOptions({
          branches: response.data.branches.map((branch) => ({
            value: branch,
            label: branch,
          })),
          years: response.data.years.map((year) => ({
            value: year,
            label: year.toString(),
          })),
          eventTypes: response.data.types.map((type) => ({
            value: type,
            label: type,
          })),
        });

        fetchPostDetails();
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `https://thapar-nexus-backend.onrender.com/api/v1/placement-team/posts/${id}`
        );
        const post = response.data;

        setFormData({
          organization: post.organization,
          title: post.title,
          eventType: post.eventType,
          details: post.details,
          registrationLink: post.registrationLink || "",
          branchesEligible: post.branchesEligible.map((branch) => ({
            value: branch,
            label: branch,
          })),
          year: post.year.map((y) => ({
            value: y,
            label: y.toString(),
          })),
          cgpa: post.cgpa,
          applicationDeadline: formatDate(post.applicationDeadline),
          prePlacementTalkDate: formatDate(post.prePlacementTalkDate),
          personalityAssessmentDate: formatDate(post.personalityAssessmentDate),
          aptitudeTestDate: formatDate(post.aptitudeTestDate),
          codingTestDate: formatDate(post.codingTestDate),
          interviewDate: formatDate(post.interviewDate),
          hackathonDate: formatDate(post.hackathonDate),
          trainingSessionDate: formatDate(post.trainingSessionDate),
          eventDate: formatDate(post.eventDate),
        });
      } catch (error) {
        console.error("Error fetching post details:", error);
        setError("Failed to load post details.");
      }
    };

    fetchDropdownOptions();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOptions, action) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => ({
          value: option.value,
          label: option.label,
        }))
      : [];
    setFormData((prevData) => ({
      ...prevData,
      [action.name]: selectedValues,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const filteredFormData = { ...formData };

    filteredFormData.branchesEligible = formData.branchesEligible.map(
      (option) => option.value
    );
    filteredFormData.year = formData.year.map((option) => option.value);

    const dateFields = [
      "applicationDeadline",
      "prePlacementTalkDate",
      "personalityAssessmentDate",
      "aptitudeTestDate",
      "codingTestDate",
      "interviewDate",
      "hackathonDate",
      "trainingSessionDate",
      "eventDate",
    ];

    dateFields.forEach((field) => {
      if (!filteredFormData[field]) {
        delete filteredFormData[field];
      }
    });

    if (!filteredFormData.registrationLink) {
      delete filteredFormData.registrationLink;
    }

    try {
      const response = await axios.put(
        `https://thapar-nexus-backend.onrender.com/api/v1/placement-team/posts/edit-post/${id}`,
        filteredFormData
      );

      console.log("Post Updated:", response.data);
      setSuccess("Post updated successfully!");
      setError("");
      setTimeout(() => {
        navigate("/adminuserpage");
      }, 1500);
    } catch (error) {
      console.error("Error updating post:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update post. Please try again."
      );
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg pt-8 ml-10 mr-32 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Details</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">
              Organization
            </label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Event Type</label>
            <Select
              name="eventType"
              options={dropdownOptions.eventTypes}
              value={dropdownOptions.eventTypes.find(
                (type) => type.value === formData.eventType
              )}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption ? [selectedOption] : [], {
                  name: "eventType",
                })
              }
              className="w-full"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Registration Link
          </label>
          <input
            type="url"
            name="registrationLink"
            value={formData.registrationLink}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/3">
            <label className="block text-sm font-medium mb-1">
              Eligible Branches
            </label>
            <Select
              isMulti
              name="branchesEligible"
              options={dropdownOptions.branches}
              value={formData.branchesEligible}
              onChange={(selectedOptions) =>
                handleSelectChange(selectedOptions, {
                  name: "branchesEligible",
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium mb-1">
              Eligible Years
            </label>
            <Select
              isMulti
              name="year"
              options={dropdownOptions.years}
              value={formData.year}
              onChange={(selectedOptions) =>
                handleSelectChange(selectedOptions, { name: "year" })
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium mb-1">CGPA</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        {/* Dates */}
        <div className="flex space-x-4">
          <div className="w-1/3">
            <label className="block text-sm font-medium mb-1">
              Application Deadline
            </label>
            <input
              type="text"
              name="applicationDeadline"
              placeholder="dd-mm-yyyy"
              value={formData.applicationDeadline}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium mb-1">
              Pre-Placement Talk Date
            </label>
            <input
              type="text"
              name="prePlacementTalkDate"
              placeholder="dd-mm-yyyy"
              value={formData.prePlacementTalkDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium mb-1">
              Personality Assessment Date
            </label>
            <input
              type="text"
              name="personalityAssessmentDate"
              placeholder="dd-mm-yyyy"
              value={formData.personalityAssessmentDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/3">
            <label className="block text-sm font-medium mb-1">
              Aptitude Test Date
            </label>
            <input
              type="text"
              name="aptitudeTestDate"
              placeholder="dd-mm-yyyy"
              value={formData.aptitudeTestDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium mb-1">
              Coding Test Date
            </label>
            <input
              type="text"
              name="codingTestDate"
              placeholder="dd-mm-yyyy"
              value={formData.codingTestDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium mb-1">
              Interview Date
            </label>
            <input
              type="text"
              name="interviewDate"
              placeholder="dd-mm-yyyy"
              value={formData.interviewDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/3">
            <label className="block text-sm font-medium mb-1">
              Hackathon Date
            </label>
            <input
              type="text"
              name="hackathonDate"
              placeholder="dd-mm-yyyy"
              value={formData.hackathonDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium mb-1">
              Training Session Date
            </label>
            <input
              type="text"
              name="trainingSessionDate"
              placeholder="dd-mm-yyyy"
              value={formData.trainingSessionDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium mb-1">Event Date</label>
            <input
              type="text"
              name="eventDate"
              placeholder="dd-mm-yyyy"
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-red-900 text-white py-2 rounded hover:bg-black"
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPostForm;
