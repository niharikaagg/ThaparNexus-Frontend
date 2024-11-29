import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./userpage/SearchBar";
import Dropdown from "./userpage/Dropdown";
import Post from "./userpage/Post";
import LeftSec from "./userpage/LeftSec";
import SmallCalendar from "./userpage/SmallCalendar";
import EventLegend from "./event-legend/EventLegend";

function Userpage() {
  const [dropdownOptions, setDropdownOptions] = useState({
    branches: [],
    years: [],
    cgpas: [],
    types: [],
  });

  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [eventType, setType] = useState("");
  const [searchText, setSearchText] = useState(""); // State to hold search text
  const [userData, setUserData] = useState({
    name: "",
    rollno: "",
    year: "",
    savedPosts: [],
  });
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/student/homepage-dropdown-options"
        );
        setDropdownOptions({
          branches: response.data.branches,
          years: response.data.years,
          cgpas: response.data.cgpas,
          types: response.data.types,
        });
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };
    fetchDropdownOptions();
  }, []);

  const fetchPosts = async (branch, year, cgpa, eventType, searchText) => {
    try {
      const params = new URLSearchParams({
        ...(branch !== "All" && { branch }),
        ...(year !== "All" && { year }),
        ...(cgpa !== "All" && { cgpa }),
        ...(eventType !== "All" && { eventType }),
        ...(searchText && { searchText }),
      });

      const response = await axios.get(
        `http://localhost:5000/api/v1/student/posts?${params.toString()}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/student/profile"
        );
        setUserData(response.data);

        // Set initial filters
        setBranch(response.data.branch || "All");
        setYear(response.data.year ? response.data.year.toString() : "All");
        setCgpa(
          response.data.cgpa ? Math.ceil(response.data.cgpa).toString() : "All"
        );
        setType("All");

        // Fetch posts with initial filter
        fetchPosts(
          response.data.branch || "All",
          response.data.year ? response.data.year.toString() : "All",
          response.data.cgpa ? Math.ceil(response.data.cgpa).toString() : "All",
          "All",
          ""
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Refetch posts whenever filters or searchText change
  useEffect(() => {
    fetchPosts(branch, year, cgpa, eventType, searchText);
  }, [branch, year, cgpa, eventType, searchText]);

  const handleSearch = (query) => {
    setSearchText(query);
  };

  return (
    <div className="h-screen overflow-y-scroll flex flex-col lg:flex-row pt-8 bg-[#f3f4f6] w-full min-h-screen justify-center">
      <LeftSec
        name={userData.name}
        rollno={userData.rollno}
        year={userData.year}
      />

      <div className="flex flex-col lg:flex-row w-full lg:w-2/3 px-4">
        <div className="w-full lg:w-2/3 px-4">
          <SearchBar onSearch={handleSearch} />
          <div className="flex gap-14 justify-center lg:justify-start mt-4">
            <Dropdown
              label="Branch"
              options={dropdownOptions.branches}
              onChange={setBranch}
              defaultValue={userData.branch || "All"} // Set default from user data or "All"
            />
            <Dropdown
              label="Year"
              options={dropdownOptions.years}
              onChange={setYear}
              defaultValue={userData.year ? userData.year.toString() : "All"}
            />
            <Dropdown
              label="CGPA"
              options={dropdownOptions.cgpas}
              onChange={setCgpa}
              defaultValue={
                userData.cgpa ? Math.ceil(userData.cgpa).toString() : "All"
              }
            />
            <Dropdown
              label="Type"
              options={dropdownOptions.types}
              onChange={setType}
              defaultValue={"All"}
            />
          </div>
          <div className="mt-6 rounded-md overflow-hidden shadow-lg">
            <div className="bg-white p-4 rounded-md shadow-lg">
              {searchResults.length ? (
                searchResults.map((post, index) => (
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
                <p className="text-center text-gray-500">No posts available</p>
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

export default Userpage;
