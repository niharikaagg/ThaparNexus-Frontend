import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import logo2 from "./components/images/logo2.jpg";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import StudentSignUpPage from "./pages/StudentSignUpPage";
import About from "./components/About";
import Contact from "./components/Contact";
import Userpage from "./pages/Userpage";
import SavedPostsPage from "./pages/SavedPostsPage";
import AdminUserpage from "./pages/AdminUserpage";
import AdminMyPostsPage from "./pages/AdminMyPostsPage";
import AdminCalendarPage from "./pages/AdminCalendarPage";
import AdminSignUpPage from "./pages/AdminSignUpPage";
import StartupPage from "./pages/StartupPage";
import StudentLoginPage from "./pages/StudentLoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import CalendarPage from "./pages/CalendarPage";
import AddPostPage from "./pages/AddPostPage";
import EditPostPage from "./pages/EditPostPage";
import NotificationsPage from "./pages/NotificationsPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import AdminNotificationsPage from "./pages/AdminNotificationsPage";
import AdminPostDetailsPage from "./pages/AdminPostDetailsPage";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="">
        <Routes>
          <Route
            path="/"
            element={
              <div
                className="w-full space-y-4  bg-cover bg-center min-h-screen "
                style={{ backgroundImage: `url(${logo2})` }}
              >
                <Homepage />
                <StartupPage />
              </div>
            }
          />
          <Route path="/studentsignup" element={<StudentSignUpPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/userpage" element={<Userpage />} />
          <Route path="/completeprofile" element={<CompleteProfilePage />} />
          <Route path="/profile" element={<EditProfilePage />} />
          <Route path="/saved" element={<SavedPostsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route
            path="/student-notifications"
            element={<NotificationsPage />}
          />
          <Route path="/post/:postId" element={<PostDetailsPage />} />
          <Route path="/adminuserpage" element={<AdminUserpage />} />
          <Route path="/my-posts" element={<AdminMyPostsPage />} />
          <Route path="/add-post" element={<AddPostPage />} />
          <Route path="/edit-post/:id" element={<EditPostPage />} />
          <Route path="/admincalendar" element={<AdminCalendarPage />} />
          <Route
            path="/admin-notifications"
            element={<AdminNotificationsPage />}
          />
          <Route
            path="/admin-post/:postId"
            element={<AdminPostDetailsPage />}
          />
          <Route path="/adminlogin" element={<AdminLoginPage />} />
          <Route path="/adminsignup" element={<AdminSignUpPage />} />
          <Route path="/studentlogin" element={<StudentLoginPage />} />
          <Route path="/adminlogin" element={<AdminLoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
