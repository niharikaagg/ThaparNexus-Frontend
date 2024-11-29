import React from "react";
import { Link } from "react-router-dom";

const Startup = () => {
  return (
    <div className="ml-20 bg-white bg-opacity-50 p-6 rounded shadow-md lg:w-96 md:w-64 lg:h-[200px] md:h-[200px]">
      <h2 className="text-2xl lg:mb-4 text-center">Welcome! You are?</h2>

      <Link to="/adminlogin">
        <button className="bg-red-900 text-white font-bold py-2 px-4 rounded w-full block mb-5 hover:bg-black">
          Placement Team Member
        </button>
      </Link>

      <Link to="/studentlogin">
        <button className="bg-red-900 text-white font-bold py-2 px-4 rounded w-full block mb-5 hover:bg-black">
          Student
        </button>
      </Link>
    </div>
  );
};

export default Startup;
