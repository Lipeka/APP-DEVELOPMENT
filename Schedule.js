import React from 'react';
import './Schedule.css'; // Import the CSS file for styling

const Schedule = ({ course, booking }) => {
  if (!course || !booking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="schedule-container">
      <h2>Scheduled Classes</h2>
      <div className="schedule-details">
        <p><strong>Course Name:</strong> {course.name}</p>
        <p><strong>Course Duration:</strong> {course.duration}</p>
        <p><strong>Frequency:</strong> {booking.frequency}</p>
        <p><strong>Slot:</strong> {booking.slot}</p>
        <p><strong>Time:</strong> {booking.time}</p>
        <p><strong>Trainer Name:</strong> Trainer1</p>
      </div>
    </div>
  );
};

export default Schedule;
