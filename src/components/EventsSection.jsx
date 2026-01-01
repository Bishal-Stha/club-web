"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Filter, Search } from "lucide-react";

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, selectedFilter, searchTerm]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    // Filter by type
    if (selectedFilter !== "all") {
      filtered = filtered.filter(
        (event) =>
          event.event_type.toLowerCase() === selectedFilter.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }),
      day: date.getDate(),
      year: date.getFullYear(),
      time: date.toLocaleDateString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const eventTypes = ["all", "workshop", "seminar", "hackathon"];

  if (loading) {
    return (
      <section id="events" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3b82f6] mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="events" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Our{" "}
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              Events
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mx-auto mb-8 rounded-full"></div>
          <p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            From hands-on workshops to inspiring seminars and exciting
            hackathons, discover the events that shape our tech community.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none text-white placeholder-gray-400"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedFilter(type)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedFilter === type
                    ? "bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Filter size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400 text-lg">
              No events found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
              const eventDate = formatDate(event.event_date);
              const isUpcoming = new Date(event.event_date) > new Date();

              return (
                <div
                  key={event.id}
                  className="bg-gray-700/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-600/50 hover:bg-gray-700/70 hover:border-gray-500/50 transition-all duration-300 group hover:-translate-y-2"
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        event.image_url ||
                        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop&auto=format&q=80"
                      }
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 text-center min-w-[60px] border border-gray-600/50">
                      <div
                        className="text-xs text-gray-400 font-medium"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {eventDate.month}
                      </div>
                      <div
                        className="text-lg font-bold text-[#06b6d4]"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        {eventDate.day}
                      </div>
                    </div>

                    {/* Event Type Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white text-xs px-3 py-1 rounded-full font-medium">
                        {event.event_type}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`text-white text-xs px-3 py-1 rounded-full font-medium ${
                          isUpcoming ? "bg-green-500" : "bg-gray-600"
                        }`}
                      >
                        {isUpcoming ? "Upcoming" : "Past Event"}
                      </span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold text-white mb-3 line-clamp-2"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {event.title}
                    </h3>

                    <p
                      className="text-gray-300 text-sm mb-4 line-clamp-3"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar size={16} className="mr-2" />
                        <span style={{ fontFamily: "Inter, sans-serif" }}>
                          {eventDate.time}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center text-gray-400 text-sm">
                          <MapPin size={16} className="mr-2" />
                          <span style={{ fontFamily: "Inter, sans-serif" }}>
                            {event.location}
                          </span>
                        </div>
                      )}
                      {event.max_participants && (
                        <div className="flex items-center text-gray-400 text-sm">
                          <Users size={16} className="mr-2" />
                          <span style={{ fontFamily: "Inter, sans-serif" }}>
                            {event.current_participants || 0}/
                            {event.max_participants} participants
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    {isUpcoming && event.registration_link ? (
                      <a
                        href={event.registration_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white py-3 rounded-lg font-semibold text-center block hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Register Now
                      </a>
                    ) : (
                      <button
                        className="w-full bg-gray-600 text-gray-300 py-3 rounded-lg font-semibold text-center block"
                        style={{ fontFamily: "Inter, sans-serif" }}
                        disabled
                      >
                        {isUpcoming ? "Registration Closed" : "Event Completed"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}