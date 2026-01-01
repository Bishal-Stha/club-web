import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import TeamSection from "../components/TeamSection";
import EventsSection from "../components/EventsSection";
import UpcomingEvents from "../components/UpcomingEvents";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header Navigation */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <AboutSection />

      {/* Team Section */}
      <TeamSection />

      {/* Events Section */}
      <EventsSection />

      {/* Upcoming Events */}
      <UpcomingEvents />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
