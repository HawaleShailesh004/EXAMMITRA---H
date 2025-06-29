import React, { useEffect } from "react";
import "../CSS/Home.css";
import { useNavigate } from "react-router-dom";

import Footer from "./Footer.js";
import Header from "./Header.js";
import { useUser } from "../context/userContext";

// Feature list data for homepage display
const features = [
  {
    feature: "Upload Your Own Question Papers",
    description:
      "Easily upload and manage your own question papers. No need to search—bring your content directly into the platform for a personalized experience.",
    image: "/images/papers.png",
  },
  {
    feature: "Frequently Asked Topics",
    description:
      "Quickly spot the most important topics and questions, based on real exam patterns.",
    image: "/images/topics.png",
  },
  {
    feature: "AI-Powered Answers",
    description:
      "Need short summaries, detailed explanations, or simple English versions? Get customized answers instantly!",
    image: "/images/ai.png",
  },
  {
    feature: "Progress Tracking",
    description:
      "Stay on top of your study journey — mark questions as Done, Needs Revision, or Untouched.",
    image: "/images/tracking.png",
  },
  {
    feature: "Export Revision PDFs",
    description:
      "Save your selected questions and AI answers into a clean PDF for easy offline revision.",
    image: "/images/export.png",
  },
];

// How it works steps data for homepage section
const howItWorksSteps = [
  {
    icon: "📘",
    description: "Easily upload and organize your own question papers.",
    tagline: "Upload your Question Papers.",
  },
  {
    icon: "🎯",
    description: "View Frequently Asked Questions & Topics.",
    tagline: "Focus on what matters most.",
  },
  {
    icon: "🤖",
    description: "Generate AI-Answers Based on Your Style.",
    tagline: "Detailed, short, easy words — your choice.",
  },
  {
    icon: "📄",
    description: "Track Your Progress & Export PDFs.",
    tagline: "Stay organized and revise smarter.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // Log user info when user state changes (for debugging)
  useEffect(() => {
    if (user) {
      console.log("🟢 Logged in user:", user);
    }
  }, [user]);

  return (
    <div className="homepage">
      {/* Header navigation */}
      <Header />

      {/* Hero Section: Main landing call-to-action */}
      <section
        className="hero"
        style={{ backgroundImage: "url('/images/hero-backgrounf.jpg')" }}
      >
        <div className="hero-text slide-in">
          <h1>Smarter Exam Preparation Starts Here</h1>
          <p>
            Upload and manage your own question papers, get AI-powered answers,
            and track your progress — all in one place.
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              id="getStarted"
              onClick={() => navigate("/choice")}
            >
              Get Started Free
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hero-image.jpg" alt="Dashboard Illustration" />
        </div>
      </section>

      {/* Features Section: Display app features */}
      <section className="features">
        <h2>Everything You Need for Exam Success</h2>
        <div className="feature-grid">
          {features.map((fet, index) => (
            <div
              className={`feature-card ${
                index % 2 === 0 ? "row-normal" : "row-reverse"
              }`}
              key={index}
            >
              <div className="feature-image">
                <img src={fet.image} alt={fet.feature} />
              </div>
              <div className="feature-text">
                <h3>{fet.feature}</h3>
                <p>{fet.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section: Step-by-step explanation */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          {howItWorksSteps.map((st, ind) => (
            <div
              className="step"
              key={ind}
              style={{ backgroundImage: "url('/images/hero-backgrounf.jpg')" }}
            >
              <span className="count">{ind + 1}</span>
              <span className="step-icon">{st.icon}</span>
              <p id="tag-text">{st.tagline}</p>
              <p id="desc-text">{st.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action section */}
      <div className="callToActionContainer">
        <h3>Ready to Take Control of Your Exam Success?</h3>
        <p>
          Upload and manage your own question papers, get AI-powered answers, and
          track your progress — all in one place.
        </p>
        <button
          id="getStarted"
          onClick={() => {
            navigate("/choice");
          }}
        >
          Start Preparing Now
        </button>
      </div>

      {/* Footer at page bottom */}
      <Footer />
    </div>
  );
};

export default Home;
