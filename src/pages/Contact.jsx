import React, { useState } from 'react';
import "./Front.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ContactUs = () => {
  
    const email = "sanvidiv22@gmail.com";

    const handleEmailClick = () => {
      toast.info("Redirecting to email...");
    };
  return (
    <div className="contact">
  <div className="block-contact">
    <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: 'black' }}>Contact Us 📩</h1>
    <div className="contact-info">
      <p style={{ fontSize: '1rem', margin: '10px 0', color: 'black' }}>
        If you have any questions, suggestions, or feedback, feel free to reach out to us!
      </p>
      <p style={{ fontSize: '1rem', margin: '10px 0', color: 'black' }}>
        <strong>Phone:</strong> +91 9799033486
      </p>
      <p style={{ fontSize: '1rem', margin: '10px 0', color: 'black' }}>
        <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
      </p>
    </div>
    <div className="contact-action">
      <a href={`mailto:${email}`} className="login-button" onClick={handleEmailClick}>Send Email</a>
    </div>
    <div className="additional-info">
      <h2 style={{ fontSize: '1.5rem', margin: '10px 0', color: 'black' }}>Stay Connected!</h2>
      <p style={{ fontSize: '1rem', margin: '10px 0', color: 'black' }}>
        We value your feedback and strive to improve your experience.
      </p>
    </div>
  </div>
  <ToastContainer />
</div>

  );
};

export default ContactUs;
