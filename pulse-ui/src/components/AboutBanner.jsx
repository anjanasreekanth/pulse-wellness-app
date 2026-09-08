import { Link } from "react-router-dom";
//banner created for about page
function AboutBanner() {
  return (
    <section className="about-banner">
      <div className="banner-visual">
        <span>♥</span>
        <span className="pulse-line">⚡</span>
      </div>
      <div className="banner-copy">
        <h2>Your wellness journey starts today</h2>
        <p>
          Track what matters, notice your progress, and keep moving forward.
        </p>
      </div>
      <Link className="banner-link" to="/dashboard">
        Go to Dashboard
      </Link>
    </section>
  );
}

export default AboutBanner;
