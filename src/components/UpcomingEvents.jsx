"use client";

import { useState, useEffect } from "react";
import { Clock, Calendar, MapPin, Bell, Mail } from "lucide-react";

export default function UpcomingEvents() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUpcomingEvents();
    fetchNotifications();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch("/api/events/upcoming");
      if (!response.ok) {
        throw new Error(`Failed to fetch upcoming events: ${response.status}`);
      }
      const data = await response.json();
      setUpcomingEvents(data);
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      setError("Failed to load upcoming events");
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications");
      if (!response.ok) {
        throw new Error(`Failed to fetch notifications: ${response.status}`);
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribing(true);
    setSubscribeMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Subscription failed: ${response.status}`);
      }

      setSubscribeMessage(
        "Successfully subscribed! You'll receive notifications about upcoming events.",
      );
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubscribeMessage("Failed to subscribe. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  const calculateCountdown = (eventDate) => {
    const now = new Date().getTime();
    const eventTime = new Date(eventDate).getTime();
    const difference = eventTime - now;

    if (difference <= 0) {
      return { expired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes, expired: false };
  };

  if (loading) {
    return (
      <section id="upcoming" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3b82f6] mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading upcoming events...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="upcoming" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              Upcoming Events
            </span>{" "}
            & Notifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mx-auto mb-8 rounded-full"></div>
          <p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Stay updated with our latest events and important announcements.
            Never miss an opportunity to grow and connect with our community.
          </p>
        </div>

        {/* Notifications Alert Bar */}
        {notifications.length > 0 && (
          <div className="mb-12">
            {notifications.slice(0, 2).map((notification) => (
              <div
                key={notification.id}
                className={`mb-4 p-4 rounded-xl border-l-4 ${
                  notification.notification_type === "urgent"
                    ? "bg-red-900/20 border-red-400 text-red-300"
                    : notification.notification_type === "event"
                      ? "bg-blue-900/20 border-blue-400 text-blue-300"
                      : "bg-green-900/20 border-green-400 text-green-300"
                }`}
              >
                <div className="flex items-start">
                  <Bell size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4
                      className="font-semibold mb-1"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {notification.title}
                    </h4>
                    <p style={{ fontFamily: "Inter, sans-serif" }}>
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upcoming Events with Countdown */}
          <div>
            <h3
              className="text-2xl font-bold text-white mb-8"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Next Events
            </h3>

            {upcomingEvents.length === 0 ? (
              <div className="text-center py-12 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                <Calendar size={48} className="mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400">No upcoming events scheduled.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {upcomingEvents.slice(0, 3).map((event) => {
                  const countdown = calculateCountdown(event.event_date);

                  return (
                    <div
                      key={event.id}
                      className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] rounded-2xl p-6 text-white relative overflow-hidden"
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white rounded-full transform -translate-x-10 translate-y-10"></div>
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4
                              className="text-xl font-bold mb-2"
                              style={{
                                fontFamily: "Plus Jakarta Sans, sans-serif",
                              }}
                            >
                              {event.title}
                            </h4>
                            <p
                              className="text-blue-100 text-sm mb-3"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              {event.description.substring(0, 100)}...
                            </p>
                            <div className="flex items-center text-blue-100 text-sm">
                              <MapPin size={16} className="mr-2" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">
                            {event.event_type}
                          </span>
                        </div>

                        {/* Countdown Timer */}
                        {!countdown.expired ? (
                          <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="text-center">
                              <div
                                className="text-2xl font-bold"
                                style={{
                                  fontFamily: "Plus Jakarta Sans, sans-serif",
                                }}
                              >
                                {countdown.days}
                              </div>
                              <div className="text-xs text-blue-100">Days</div>
                            </div>
                            <div className="text-center">
                              <div
                                className="text-2xl font-bold"
                                style={{
                                  fontFamily: "Plus Jakarta Sans, sans-serif",
                                }}
                              >
                                {countdown.hours}
                              </div>
                              <div className="text-xs text-blue-100">Hours</div>
                            </div>
                            <div className="text-center">
                              <div
                                className="text-2xl font-bold"
                                style={{
                                  fontFamily: "Plus Jakarta Sans, sans-serif",
                                }}
                              >
                                {countdown.minutes}
                              </div>
                              <div className="text-xs text-blue-100">
                                Minutes
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-blue-100">Event has started!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3
              className="text-2xl font-bold text-white mb-8"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Stay Updated
            </h3>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} className="text-white" />
                </div>
                <h4
                  className="text-xl font-bold text-white mb-2"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Get Event Notifications
                </h4>
                <p
                  className="text-gray-300"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Subscribe to receive email notifications about upcoming
                  events, workshops, and important announcements.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none text-white placeholder-gray-400"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={subscribing}
                  className="w-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:opacity-50"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {subscribing ? "Subscribing..." : "Subscribe for Updates"}
                </button>
              </form>

              {subscribeMessage && (
                <div
                  className={`mt-4 p-3 rounded-lg text-sm ${
                    subscribeMessage.includes("Successfully")
                      ? "bg-green-900/30 text-green-300 border border-green-700/50"
                      : "bg-red-900/30 text-red-300 border border-red-700/50"
                  }`}
                >
                  {subscribeMessage}
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-700/50">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>Weekly updates</span>
                  </div>
                  <div className="flex items-center">
                    <Bell size={16} className="mr-1" />
                    <span>Event reminders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
