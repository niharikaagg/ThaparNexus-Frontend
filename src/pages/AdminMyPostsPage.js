import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminPost from "./admin/AdminPost";
import AdminLeftSec from "./admin/AdminLeftSec";
import AdminSmallCalendar from "./admin/AdminSmallCalendar";
import EventLegend from "./event-legend/EventLegend";

function AdminMyPostsPage() {
  const [userData, setUserData] = useState({
    name: "",
    _id: "",
  });
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/placement-team/profile"
        );
        setUserData(response.data);

        // Fetch posts with initial filter by author (placement team member)
        fetchPosts(response.data._id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const fetchPosts = async (placementTeamMemberId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/placement-team/posts/my-posts?author=${placementTeamMemberId}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="h-screen overflow-y-scroll flex flex-col lg:flex-row pt-8 bg-[#f3f4f6] w-full min-h-screen justify-center">
      <AdminLeftSec name={userData.name} />

      <div className="flex flex-col lg:flex-row w-full lg:w-2/3 px-4">
        <div className="w-full lg:w-2/3 px-4">
          <h2 className="text-left text-2xl font-semibold mt-4 mb-4">
            My Posts
          </h2>{" "}
          <div className="mt-6 rounded-md overflow-hidden shadow-lg">
            <div className="bg-white p-4 rounded-md shadow-lg">
              {searchResults.length ? (
                searchResults.map((post) => (
                  <AdminPost
                    key={post._id}
                    title={post.title}
                    details={post.details}
                    registrationLink={post.registrationLink}
                    year={post.year}
                    cgpa={post.cgpa}
                    branchesEligible={post.branchesEligible}
                    author={post.author}
                    queries={post.queries}
                    postId={post._id}
                    currentPlacementTeamMemberId={userData._id}
                    onPostDelete={(postId) =>
                      setSearchResults((prev) =>
                        prev.filter((post) => post._id !== postId)
                      )
                    }
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">No posts available</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 px-4 mt-6 lg:mt-0">
          <AdminSmallCalendar />
          <EventLegend />
        </div>
      </div>
    </div>
  );
}

export default AdminMyPostsPage;
