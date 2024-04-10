// LandingPage.js

import React from 'react';
import '../styles/LandingPage.css'; // Corrected file path for CSS
import {useNavigate} from "react-router-dom"
const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="landing-page">
      <header>
  <div className="container">
    <div className="header-content">
      <div className="logo">
        <h1>MediSync</h1>
        {/* <p>An Appointment Management System</p> */}
      </div>
      <nav>
  <ul>
    <li><button className="sign-in" onClick={()=>navigate("/login")}>Login</button></li>
    <li><button className="sign-up" onClick={()=>navigate("/register")}>Sign Up</button></li>
  </ul>
</nav>

    </div>
  </div>
</header>

      <section id="about" className="about">
  <div className="container">
    <div className="about-content">
      <h2>About MediSync</h2>
      <p>MediSync is a comprehensive appointment management system designed to streamline scheduling for healthcare professionals. It provides an intuitive and efficient way to manage appointments, accessible for both doctors and receptionists.</p>
    </div>
  </div>
</section>

      <section id="features" className="features">
        <div className="container">
          <h2>Features</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <h3>Effortless Scheduling</h3>
              <p>Streamline your appointment scheduling process with an intuitive calendar interface.</p>
            </div>
            <div className="feature-card">
              <h3>Multi-User Access</h3>
              <p>Accessible for both doctors and receptionists, allowing seamless collaboration.</p>
            </div>
            <div className="feature-card">
              <h3>Automated Reminders</h3>
              <p>Reduce no-shows with automated appointment reminders sent to patients.</p>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <p>&copy; 2024 MediSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
