import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-lg font-bold">{event.title}</h3>
      <p className="text-gray-600">{event.description}</p>
      <p className="text-sm text-blue-500">{new Date(event.eventDate).toLocaleString()}</p>
    </div>
  );
};

export default EventCard;
