import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaTrash } from "react-icons/fa";

const BigCalendar = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the server
  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/student/calendar/view-events"
      );
      const eventData = response.data.map((event) => ({
        id: event._id,
        title: event.calendarEventName,
        date: new Date(event.calendarEventDate).toISOString().split("T")[0],
        color: event.color,
      }));

      setEvents(eventData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Delete an event by ID
  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/student/calendar/delete-event/${eventId}`
      );
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Render custom content for event entries, including a delete button
  const renderEventContent = (eventInfo) => (
    <div
      data-tooltip-id="calendar-tooltip"
      data-tooltip-content={eventInfo.event.title}
      className="flex items-center text-xs sm:text-sm p-1 rounded-md overflow-hidden text-ellipsis cursor-pointer"
    >
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering calendar event click
          deleteEvent(eventInfo.event.id);
        }}
        className="mr-2 flex items-center text-inherit hover:text-red-700"
        title="Delete Event"
      >
        <FaTrash />
      </button>
      <span>{eventInfo.event.title}</span>
    </div>
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-white p-4 rounded-md shadow-lg mt-8 mb-8 relative">
      <div className="h-screen md:h-[70vh] lg:h-[60vh]">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "title", // Display the month title on the left
            right: "prev,next", // Display the navigation buttons on the right
          }}
          events={events}
          eventContent={renderEventContent}
          dayCellClassNames={() =>
            "h-[10vw] md:h-[6vw] lg:h-[4vw] max-h-[80px]"
          }
          height="100%"
          aspectRatio={2}
        />
      </div>
      <ReactTooltip id="calendar-tooltip" effect="solid" place="top" />
    </div>
  );
};

export default BigCalendar;
