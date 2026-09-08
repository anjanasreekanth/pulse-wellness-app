import { useState } from "react";
import Button from "./Button";

function ContactForm() {
  //setting form values
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  //setting isSubmitted variable initially to false
  const [isSubmitted, setIsSubmitted] = useState(false);

  //defining the data for the form fields
  const handleChange = (event) => {
    setIsSubmitted(false); //to hide the previous succes message
    const { name, value } = event.target;
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }));
  };
  //handling submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setFormValues({ name: "", email: "", message: "" });
  };
  return (
    <article className="about-card contact-card">
      <h2>Contact us</h2>
      <p>Have question or suggestion? Send us a message.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          required
          minLength={2}
        />

        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows="4"
          value={formValues.message}
          onChange={handleChange}
          required
          minLength={10}
          maxlengh={500}
        />

        <Button className="contact-submit" type="submit">
          Send Message
        </Button>
        {isSubmitted && (
          <p className="contact-success">
            Thank you! Your message has been received.
          </p>
        )}
      </form>
    </article>
  );
}

export default ContactForm;
