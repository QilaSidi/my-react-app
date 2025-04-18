import React, { useState, useEffect } from "react";
import { fetchLatestEvents } from "../services/api"; // Reuse API function
import EventCard from "../components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getEvents() {
      const data = await fetchLatestEvents();
      setEvents(data); // Show all events
    }
    getEvents();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">All Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p className="text-gray-600">No events available.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
