"use client";

import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Code2,
} from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/godawariitclub",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/godawariitclub",
      label: "Instagram",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/godawariitclub",
      label: "Twitter",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/godawariitclub",
      label: "LinkedIn",
    },
    {
      icon: Github,
      href: "https://github.com/godawariitclub",
      label: "GitHub",
    },
  ];

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#team" },
    { name: "Events", href: "#events" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] rounded-full flex items-center justify-center">
                <img
                  src="https://framerusercontent.com/images/2B3KfeckV3Rkhp9TIciMUm702o.png"
                  className="w-15 h-15"
                />
              </div>
              <span
                className="text-xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent tracking-tight"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Godawari IT Club
              </span>
            </div>
            <p
              className="text-gray-400 mb-6 max-w-md leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Empowering the next generation of tech innovators through
              education, collaboration, and hands-on experience. Join us in
              building the future of technology.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#06b6d4] rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-semibold text-white mb-4"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#06b6d4] transition-colors duration-200"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className="font-semibold text-white mb-4"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Mail size={16} className="mr-3 text-[#06b6d4]" />
                <a
                  href="mailto:info@godawariitclub.com"
                  className="hover:text-[#06b6d4] transition-colors duration-200"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  info@godawariitclub.com
                </a>
              </div>
              <div
                className="text-gray-400 text-sm leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Godawari College
                <br />
                Itahari-9, Sunsari, Nepal
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p
              className="text-gray-400 text-sm mb-4 md:mb-0"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              © 2025 Godawari IT Club. All rights reserved.
            </p>
            <p
              className="text-gray-500 font-semi-bold text-base mt-1"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Made with ❤️ by Mausam Bhattarai
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-[#06b6d4] transition-colors duration-200"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#06b6d4] transition-colors duration-200"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#06b6d4] transition-colors duration-200"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Code of Conduct
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}