import { Link } from "react-router-dom";

function HomePage() {
  const features = [
    "Log your daily activities",
    "Track sleep and water intake",
    "View your average score",
    "Build Healthy Habits",
  ];

  return (
    <section className="home-page">
      <div className="home-content">
        <p className="home-label">WELCOME TO PULSE</p>
        <h1>Track your activities, one day at a time</h1>
        <p className="home-description">
          Pulse is a simple wellness tracker that helps you track activities and
          understand your daily habits
        </p>
        <div className="home-links">
          <Link className="home-primary-link" to="/dashboard">
            Open Dashboard
          </Link>
          <Link className="home-second-link" to="/about">
            Learn More
          </Link>
        </div>
      </div>

      <div className="pulse-animation">
        <div className="pulse-circle">♥ </div>
      </div>
      <article className="home-list-card">
        <h2> What can you do with Pulse</h2>
        <ul>
          {features.map((feature) => (
            <li key={feature}> {feature} </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export default HomePage;
