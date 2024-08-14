// ContactUs.js
import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message delivered successfully');
        window.location.href = '/student-home/*'; // Redirect to the homepage
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="contact-us-container">
    <div className="container">
      <h1>Connect With Us</h1>
      <p>We would love to respond to your queries and help you succeed.<br />Feel free to get in touch with us.</p>
      <div className="contact-box">
        <div className="contact-left">
          <h3>Send your request</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-row">
              <div className="input-group">
                <label>Name</label>
                <input type="text" name="name" required />
              </div>
              <div className="input-group">
                <label>Phone</label>
                <input type="text" name="phone" required />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label>Email</label>
                <input type="email" name="email" required />
              </div>
              <div className="input-group">
                <label>Subject</label>
                <input type="text" name="subject" required />
              </div>
            </div>
            <label>Message</label>
            <textarea rows="5" name="message" placeholder="Your Message" required></textarea>
            <button type="submit">SEND</button>
          </form>
        </div>
        <div className="contact-right">
          <h3>Reach us</h3>
          <table>
            <tbody>
              <tr>
                <td>Email</td>
                <td>chessbusters@gmail.com</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>+91 8072339524</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>
                  14/687, 3rd floor,<br />
                  Green valley,<br />
                  Coimbatore, 641002
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactUs;
