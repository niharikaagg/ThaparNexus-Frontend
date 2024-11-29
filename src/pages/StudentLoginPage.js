import React from "react";
import Student_Login_Form from "./login/Student_Login_Form";
import Homepage from "../components/Homepage";
import logo2 from "../components/images/logo2.jpg";

const StudentLoginPage = () => {
  return (
    <div>
      <div
        className="w-full space-y-4  bg-cover bg-center min-h-screen "
        style={{ backgroundImage: `url(${logo2})` }}
      >
        <Homepage />
        <Student_Login_Form />
      </div>
    </div>
  );
};

export default StudentLoginPage;
