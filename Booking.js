import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Booking.css'; // Import the CSS file for styling

const Booking = ({ onBook }) => {
  const [schedule, setSchedule] = useState({
    frequency: '',
    slot: '',
    time: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [name]: value,
    }));
  };

  const handleBooking = () => {
    alert(`Class booked: ${schedule.frequency} ${schedule.slot} on ${schedule.time}`);
    if (onBook) {
      onBook({
        ...schedule,
        course: 'Selected Course' // Replace with actual course data if needed
      });
    }
    navigate('/student-home/learning-module');
  };

  return (
    <div className="booking-container">
      <h2>Book Classes</h2>
      <form>
        <label>
          Frequency:
          <br />
          <select name="frequency" value={schedule.frequency} onChange={handleChange}>
            <option value="">Select</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekends">Weekends</option>
          </select>
        </label>
        <br />
        <label>
          Slot:
          <br />
          <select name="slot" value={schedule.slot} onChange={handleChange}>
            <option value="">Select</option>
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
          </select>
        </label>
        <br />
        <label>
          Time:
          <br />
          <input type="time" name="time" value={schedule.time} onChange={handleChange} />
        </label>
        <br />
        <button type="button" onClick={handleBooking}>Book Class</button>
      </form>
    </div>
  );
};

export default Booking;
