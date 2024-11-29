import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Tooltip as ReactTooltip } from "react-tooltip";

const BigCalendar = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://thapar-nexus-backend.onrender.com/api/v1/placement-team/calendar/view-events"
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

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Render custom content for event entries
  const renderEventContent = (eventInfo) => (
    <div
      data-tooltip-id="calendar-tooltip"
      data-tooltip-content={eventInfo.event.title}
      className="flex items-center text-xs sm:text-sm p-1 rounded-md overflow-hidden text-ellipsis cursor-pointer"
    >
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
