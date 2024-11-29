import React from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa"; // Icon for "Add Post"
import { IoMdNotificationsOutline } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { FiLogOut } from "react-icons/fi";
import { FaHome } from "react-icons/fa"; // Icon for "Home"
import { FaRegFileAlt } from "react-icons/fa"; // Icon for "My Posts"
import { useNavigate } from "react-router-dom";

const AdminLeftSec = ({ name }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call logout API to clear the session
      await axios.post(
        "https://thapar-nexus-backend.onrender.com/api/v1/auth/placement-team/logout"
      );
      // Navigate to the home page after successful logout
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  // Updated icon list with new options and paths
  const iconlist = [
    {
      index: 0,
      image: <FaHome />, // Home icon
      text: "Home",
      action: () => navigate("/adminuserpage"),
    },
    {
      index: 1,
      image: <IoMdNotificationsOutline />,
      text: "Notifications",
      action: () => navigate("/admin-notifications"),
    },
    {
      index: 2,
      image: <FaPlus />,
      text: "Add Post",
      action: () => navigate("/add-post"),
    },
    {
      index: 3,
      image: <FaRegFileAlt />,
      text: "My Posts",
      action: () => navigate("/my-posts"),
    },
    {
      index: 4,
      image: <SlCalender />,
      text: "Calendar",
      action: () => navigate("/admincalendar"),
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

        {/* Display only the name */}
        <div className="text-center">
          <h2 className="text-black font-bold text-2xl break-words">{name}</h2>
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded-2xl border-2">
        {iconlist.map((icon) => (
          <div
            key={icon.index}
            className="flex items-center my-7 cursor-pointer"
            onClick={icon.action}
          >
            {icon.image}
            <span className="ml-7">{icon.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLeftSec;
