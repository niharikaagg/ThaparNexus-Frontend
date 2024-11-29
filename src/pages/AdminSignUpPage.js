import React from 'react'
import Admin_Signup_form from './admin/Admin_Signup_form'
import logo2 from '../components/images/logo2.jpg'
import Homepage from '../components/Homepage'


const AdminSignUpPage = () => {
    return (
        <div>
            
            <div className="w-full space-y-4  bg-cover bg-center min-h-screen " style={{ backgroundImage: `url(${logo2})` }}>
                <Homepage />
                <Admin_Signup_form/>
            </div>
            
        </div>
    )
}

export default AdminSignUpPage
