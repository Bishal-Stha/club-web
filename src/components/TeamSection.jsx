"use client";

import { useState, useEffect } from "react";
import { Linkedin, Github, Mail } from "lucide-react";

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch("/api/team-members");
      if (!response.ok) {
        throw new Error(`Failed to fetch team members: ${response.status}`);
      }
      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.error("Error fetching team members:", error);
      setError("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="team" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3b82f6] mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading team members...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="team" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Meet Our{" "}
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              Amazing Team
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mx-auto mb-8 rounded-full"></div>
          <p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            The brilliant minds behind Godawari IT Club. Our diverse team of
            tech enthusiasts, leaders, and innovators who make everything
            possible.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/70 hover:border-gray-600/50 transition-all duration-300 group hover:-translate-y-2"
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] p-1">
                  <img
                    src={
                      member.profile_image_url ||
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
                    }
                    alt={member.full_name}
                    className="w-full h-full object-cover rounded-full bg-gray-800"
                  />
                </div>
                {/* Position Badge */}
                {member.position && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                    <span className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white text-xs px-3 py-1 rounded-full font-medium">
                      {member.position}
                    </span>
                  </div>
                )}
              </div>

              {/* Member Info */}
              <div className="text-center pt-4">
                <h3
                  className="text-xl font-bold text-white mb-2"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  {member.full_name}
                </h3>

                <p
                  className="text-[#06b6d4] font-medium text-sm mb-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {member.current_profession}
                </p>

                <p
                  className="text-gray-400 text-sm mb-4 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {member.education_background}
                </p>

                {/* Bio */}
                {member.bio && (
                  <p
                    className="text-gray-500 text-sm mb-6 leading-relaxed"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {member.bio}
                  </p>
                )}

                {/* Social Links */}
                <div className="flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                  {member.github_url && (
                    <a
                      href={member.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
                    >
                      <Mail size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="text-center mt-16">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h3
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Want to Join Our Team?
            </h3>
            <p
              className="text-lg text-gray-300 mb-6"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              We're always looking for passionate individuals to join our
              growing community.
            </p>
            <button
              className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
