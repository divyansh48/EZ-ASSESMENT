import React, { useState } from "react";
import axios from "axios";
import './style.css'; // Import your CSS file here

export default function App() {
  // State to hold form data
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // State to handle errors and success message
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Email validation regex
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle input changes by updating form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Front-end validation:
    if (!form.name || !form.email || !form.phone || !form.message) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // If valid, post to API
    try {
      const response = await axios.post(
        "https://vernanbackend.ezlab.in/api/contact-us/",
        form
      );
      if (response.status === 200) {
        setSuccess("Form Submitted");
        setForm({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (err) {
      setError("Submission failed. Please try again.");
    }
  };

  return (
    <main className="container">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          aria-label="Name"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          aria-label="Email"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          aria-label="Phone"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          aria-label="Message"
        />
        <button type="submit">Submit</button>
        {error && <p className="error" role="alert">{error}</p>}
        {success && <p className="success" role="alert">{success}</p>}
      </form>
    </main>
  );
}
