import React from "react";
import FeatureCard from "../../../components/FeatureCard/FeatureCard";
import "./Home.css"; // Importing the home.css file
import help from "../../../assets/about.jpg"; // Corrected path
import { Link } from "react-router-dom"; 

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to NagarSuraksha</h1>
        <p>Your platform for community safety and civic engagement</p>
        <Link to="/report-issue">
          <button className="report-issue-btn">Report an Issue</button>
        </Link>
      </section>

      {/*Feature section*/}
      <section className="features-section">
        <div className="container mx-auto text-center">
          <div className="he">
            <h2>Our Feature</h2>
          </div>
          <div className="feature-cards">
            <FeatureCard
              title="Report Issues"
              description="Easily report civic issues in your locality."
            />
            <FeatureCard
              title="Track Resolutions"
              description="Track the status of your reported issues."
            />
            <FeatureCard
              title="Community Engagement"
              description="Stay updated with community initiatives."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2>About NagarSuraksha</h2>
          <div className="content">
            <img src={help} alt="About NagarSuraksha" />
            <div className="description">
              <p>
                NagarSuraksha is a civic engagement platform that enables citizens
                to report safety concerns, track the resolution of issues, and
                actively engage with their community. It empowers users to connect
                with local authorities, promote transparency, and contribute to
                building safer neighborhoods.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
