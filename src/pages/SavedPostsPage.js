import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./userpage/Post";
import LeftSec from "./userpage/LeftSec";
import SmallCalendar from "./userpage/SmallCalendar";
import EventLegend from "./event-legend/EventLegend";

// New state for saved posts and loading state for data
function SavedPostsPage() {
  const [userData, setUserData] = useState({
    name: "",
    rollno: "",
    year: "",
    savedPosts: [],
  });
  const [savedPosts, setSavedPosts] = useState([]); // New state for saved posts
  const [loading, setLoading] = useState(true);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://thapar-nexus-backend.onrender.com/api/v1/student/profile"
        );
        setUserData(response.data); // Set user data from profile endpoint
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Fetch saved posts
  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await axios.get(
          "https://thapar-nexus-backend.onrender.com/api/v1/student/posts/saved"
        ); // Adjust the endpoint as needed
        setSavedPosts(response.data.savedPosts || []); // Set only saved posts
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching saved posts:", error);
        setLoading(false);
      }
    };
    fetchSavedPosts();
  }, []);
  return (
    <div className="h-screen overflow-y-scroll flex flex-col lg:flex-row pt-8 bg-[#f3f4f6] w-full min-h-screen justify-center">
      <LeftSec
        name={userData.name}
        rollno={userData.rollno}
        year={userData.year}
      />

      <div className="flex flex-col lg:flex-row w-full lg:w-2/3 px-4">
        <div className="w-full lg:w-2/3 px-4">
          {/* Heading for Saved Posts */}
          <h2 className="text-left text-2xl font-semibold mt-4 mb-4">
            Saved Posts
          </h2>{" "}
          {/* New Heading */}
          <div className="mt-6 rounded-md overflow-hidden shadow-lg">
            <div className="bg-white p-4 rounded-md shadow-lg">
              {loading ? ( // Display loading text while fetching data
                <p className="text-center text-gray-500">Loading...</p>
              ) : savedPosts.length ? (
                savedPosts.map((post, index) => (
                  <Post
                    key={index}
                    title={post.title}
                    details={post.details}
                    registrationLink={post.registrationLink}
                    year={post.year}
                    cgpa={post.cgpa}
                    branchesEligible={post.branchesEligible}
                    author={post.author}
                    queries={post.queries}
                    postId={post._id} // Pass post ID to uniquely identify the post
                    isInitiallySaved={userData.savedPosts.includes(post._id)} // Check if the post is saved
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No saved posts available
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 px-4 mt-6 lg:mt-0">
          <SmallCalendar />
          <EventLegend />
        </div>
      </div>
    </div>
  );
}

export default SavedPostsPage;
