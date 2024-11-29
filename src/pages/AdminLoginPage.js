import React from 'react'
import Homepage from '../components/Homepage'
import logo2 from '../components/images/logo2.jpg'
import Admin_Login_Form from './admin/Admin_Login_Form';

const AdminLoginPage = () => {
  return (
    <div>
      <div
        className="w-full space-y-4  bg-cover bg-center min-h-screen "
        style={{ backgroundImage: `url(${logo2})` }}
      >
        <Homepage />
        <Admin_Login_Form/>
      </div>
    </div>
  );
};

export default AdminLoginPage;
