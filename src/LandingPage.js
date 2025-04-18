import React from "react";
import './styles/LandingPage.css';
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <h1 className="header-title">Welcome to the Academic Counseling System</h1>
      </header>

      <section className="hero-section">
        <h2 className="hero-title">Get the Support You Need, Anytime</h2>
        <p className="hero-description">
          Empowering students with guidance, counseling, and academic support—all in one place.
        </p>
        <Link to="/student-login">
          <button className="hero-button">Get Started</button>
        </Link>
      </section>

      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-cards">
          <div className="feature-card">
            <h3>Expert Counselors</h3>
            <p>Access a team of professional counselors and mentors for academic and mental health support.</p>
          </div>
          <div className="feature-card">
            <h3>Secure and Reliable</h3>
            <p>Your privacy is our priority. All sessions and records are handled securely.</p>
          </div>
          <div className="feature-card">
            <h3>All-in-One Solution</h3>
            <p>From stress management workshops to career advice, we cover it all.</p>
          </div>
        </div>
      </section>

      <section className="events">
        <h2>Upcoming Events</h2>
        <div className="event-cards">
          <div className="event-card">
            <h3 className="event-title">Stress Management Workshop</h3>
            <p className="event-description">Learn how to manage your stress effectively in this interactive workshop.</p>
          </div>
          <div className="event-card">
            <h3 className="event-title">Career Guidance Session</h3>
            <p className="event-description">Join us to discover career opportunities and tips for your future success.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Academic Counseling System</p>
          <Link to="/about">About Us</Link> | <Link to="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
