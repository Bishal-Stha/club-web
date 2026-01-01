"use client";

import { Target, Eye, Zap, Users, Globe, Code } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: Code,
      title: "Technical Excellence",
      description:
        "We foster a culture of continuous learning and technical mastery among our members.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Building strong connections and collaborative relationships within the tech ecosystem.",
    },
    {
      icon: Globe,
      title: "Industry Impact",
      description:
        "Creating solutions that make a real difference in the local and global tech community.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            About{" "}
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              Godawari IT Club
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] mx-auto mb-8 rounded-full"></div>
          <p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            We're more than just a tech club – we're a vibrant community of
            innovators, creators, and problem-solvers dedicated to advancing
            technology education and fostering collaboration.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Mission */}
          <div className="bg-gray-700/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/30 hover:bg-gray-700/70 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] rounded-xl flex items-center justify-center mr-4">
                <Target size={24} className="text-white" />
              </div>
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Our Mission
              </h3>
            </div>
            <p
              className="text-lg text-gray-300 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              To empower students and tech enthusiasts with cutting-edge
              knowledge, practical skills, and networking opportunities that
              prepare them for successful careers in technology. We bridge the
              gap between academic learning and industry requirements through
              hands-on workshops, real-world projects, and mentorship programs.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gray-700/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/30 hover:bg-gray-700/70 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#10b981] to-[#06b6d4] rounded-xl flex items-center justify-center mr-4">
                <Eye size={24} className="text-white" />
              </div>
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Our Vision
              </h3>
            </div>
            <p
              className="text-lg text-gray-300 leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              To become the leading tech community that produces innovative
              leaders and problem-solvers who drive technological advancement in
              Nepal and beyond. We envision a future where our members
              contribute significantly to the global tech ecosystem through
              their expertise, creativity, and collaborative spirit.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                <feature.icon size={32} className="text-white" />
              </div>
              <h4
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {feature.title}
              </h4>
              <p
                className="text-gray-300 leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] rounded-2xl p-8 text-white shadow-xl shadow-blue-500/25">
            <Zap size={48} className="mx-auto mb-4 text-cyan-300" />
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Ready to Join Our Community?
            </h3>
            <p
              className="text-lg mb-6 text-blue-100"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Be part of something bigger. Connect, learn, and grow with
              like-minded tech enthusiasts.
            </p>
            <button
              className="bg-white text-[#3b82f6] px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
