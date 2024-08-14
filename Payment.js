import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode'; // For decoding JWT token
import './Payment.css'; // Import CSS file for styling

const Payment = () => {
  const [contactDetails, setContactDetails] = useState('');
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('');
  const [slot, setSlot] = useState('');
  const [time, setTime] = useState('');
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch available courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/courses/');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setCourse(selectedCourse);
    const selectedCourseDetails = courses.find(c => c.name === selectedCourse);
    if (selectedCourseDetails) {
      setAmount(selectedCourseDetails.fee); // Assume the backend sends the fee as part of the course details
    }
  };
// Store tokens in localStorage
localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0MTczOTYzLCJpYXQiOjE3MjM1NjkxNjMsImp0aSI6ImZiNWU1ZWZhMDQ2MzQ4OGRiN2FjMjA2MTZlMjliM2Q5IiwidXNlcl9pZCI6MTV9.nxFD_uQdm9kRp0dmoK-ygAmuxJxTF09-MocBUK_ZbzA');
localStorage.setItem('refreshToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcyNjE2MTE2MywiaWF0IjoxNzIzNTY5MTYzLCJqdGkiOiJhYjA0Nzg5ZmViNTk0ZTM3OTkzZjc4MDYwMjU4MGUxNyIsInVzZXJfaWQiOjE1fQ.7JkvXILaEHCOWNa8HvXqPjDmNvJW8ZH3MnOLYqRcZKk');

const handlePayment = async () => {
  const paymentData = {
    student_id: studentId,
    name: name,
    contact_no: contactDetails,
    course: course,
    amount_to_pay: amount,
    payment_status: 'Completed', // Set payment status to 'Completed' upon successful payment
    frequency: frequency,
    slot: slot,
    time: time
  };

  // Retrieve the JWT token from localStorage
  const token = localStorage.getItem('accessToken');

  if (!token) {
    alert('Please log in to complete the payment.');
    navigate('/login'); // Redirect to login page if token is not available
    return;
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/payments/', paymentData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT token in the Authorization header
      },
    });
    alert(`Payment of $${amount} for ${course} is successful. View the resources anytime!`);
    navigate('/student-home');
  } catch (error) {
    console.error('Error processing payment:', error);
    if (error.response && error.response.status === 401) {
      alert('Session expired. Please log in again.');
      navigate('/login'); // Redirect to login page if the token is expired or invalid
    } else {
      alert('Payment failed. Please try again.');
    }
  }
};


  return (
    <div className='paybox'>
      <div className="payment-container">
        <h2>Payment and Booking Portal</h2>
        <form>
          <label>
            Student ID:
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Contact Details:
            <input
              type="text"
              value={contactDetails}
              onChange={(e) => setContactDetails(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Course:
            <select value={course} onChange={handleCourseChange} required>
              <option value="">Select a course</option>
              {courses.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Amount: $
            <input type="number" value={amount} readOnly />
          </label>
          <br />
          <label>
            Frequency:
            <select name="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} required>
              <option value="">Select</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
            </select>
          </label>
          <br />
          <label>
            Slot:
            <select name="slot" value={slot} onChange={(e) => setSlot(e.target.value)} required>
              <option value="">Select</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </select>
          </label>
          <br />
          <label>
            Time:
            <input type="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          </label>
          <br />
          <button type="button" onClick={handlePayment}>
            Pay and Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
