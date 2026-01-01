"use client";

import { useState } from "react";
import { Menu, X, Code2, User, LogOut } from "lucide-react";
import useUser from "@/utils/useUser";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user, loading } = useUser();

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Team", href: "#team" },
    { label: "Events", href: "#events" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <img
                src="/src/assets/logo.png"
                className="w-15 h-15"
              />
            </div>
            <span
              className="text-xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent tracking-tight"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Godawari IT Club
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-white font-semi-bold text-sm transition-colors duration-200 hover:scale-105 transform"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {item.label}
              </a>
            ))}

            {/* User Authentication */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <User size={16} className="text-gray-400 mr-2" />
                  <span
                    className="text-gray-300 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {user.email}
                  </span>
                </div>
                <a
                  href="/account/logout"
                  className="flex items-center text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  <LogOut size={14} className="mr-1" />
                  <span
                    className="text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Logout
                  </span>
                </a>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <a
                  href="/account/signin"
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Sign In
                </a>
                <a
                  href="/account/signup"
                  className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white px-6 py-2 rounded-full font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-200"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Join Us
                </a>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X size={24} className="text-gray-300" />
            ) : (
              <Menu size={24} className="text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700 bg-gray-800/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-white font-medium text-sm py-2 transition-colors duration-200"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Authentication */}
              <div className="border-t border-gray-700 pt-3 mt-4">
                {user ? (
                  <div>
                    <div className="flex items-center mb-3">
                      <User size={16} className="text-gray-400 mr-2" />
                      <span
                        className="text-gray-300 text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {user.email}
                      </span>
                    </div>
                    <a
                      href="/account/logout"
                      className="flex items-center text-red-400 hover:text-red-300 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogOut size={14} className="mr-2" />
                      <span
                        className="text-sm"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Logout
                      </span>
                    </a>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <a
                      href="/account/signin"
                      className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm py-2"
                      style={{ fontFamily: "Inter, sans-serif" }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </a>
                    <a
                      href="/account/signup"
                      className="block bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white px-6 py-3 rounded-full font-medium text-sm w-full text-center hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                      style={{ fontFamily: "Inter, sans-serif" }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Join Us
                    </a>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}