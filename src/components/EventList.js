import React, { useState, useEffect } from "react";
import { fetchLatestEvents } from "../services/api";
import EventCard from "./EventCard";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getEvents() {
      const data = await fetchLatestEvents();
      setEvents(data.slice(0, 5)); // Show only latest 5 events
    }
    getEvents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Latest Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
