"use client";

import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Get In{" "}
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mx-auto mb-8 rounded-full"></div>
          <p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Have questions about our events, want to collaborate, or interested
            in joining our community? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3
              className="text-2xl font-bold text-white mb-8"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Let's Connect
            </h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <h4
                    className="font-semibold text-white mb-1"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    Email Us
                  </h4>
                  <p
                    className="text-gray-300"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    info@godawariitclub.com
                  </p>
                  <p
                    className="text-gray-300"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    events@godawariitclub.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <h4
                    className="font-semibold text-white mb-1"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    Call Us
                  </h4>
                  <p
                    className="text-gray-300"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    +977-1-XXXXXXX
                  </p>
                  <p
                    className="text-gray-400 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Mon - Fri, 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <h4
                    className="font-semibold text-white mb-1"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    Visit Us
                  </h4>
                  <p
                    className="text-gray-300"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Godawari College
                    <br />
                    Itahari-9, Nepal
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact Actions */}
            <div className="bg-gray-700/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/50">
              <h4
                className="font-semibold text-white mb-4"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Quick Actions
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:info@godawariitclub.com"
                  className="flex items-center p-3 rounded-xl bg-gray-600/30 hover:bg-gray-600/50 transition-colors duration-200"
                >
                  <Mail size={18} className="text-[#06b6d4] mr-3" />
                  <span
                    className="text-gray-300 font-medium"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Send us an email
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center p-3 rounded-xl bg-gray-600/30 hover:bg-gray-600/50 transition-colors duration-200"
                >
                  <MessageCircle size={18} className="text-[#06b6d4] mr-3" />
                  <span
                    className="text-gray-300 font-medium"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Join our Discord
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-700/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/50">
            <h3
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Send us a Message
            </h3>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-300 mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-600/30 border border-gray-500/30 rounded-xl focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none transition-all duration-200 text-white placeholder-gray-400"
                    placeholder="Enter your first name"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-300 mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-600/30 border border-gray-500/30 rounded-xl focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none transition-all duration-200 text-white placeholder-gray-400"
                    placeholder="Enter your last name"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-600/30 border border-gray-500/30 rounded-xl focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none transition-all duration-200 text-white placeholder-gray-400"
                  placeholder="Enter your email address"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Subject
                </label>
                <select
                  className="w-full px-4 py-3 bg-gray-600/30 border border-gray-500/30 rounded-xl focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none transition-all duration-200 text-white"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="events">Event Related</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="membership">Membership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-600/30 border border-gray-500/30 rounded-xl focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent outline-none transition-all duration-200 resize-none text-white placeholder-gray-400"
                  placeholder="Tell us more about your inquiry..."
                  style={{ fontFamily: "Inter, sans-serif" }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] transition-all duration-200 flex items-center justify-center"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <Send size={20} className="mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}