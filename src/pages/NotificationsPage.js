import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LeftSec from "./userpage/LeftSec";
import Notifications from "./notifications/Notifications";
import SmallCalendar from "./userpage/SmallCalendar";
import EventLegend from "./event-legend/EventLegend";

function NotificationsPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    rollno: "",
    year: "",
  });
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/student/notifications"
        );
        setNotifications(response.data.notifications || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notification) => {
    try {
      const { relatedPost } = notification;

      // Mark notification as read
      await axios.put(
        `http://localhost:5000/api/v1/student/notifications/${notification._id}/mark-as-read`
      );

      // Navigate to the related post details page
      navigate(`/post/${relatedPost._id}`);
    } catch (error) {
      console.error("Error handling notification click:", error);
    }
  };

  return (
    <div className="h-screen overflow-y-scroll flex flex-col lg:flex-row pt-8 bg-[#f3f4f6] w-full min-h-screen justify-center">
      <LeftSec
        name={userData.name}
        rollno={userData.rollno}
        year={userData.year}
      />

      <div className="flex flex-col lg:flex-row w-full lg:w-2/3 px-4">
        <div className="w-full lg:w-2/3 px-4">
          <h2 className="text-left text-2xl font-semibold mb-4">
            Notifications
          </h2>
          <div className="bg-white rounded-md shadow-lg p-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : notifications.length ? (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <Notifications notification={notification} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No notifications available
              </p>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/3 px-4 mt-6 lg:mt-0">
          <SmallCalendar />
          <EventLegend />
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
