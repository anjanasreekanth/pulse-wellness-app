import AboutBanner from "../components/AboutBanner";
import AboutOverview from "../components/AboutOverview";
import ContactForm from "../components/ContactForm";

function AboutPage() {
  return (
    <section className="about-page">
      <div className="about-heading">
        <p className="about-label">ABOUT PULSE</p>
        <h1>Small steps. Healthier habits</h1>
        <p className="mini-header">
          Pulse makes it simple to understand your daily wellness activities and
          celebrate your progress.
        </p>
      </div>
      <div className="about-content-grid">
        <AboutOverview />
        <ContactForm />
      </div>
      <AboutBanner />
    </section>
  );
}

export default AboutPage;
