import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Tooltip as ReactTooltip } from "react-tooltip";

const AdminSmallCalendar = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/placement-team/calendar/view-events"
      );

      const eventData = response.data.map((event) => ({
        title: event.calendarEventName,
        date: new Date(event.calendarEventDate).toISOString().split("T")[0],
        color: event.color,
      }));

      setEvents(eventData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto p-4 bg-white shadow-lg rounded-md mt-8 mb-8">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: "title",
          right: "prev,next", // Only "prev" and "next" buttons
        }}
        // buttonText={{
        //   today: "Today",
        // }}
        aspectRatio={1.5}
        contentHeight="auto"
        fixedWeekCount={false}
        eventBackgroundColor="#5f9ea0"
        eventBorderColor="#4682b4"
        dayMaxEventRows={2}
        eventClick={(info) => {
          alert("Event: " + info.event.title);
        }}
        eventContent={(info) => (
          <div
            data-tooltip-id="calendar-tooltip"
            data-tooltip-content={info.event.title}
            className="flex items-center cursor-pointer text-xs sm:text-xs truncate"
          >
            <span>{info.event.title}</span>
          </div>
        )}
        heightAuto={true}
        dayCellClassNames="h-[6vw] md:h-[4vw] lg:h-[3vw] max-h-[60px] border border-gray-300" // Shortened cell height
        headerToolbarClassNames="flex items-center justify-between bg-gray-100 px-2 py-1 rounded-lg mb-2"
        titleClassNames="text-xs md:text-sm font-medium"
        buttonClassNames="text-xs px-0.5 py-0.5 rounded bg-green-400 text-white hover:bg-green-500 transition" // Smaller button size
      />
      <ReactTooltip id="calendar-tooltip" effect="solid" place="top" />
    </div>
  );
};

export default AdminSmallCalendar;
