// PostDetailsPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LeftSec from "./userpage/LeftSec";
import Post from "./userpage/Post";
import SmallCalendar from "./userpage/SmallCalendar";
import EventLegend from "./event-legend/EventLegend";

function PostDetailsPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    rollno: "",
    year: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://thapar-nexus-backend.onrender.com/api/v1/student/profile"
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://thapar-nexus-backend.onrender.com/api/v1/student/posts/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <div className="h-screen overflow-y-scroll flex flex-col lg:flex-row pt-8 bg-[#f3f4f6] w-full min-h-screen justify-center">
      <LeftSec
        name={userData.name}
        rollno={userData.rollno}
        year={userData.year}
      />

      <div className="flex flex-col lg:flex-row w-full lg:w-2/3 px-4">
        <div className="w-full lg:w-2/3 px-4">
          {post ? (
            <Post
              title={post.title}
              details={post.details}
              registrationLink={post.registrationLink}
              year={post.year}
              cgpa={post.cgpa}
              branchesEligible={post.branchesEligible}
              author={post.author}
              queries={post.queries}
              postId={post._id}
              isInitiallySaved={userData.savedPosts?.includes(post._id)}
            />
          ) : (
            <p className="text-center text-gray-500">Loading post details...</p>
          )}
        </div>

        <div className="w-full lg:w-1/3 px-4 mt-6 lg:mt-0">
          <SmallCalendar />
          <EventLegend />
        </div>
      </div>
    </div>
  );
}

export default PostDetailsPage;
