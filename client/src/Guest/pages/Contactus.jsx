import React, { useState } from 'react';

export default function Contactus() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    // Show the feedback message
    setIsSubmitted(true);
  };

  return (
    <div className="contact-container">
      <style>
        {`
          /* Center the contact page */
          .contact-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }

          /* Updated styles for the contact form */
          .form {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 20px;
            max-width: 400px;
            background-color: #ffead0;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            text-align: center;
          }

          .form .title {
            color: royalblue;
            font-size: 36px;
            font-weight: 600;
          }

          .form input,
          .form textarea {
            border: 2px solid #000;
            border-radius: 8px;
            padding: 12px 16px;
          }

          .form button {
            padding: 12px 24px;
            background-color: royalblue;
            color: #fff;
          }

          /* Feedback message styles */
          .feedback-message {
            color: green; /* Change this color to your preference */
            font-size: 18px;
            margin-top: 20px;
          }
        `}
      </style>

      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Contact us</div>
        <input type="text" placeholder="Your email" className="input" />
        <textarea placeholder="Your message" defaultValue={""} />
        <button type="submit">Submit</button>
      </form>

      {isSubmitted && (
        <div className="feedback-message">
          Your feedback is submitted!
        </div>
      )}
    </div>
  );
}
