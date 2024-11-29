import React, { useState, useEffect } from "react";
import axios from "axios";
import LeftSec from "./userpage/LeftSec";
import CompleteProfileForm from "./complete-profile/CompleteProfileForm";

const CompleteProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    rollno: "",
    year: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/student/profile"
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
      <LeftSec
        name={userData.name}
        rollno={userData.rollno}
        year={userData.year}
      />
      <div className="flex flex-col lg:flex-row w-full lg:w-2/3 px-4">
        <div className="w-full lg:w-full -ml-10 px-4">
          <CompleteProfileForm />
        </div>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
