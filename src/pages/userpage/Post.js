import React, { useState, useEffect } from "react";
import Query from "./Query.js";
import { TiMessage } from "react-icons/ti";
import { CiSaveDown2 } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { AiOutlineCheck } from "react-icons/ai"; // Tick icon for added to calendar
import { AiOutlineSend } from "react-icons/ai"; // Send icon for queries
import axios from "axios";

function Post({
  title,
  details,
  registrationLink,
  year,
  cgpa,
  branchesEligible,
  author,
  queries,
  postId, // Add postId prop
  isInitiallySaved, // Add prop to know if the post is already saved
  onCalendarUpdate, // Add callback for reloading calendar
}) {
  const [showQueries, setShowQueries] = useState(false); // Toggle query view
  const [isSaved, setIsSaved] = useState(isInitiallySaved); // Track save status
  const [newQuery, setNewQuery] = useState(""); // New query input field
  const [error, setError] = useState(""); // Error handling
  const [queryList, setQueryList] = useState(queries || []); // Current list of queries
  const [isAddedToCalendar, setIsAddedToCalendar] = useState(false); // Track calendar status

  // Check if the post is already in the calendar on load
  useEffect(() => {
    const checkIfAddedToCalendar = async () => {
      try {
        const response = await axios.get(
          `https://thapar-nexus-backend.onrender.com/api/v1/student/calendar/check-events/${postId}`
        );
        setIsAddedToCalendar(response.data.isAddedToCalendar);
      } catch (error) {
        console.error("Error checking calendar status:", error);
      }
    };

    checkIfAddedToCalendar();
  }, [postId]);

  // Function to handle adding/removing post events to/from the calendar
  const handleAddToCalendar = async () => {
    try {
      const response = await axios.post(
        `https://thapar-nexus-backend.onrender.com/api/v1/student/calendar/toggle-events/${postId}`
      );
      setIsAddedToCalendar(!isAddedToCalendar); // Toggle the calendar status after response
      console.log(response.data.message);

      // Trigger the calendar reload through the callback function
      if (onCalendarUpdate) onCalendarUpdate(); // Trigger calendar reload
    } catch (error) {
      console.error("Error adding/removing events in calendar:", error);
    }
  };

  // Function to handle save/unsave post
  const handleSaveToggle = async () => {
    try {
      const response = await axios.put(
        `https://thapar-nexus-backend.onrender.com/api/v1/student/posts/save/${postId}`
      );
      setIsSaved(!isSaved);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error saving/unsaving post:", error);
    }
  };

  // Function to handle submitting a new query
  const handleSubmitQuery = async () => {
    if (!newQuery.trim()) {
      setError("Please enter a query.");
      return;
    }

    try {
      const response = await axios.post(
        `https://thapar-nexus-backend.onrender.com/api/v1/student/posts/${postId}/query`,
        { queryText: newQuery }
      );

      setQueryList((prevQueries) => [...prevQueries, response.data.query]);
      setNewQuery(""); // Reset input after submission
      setError(""); // Clear error message
      setShowQueries(true); // Show queries section if not already visible
      console.log("Query submitted successfully:", response.data);
    } catch (error) {
      setError("Failed to submit query. Please try again.");
      console.error("Error submitting query:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-lg my-4">
      {/* Author Section */}
      <div className="flex items-center mb-4">
        <img
          src={author.profilePicture}
          alt={author.name}
          className="w-8 h-8 rounded-full object-cover mr-2"
        />
        <span className="font-semibold text-gray-800">{author.name}</span>
      </div>

      {/* Post Title */}
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

      {/* Post Details */}
      <p className="mt-2 text-gray-600">{details}</p>

      {/* Registration Link */}
      {registrationLink && (
        <a
          href={registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-blue-500 hover:underline"
        >
          Register Here
        </a>
      )}

      {/* Post Information */}
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <div>
          <span className="font-bold">Year: </span>
          {year.join(", ")}
        </div>
        <div>
          <span className="font-bold">
            CGPA: <span className="font-normal">above</span>{" "}
          </span>
          {cgpa}
        </div>
        <div>
          <span className="font-bold">Branch: </span>
          {branchesEligible.join(", ")}
        </div>
      </div>

      {/* Icons at the bottom */}
      <div className="mt-4 flex justify-between">
        {/* Add to Calendar */}
        <div
          className="flex items-center cursor-pointer"
          onClick={handleAddToCalendar}
        >
          {isAddedToCalendar ? (
            <AiOutlineCheck className="text-xl" />
          ) : (
            <SlCalender className="text-xl" />
          )}
          <span className="pl-2">
            {isAddedToCalendar ? "Added To Cal" : "Add To Cal"}
          </span>
        </div>

        {/* Toggle Query View */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setShowQueries(!showQueries)}
        >
          <TiMessage className="text-xl" />
          <span className="pl-2">Query</span>
        </div>

        {/* Save/Unsave Toggle */}
        <div
          className="flex items-center cursor-pointer"
          onClick={handleSaveToggle}
        >
          {isSaved ? (
            <AiOutlineCheck className="text-xl" />
          ) : (
            <CiSaveDown2 className="text-xl" />
          )}
          <span className="pl-2">{isSaved ? "Saved" : "Save"}</span>
        </div>
      </div>

      {/* Show Query Input Field */}
      {showQueries && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-800">
            Ask a Question
          </h4>
          <div className="flex items-center border rounded-md border-gray-300">
            <textarea
              className="w-full p-2 h-10 border-none outline-none"
              rows="1"
              placeholder="Enter your query..."
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
            />
            <AiOutlineSend
              className="text-blue-500 text-xl cursor-pointer"
              onClick={handleSubmitQuery}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      )}

      {/* Queries Section */}
      {showQueries && queryList.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-800">Queries</h4>
          {queryList.map((query) => (
            <Query key={query._id} query={query} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
