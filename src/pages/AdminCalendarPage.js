// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminLeftSec from "./admin/AdminLeftSec";
// import AdminBigCalendar from "./admin/AdminBigCalendar";

// function HorizontalEventLegend() {
//   return (
//     <div className="bg-white p-2 rounded-md shadow-lg mt-4 flex justify-around items-center w-full">
//       <div className="flex items-center">
//         <span className="w-4 h-4" style={{ backgroundColor: "#ff0000" }}></span>
//         <span className="ml-2 text-sm">Application Deadline</span>
//       </div>
//       <div className="flex items-center">
//         <span className="w-4 h-4" style={{ backgroundColor: "#0099ff" }}></span>
//         <span className="ml-2 text-sm">Pre-Placement Talk</span>
//       </div>
//       <div className="flex items-center">
//         <span className="w-4 h-4" style={{ backgroundColor: "#009999" }}></span>
//         <span className="ml-2 text-sm">Personality Assessment</span>
//       </div>
//       <div className="flex items-center">
//         <span className="w-4 h-4" style={{ backgroundColor: "#663300" }}></span>
//         <span className="ml-2 text-sm">Aptitude Test</span>
//       </div>
//       <div className="flex items-center">
//         <span className="w-4 h-4" style={{ backgroundColor: "#009933" }}></span>
//         <span className="ml-2 text-sm">Coding Test</span>
//       </div>
//       <div className="flex items-center">
//         <span className="w-4 h-4" style={{ backgroundColor: "#990099" }}></span>
//         <span className="ml-2 text-sm">Interview</span>
//       </div>
//       <div className="flex items-center">
//         <span className="w-4 h-4" style={{ backgroundColor: "#ffcc00" }}></span>
//         <span className="ml-2 text-sm">Hackathon</span>
//       </div>
//       <div className="flex items-center">
//         <span className="w-4 h-4" style={{ backgroundColor: "#ff6600" }}></span>
//         <span className="ml-2 text-sm">Training Session</span>
//       </div>
//       <div className="flex items-center">
//         <span className="w-4 h-4" style={{ backgroundColor: "#ff3399" }}></span>
//         <span className="ml-2 text-sm">Other Event</span>
//       </div>
//     </div>
//   );
// }

// const AdminCalendarPage = () => {
//   const [userData, setUserData] = useState({
//     name: "",
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(
//           "https://thapar-nexus-backend.onrender.com/api/v1/placement-team/profile"
//         );
//         setUserData(response.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetchUserData();
//   }, []);

//   return (
//     <div className="flex pt-8 bg-[#f3f4f6] w-full h-[91.37%]">
//       <AdminLeftSec name={userData.name} />
//       <div className="flex flex-col w-full px-8">
//         <AdminBigCalendar />
//         <HorizontalEventLegend />
//       </div>
//     </div>
//   );
// };

// export default AdminCalendarPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLeftSec from "./admin/AdminLeftSec";
import AdminBigCalendar from "./admin/AdminBigCalendar";

function HorizontalEventLegend() {
  return (
    <div className="bg-white p-2 rounded-md shadow-lg mt-4 flex justify-around items-center w-full">
      <div className="flex items-center">
        <span className="w-4 h-4" style={{ backgroundColor: "#ff0000" }}></span>
        <span className="ml-2 text-sm">Application Deadline</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4" style={{ backgroundColor: "#0099ff" }}></span>
        <span className="ml-2 text-sm">Pre-Placement Talk</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4" style={{ backgroundColor: "#009999" }}></span>
        <span className="ml-2 text-sm">Personality Assessment</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4" style={{ backgroundColor: "#663300" }}></span>
        <span className="ml-2 text-sm">Aptitude Test</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4" style={{ backgroundColor: "#009933" }}></span>
        <span className="ml-2 text-sm">Coding Test</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4" style={{ backgroundColor: "#990099" }}></span>
        <span className="ml-2 text-sm">Interview</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4" style={{ backgroundColor: "#ffcc00" }}></span>
        <span className="ml-2 text-sm">Hackathon</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4" style={{ backgroundColor: "#ff6600" }}></span>
        <span className="ml-2 text-sm">Training Session</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4" style={{ backgroundColor: "#ff3399" }}></span>
        <span className="ml-2 text-sm">Other Event</span>
      </div>
    </div>
  );
}

const AdminCalendarPage = () => {
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
        <div className="w-full lg:w-full px-4">
          <AdminBigCalendar />
          <HorizontalEventLegend />
        </div>
      </div>
    </div>
  );
};

export default AdminCalendarPage;
