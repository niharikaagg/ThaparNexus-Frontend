import React from "react";

const EventLegend = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-lg mt-4">
      <h3 className="text-center text-lg font-semibold mb-2">Event Legend</h3>
      <div className="flex items-center mb-2">
        <span className="w-3 h-3" style={{ backgroundColor: "#ff0000" }}></span>
        <span className="ml-2">Application Deadline</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="w-3 h-3" style={{ backgroundColor: "#0099ff" }}></span>
        <span className="ml-2">Pre-Placement Talk</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="w-3 h-3" style={{ backgroundColor: "#009999" }}></span>
        <span className="ml-2">Personality Assessment</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="w-3 h-3" style={{ backgroundColor: "#663300" }}></span>
        <span className="ml-2">Aptitude Test</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="w-3 h-3" style={{ backgroundColor: "#009933" }}></span>
        <span className="ml-2">Coding Test</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="w-3 h-3" style={{ backgroundColor: "#990099" }}></span>
        <span className="ml-2">Interview</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="w-3 h-3" style={{ backgroundColor: "#ffcc00" }}></span>
        <span className="ml-2">Hackathon</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="w-3 h-3" style={{ backgroundColor: "#ff6600" }}></span>
        <span className="ml-2">Training Session</span>
      </div>
      <div className="flex items-center mb-2">
        <span className="w-3 h-3" style={{ backgroundColor: "#ff3399" }}></span>
        <span className="ml-2">Other Event</span>
      </div>
    </div>
  );
};

export default EventLegend;
