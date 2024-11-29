import React from "react";
import Student_Signup_form from "./studentsignup/Student_Signup_form";
import logo2 from "../components/images/logo2.jpg";
import Homepage from "../components/Homepage";

const StudentSignUpPage = () => {
  return (
    <div
      className="w-full space-y-4  bg-cover bg-center min-h-screen "
      style={{ backgroundImage: `url(${logo2})` }}
    >
      <Homepage />
      <Student_Signup_form />
    </div>
  );
};

export default StudentSignUpPage;
