// PostDetailsPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminLeftSec from "./admin/AdminLeftSec";
import AdminPost from "./admin/AdminPost";
import AdminSmallCalendar from "./admin/AdminSmallCalendar";
import EventLegend from "./event-legend/EventLegend";

function AdminPostDetailsPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://thapar-nexus-backend.onrender.com/api/v1/placement-team/profile"
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
          `https://thapar-nexus-backend.onrender.com/api/v1/placement-team/posts/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    fetchPost();
  }, [postId]);

  return (
    <div className="flex flex-col lg:flex-row pt-8 bg-[#f3f4f6] w-full min-h-screen justify-center">
      <AdminLeftSec name={userData.name} />

      <div className="flex flex-col lg:flex-row w-full lg:w-2/3 px-4">
        <div className="w-full lg:w-2/3 px-4">
          {post ? (
            <AdminPost
              title={post.title}
              details={post.details}
              registrationLink={post.registrationLink}
              year={post.year}
              cgpa={post.cgpa}
              branchesEligible={post.branchesEligible}
              author={post.author}
              queries={post.queries}
              postId={post._id}
            />
          ) : (
            <p className="text-center text-gray-500">Loading post details...</p>
          )}
        </div>

        <div className="w-full lg:w-1/3 px-4 mt-6 lg:mt-0">
          <AdminSmallCalendar />
          <EventLegend />
        </div>
      </div>
    </div>
  );
}

export default AdminPostDetailsPage;
