"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Users, Calendar, Code } from "lucide-react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=600&fit=crop&auto=format&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const stats = [
    { icon: Users, value: "500+", label: "Active Members" },
    { icon: Calendar, value: "50+", label: "Events Organized" },
    { icon: Code, value: "100+", label: "Projects Completed" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Tech collaboration ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e40af]/80 via-[#1e40af]/60 to-[#22d3ee]/40" />
          </div>
        ))}
      </div>

      {/* Animated Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-[#22d3ee]/30 rounded-lg rotate-45 animate-pulse" />
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-[#22d3ee]/20 rounded-full animate-bounce" />
        <div className="absolute top-1/3 right-20 w-8 h-8 bg-[#10b981]/30 rotate-45 animate-ping" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            <span className="block">
              <br></br>
              <br></br>
              Building the Future
            </span>
            <span className="block bg-gradient-to-r from-[#22d3ee] to-[#10b981] bg-clip-text text-transparent">
              Through Technology
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Join Godawari IT Club - where innovation meets collaboration. We're
            a dynamic community of tech enthusiasts, developers, and innovators
            shaping tomorrow's digital landscape.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              className="bg-gradient-to-r from-[#1e40af] to-[#22d3ee] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Join Our Community
            </button>
            <button
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#1e40af] transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Explore Events
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon size={32} className="text-[#22d3ee]" />
                </div>
                <div
                  className="text-4xl lg:text-6xl font-bold text-white mb-2"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-2xl text-gray-300"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white/80" />
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-[#22d3ee]" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}