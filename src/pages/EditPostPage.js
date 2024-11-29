import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLeftSec from "./admin/AdminLeftSec";
import EditPostForm from "./editpost/EditPostForm";

const EditPostPage = () => {
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

  return (
    <div className="h-screen overflow-y-scroll flex flex-col lg:flex-row pt-8 bg-[#f3f4f6] w-full min-h-screen justify-center">
      <AdminLeftSec name={userData.name} />
      <div className="flex flex-col lg:flex-row w-full lg:w-2/3 px-4">
        <div className="w-full lg:w-full -ml-10 px-4">
          <EditPostForm />
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
