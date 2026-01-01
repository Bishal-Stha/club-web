"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  LogOut,
  Users,
  Calendar,
  Bell,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Save,
  X,
  Mail,
  MapPin,
  Link,
  Clock,
  Upload,
} from "lucide-react";
import useUpload from "@/utils/useUpload";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Data states
  const [events, setEvents] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  // Modal states
  const [showEventModal, setShowEventModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form states
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    event_type: "Workshop",
    event_date: "",
    location: "",
    image_url: "",
    registration_link: "",
    max_participants: "",
  });
  const [memberForm, setMemberForm] = useState({
    full_name: "",
    education_background: "",
    current_profession: "",
    profile_image_url: "",
    position: "",
    bio: "",
    linkedin_url: "",
    github_url: "",
    email: "",
  });
  const [notificationForm, setNotificationForm] = useState({
    title: "",
    message: "",
    notification_type: "general",
    expires_at: "",
  });

  const [upload, { loading: uploading }] = useUpload();

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");

    if (!token || !user) {
      window.location.href = "/admin/login";
      return;
    }

    setAdminUser(JSON.parse(user));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, membersRes, notificationsRes, subscribersRes] =
        await Promise.all([
          fetch("/api/events"),
          fetch("/api/team-members"),
          fetch("/api/notifications"),
          fetch("/api/admin/subscribers"),
        ]);

      setEvents(await eventsRes.json());
      setTeamMembers(await membersRes.json());
      setNotifications(await notificationsRes.json());

      if (subscribersRes.ok) {
        setSubscribers(await subscribersRes.json());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    window.location.href = "/admin/login";
  };

  const handleImageUpload = async (file, formType) => {
    try {
      const { url, error } = await upload({ file });
      if (error) {
        alert("Upload failed: " + error);
        return;
      }

      if (formType === "event") {
        setEventForm((prev) => ({ ...prev, image_url: url }));
      } else if (formType === "member") {
        setMemberForm((prev) => ({ ...prev, profile_image_url: url }));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    }
  };

  // Event CRUD operations
  const saveEvent = async () => {
    try {
      const url = editingItem
        ? `/api/admin/events/${editingItem.id}`
        : "/api/admin/events";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventForm),
      });

      if (response.ok) {
        fetchData();
        setShowEventModal(false);
        setEditingItem(null);
        setEventForm({
          title: "",
          description: "",
          event_type: "Workshop",
          event_date: "",
          location: "",
          image_url: "",
          registration_link: "",
          max_participants: "",
        });
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const deleteEvent = async (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
        fetchData();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  // Team Member CRUD operations
  const saveMember = async () => {
    try {
      const url = editingItem
        ? `/api/admin/team-members/${editingItem.id}`
        : "/api/admin/team-members";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberForm),
      });

      if (response.ok) {
        fetchData();
        setShowMemberModal(false);
        setEditingItem(null);
        setMemberForm({
          full_name: "",
          education_background: "",
          current_profession: "",
          profile_image_url: "",
          position: "",
          bio: "",
          linkedin_url: "",
          github_url: "",
          email: "",
        });
      }
    } catch (error) {
      console.error("Error saving member:", error);
    }
  };

  const deleteMember = async (id) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      try {
        await fetch(`/api/admin/team-members/${id}`, { method: "DELETE" });
        fetchData();
      } catch (error) {
        console.error("Error deleting member:", error);
      }
    }
  };

  // Notification CRUD operations
  const saveNotification = async () => {
    try {
      const url = editingItem
        ? `/api/admin/notifications/${editingItem.id}`
        : "/api/admin/notifications";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notificationForm),
      });

      if (response.ok) {
        fetchData();
        setShowNotificationModal(false);
        setEditingItem(null);
        setNotificationForm({
          title: "",
          message: "",
          notification_type: "general",
          expires_at: "",
        });
      }
    } catch (error) {
      console.error("Error saving notification:", error);
    }
  };

  const deleteNotification = async (id) => {
    if (confirm("Are you sure you want to delete this notification?")) {
      try {
        await fetch(`/api/admin/notifications/${id}`, { method: "DELETE" });
        fetchData();
      } catch (error) {
        console.error("Error deleting notification:", error);
      }
    }
  };

  const editEvent = (event) => {
    setEditingItem(event);
    setEventForm({
      title: event.title || "",
      description: event.description || "",
      event_type: event.event_type || "Workshop",
      event_date: event.event_date
        ? new Date(event.event_date).toISOString().slice(0, 16)
        : "",
      location: event.location || "",
      image_url: event.image_url || "",
      registration_link: event.registration_link || "",
      max_participants: event.max_participants || "",
    });
    setShowEventModal(true);
  };

  const editMember = (member) => {
    setEditingItem(member);
    setMemberForm({
      full_name: member.full_name || "",
      education_background: member.education_background || "",
      current_profession: member.current_profession || "",
      profile_image_url: member.profile_image_url || "",
      position: member.position || "",
      bio: member.bio || "",
      linkedin_url: member.linkedin_url || "",
      github_url: member.github_url || "",
      email: member.email || "",
    });
    setShowMemberModal(true);
  };

  const editNotification = (notification) => {
    setEditingItem(notification);
    setNotificationForm({
      title: notification.title || "",
      message: notification.message || "",
      notification_type: notification.notification_type || "general",
      expires_at: notification.expires_at
        ? new Date(notification.expires_at).toISOString().slice(0, 16)
        : "",
    });
    setShowNotificationModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <img
                  src="https://framerusercontent.com/images/2B3KfeckV3Rkhp9TIciMUm702o.png"
                  className="w-10 h-10"
                />{" "}
              </div>
              <h1
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className="text-2x1 font bold text-gray-700"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Welcome, {adminUser?.full_name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200"
              >
                <LogOut size={20} className="mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-200 p-1 rounded-xl">
          {[
            { id: "overview", label: "Overview", icon: Shield },
            { id: "events", label: "Events", icon: Calendar },
            { id: "team", label: "Team Members", icon: Users },
            { id: "notifications", label: "Notifications", icon: Bell },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <Icon size={18} className="mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Total Events
                  </p>
                  <p
                    className="text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {events.length}
                  </p>
                </div>
                <Calendar className="text-blue-600" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Team Members
                  </p>
                  <p
                    className="text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {teamMembers.length}
                  </p>
                </div>
                <Users className="text-green-600" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Active Notifications
                  </p>
                  <p
                    className="text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {notifications.filter((n) => n.is_active).length}
                  </p>
                </div>
                <Bell className="text-yellow-600" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Email Subscribers
                  </p>
                  <p
                    className="text-3xl font-bold text-gray-900"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {subscribers.length}
                  </p>
                </div>
                <Mail className="text-purple-600" size={32} />
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Events Management
              </h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setEventForm({
                    title: "",
                    description: "",
                    event_type: "Workshop",
                    event_date: "",
                    location: "",
                    image_url: "",
                    registration_link: "",
                    max_participants: "",
                  });
                  setShowEventModal(true);
                }}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <Plus size={20} className="mr-2" />
                Add Event
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {events.map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {event.image_url && (
                              <img
                                className="h-10 w-10 rounded-lg object-cover mr-3"
                                src={event.image_url}
                                alt=""
                              />
                            )}
                            <div>
                              <div
                                className="text-sm font-medium text-gray-900"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                {event.title}
                              </div>
                              <div
                                className="text-sm text-gray-500"
                                style={{ fontFamily: "Inter, sans-serif" }}
                              >
                                {event.description?.substring(0, 50)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {event.event_type}
                          </span>
                        </td>
                        <td
                          className="px-6 py-4 text-sm text-gray-900"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {new Date(event.event_date).toLocaleDateString()}
                        </td>
                        <td
                          className="px-6 py-4 text-sm text-gray-900"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {event.location}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => editEvent(event)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => deleteEvent(event.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Team Members Tab */}
        {activeTab === "team" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Team Members
              </h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setMemberForm({
                    full_name: "",
                    education_background: "",
                    current_profession: "",
                    profile_image_url: "",
                    position: "",
                    bio: "",
                    linkedin_url: "",
                    github_url: "",
                    email: "",
                  });
                  setShowMemberModal(true);
                }}
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors duration-200"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <Plus size={20} className="mr-2" />
                Add Member
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center mb-4">
                    {member.profile_image_url && (
                      <img
                        className="h-12 w-12 rounded-full object-cover mr-4"
                        src={member.profile_image_url}
                        alt={member.full_name}
                      />
                    )}
                    <div>
                      <h3
                        className="text-lg font-semibold text-gray-900"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        {member.full_name}
                      </h3>
                      <p
                        className="text-sm text-gray-600"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {member.position}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-sm text-gray-700 mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {member.current_profession}
                  </p>
                  <p
                    className="text-xs text-gray-500 mb-4"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {member.education_background}
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => editMember(member)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteMember(member.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Notifications
              </h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setNotificationForm({
                    title: "",
                    message: "",
                    notification_type: "general",
                    expires_at: "",
                  });
                  setShowNotificationModal(true);
                }}
                className="flex items-center bg-yellow-600 text-white px-4 py-2 rounded-xl hover:bg-yellow-700 transition-colors duration-200"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <Plus size={20} className="mr-2" />
                Add Notification
              </button>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3
                          className="text-lg font-semibold text-gray-900 mr-3"
                          style={{
                            fontFamily: "Plus Jakarta Sans, sans-serif",
                          }}
                        >
                          {notification.title}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            notification.notification_type === "urgent"
                              ? "bg-red-100 text-red-800"
                              : notification.notification_type === "event"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {notification.notification_type}
                        </span>
                      </div>
                      <p
                        className="text-gray-700 mb-2"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {notification.message}
                      </p>
                      <p
                        className="text-xs text-gray-500"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Created:{" "}
                        {new Date(notification.created_at).toLocaleDateString()}
                        {notification.expires_at &&
                          ` • Expires: ${new Date(
                            notification.expires_at
                          ).toLocaleDateString()}`}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => editNotification(notification)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3
                  className="text-xl font-bold text-gray-900"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  {editingItem ? "Edit Event" : "Add New Event"}
                </h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Description
                  </label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Event Type
                    </label>
                    <select
                      value={eventForm.event_type}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          event_type: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <option value="Workshop">Workshop</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Conference">Conference</option>
                      <option value="Meetup">Meetup</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Event Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={eventForm.event_date}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          event_date: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Event Image
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="url"
                      value={eventForm.image_url}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          image_url: e.target.value,
                        })
                      }
                      placeholder="Image URL or upload below"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                    <label className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200">
                      <Upload size={16} className="mr-2" />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e.target.files[0], "event")
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                  {eventForm.image_url && (
                    <img
                      src={eventForm.image_url}
                      alt="Preview"
                      className="mt-2 h-20 w-20 object-cover rounded-lg"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Registration Link
                    </label>
                    <input
                      type="url"
                      value={eventForm.registration_link}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          registration_link: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Max Participants
                    </label>
                    <input
                      type="number"
                      value={eventForm.max_participants}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          max_participants: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveEvent}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <Save size={16} className="mr-2" />
                    Save Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Member Modal */}
      {showMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3
                  className="text-xl font-bold text-gray-900"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  {editingItem ? "Edit Team Member" : "Add New Team Member"}
                </h3>
                <button
                  onClick={() => setShowMemberModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={memberForm.full_name}
                    onChange={(e) =>
                      setMemberForm({
                        ...memberForm,
                        full_name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Position
                  </label>
                  <input
                    type="text"
                    value={memberForm.position}
                    onChange={(e) =>
                      setMemberForm({ ...memberForm, position: e.target.value })
                    }
                    placeholder="e.g., President, Vice President, Technical Lead"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Education Background
                  </label>
                  <textarea
                    value={memberForm.education_background}
                    onChange={(e) =>
                      setMemberForm({
                        ...memberForm,
                        education_background: e.target.value,
                      })
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Current Profession
                  </label>
                  <input
                    type="text"
                    value={memberForm.current_profession}
                    onChange={(e) =>
                      setMemberForm({
                        ...memberForm,
                        current_profession: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Profile Image
                  </label>
                  <div className="flex space-x-4">
                    <input
                      type="url"
                      value={memberForm.profile_image_url}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
                          profile_image_url: e.target.value,
                        })
                      }
                      placeholder="Image URL or upload below"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                    <label className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200">
                      <Upload size={16} className="mr-2" />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e.target.files[0], "member")
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                  {memberForm.profile_image_url && (
                    <img
                      src={memberForm.profile_image_url}
                      alt="Preview"
                      className="mt-2 h-20 w-20 object-cover rounded-full"
                    />
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Bio
                  </label>
                  <textarea
                    value={memberForm.bio}
                    onChange={(e) =>
                      setMemberForm({ ...memberForm, bio: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={memberForm.email}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={memberForm.linkedin_url}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
                          linkedin_url: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={memberForm.github_url}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
                          github_url: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowMemberModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveMember}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <Save size={16} className="mr-2" />
                    Save Member
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3
                  className="text-xl font-bold text-gray-900"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  {editingItem ? "Edit Notification" : "Add New Notification"}
                </h3>
                <button
                  onClick={() => setShowNotificationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Notification Title
                  </label>
                  <input
                    type="text"
                    value={notificationForm.title}
                    onChange={(e) =>
                      setNotificationForm({
                        ...notificationForm,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Message
                  </label>
                  <textarea
                    value={notificationForm.message}
                    onChange={(e) =>
                      setNotificationForm({
                        ...notificationForm,
                        message: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Notification Type
                    </label>
                    <select
                      value={notificationForm.notification_type}
                      onChange={(e) =>
                        setNotificationForm({
                          ...notificationForm,
                          notification_type: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <option value="general">General</option>
                      <option value="event">Event</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Expires At (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={notificationForm.expires_at}
                      onChange={(e) =>
                        setNotificationForm({
                          ...notificationForm,
                          expires_at: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowNotificationModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveNotification}
                    className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <Save size={16} className="mr-2" />
                    Save Notification
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}