import React from "react";
import { MdPerson } from "react-icons/md"; // Profile icon
import { IoMdNotificationsOutline } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { CiSaveDown2 } from "react-icons/ci";
import { FaHome } from "react-icons/fa"; // Home icon
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LeftSec = ({ name, rollno, year }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call logout API to clear the session
      await axios.post("http://localhost:5000/api/v1/auth/student/logout");
      // Navigate to the home page after successful logout
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const iconlist = [
    {
      index: 0,
      image: <FaHome />,
      text: "Home",
      action: () => navigate("/userpage"),
    },
    {
      index: 1,
      image: <MdPerson />,
      text: "Profile",
      action: () => navigate("/profile"),
    },
    {
      index: 2,
      image: <IoMdNotificationsOutline />,
      text: "Notifications",
      action: () => navigate("/student-notifications"),
    },
    {
      index: 3,
      image: <SlCalender />,
      text: "Calendar",
      action: () => navigate("/calendar"),
    },
    {
      index: 4,
      image: <CiSaveDown2 />,
      text: "Saved",
      action: () => navigate("/saved"),
    },
    {
      index: 5,
      image: <FiLogOut />,
      text: "Logout",
      action: handleLogout, // Bind logout function
    },
  ];

  return (
    <div className="w-fit h-fit ml-5">
      <div className="bg-white p-4 rounded-2xl border-2">
        <div className="bg-red-900">
          <img
            className="w-64 h-24 border-gray-300 rounded-2xl border-2"
            src="https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"
            alt="userimg"
          />
        </div>

        <hr className="border-t-2 border-gray-300 my-4" />

        <div className="text-center">
          <h2 className="text-black font-bold text-2xl break-words">{name}</h2>
          <p>{rollno}</p>
          {year && <p>Year {year}</p>}
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded-2xl border-2">
        {iconlist.map((icon) => (
          <div
            key={icon.index}
            className="flex items-center my-7 cursor-pointer"
            onClick={icon.action} // Trigger the appropriate action
          >
            {icon.image}
            <span className="ml-7">{icon.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSec;
