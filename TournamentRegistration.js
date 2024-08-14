import React, { useState } from 'react';
import axiosinstance from './axiosinstance'; // Import the axios instance
import { useNavigate } from 'react-router-dom';
import './TournamentRegistration.css';

const TournamentRegistration = () => {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    contact: '',
    academy: '',
    competition: ''
  });
  const navigate = useNavigate();

  const competitions = [
    'Local',
    'State',
    'National',
    'International',
    'Chessbusters\' GrandMaster of the Year'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosinstance.post('registrations/', {
        user_type: userType,
        ...formData
      });
      console.log(response.data);
      alert('Registration successful! Other details will be sent to you shortly.');
      navigate('/admin-home/Tournaments');
    } catch (error) {
      console.error('There was an error with the registration:', error);
      alert('Registration failed. Please try again.');
    }
  };
  

  return (
    <div className='regcont'>
    <div className="registration-container">
      <h2>Tournament Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label>User Type:</label>
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="student">Student</option>
            <option value="trainer">Trainer/Mentor</option>
          </select>
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contact:</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Academy Name:</label>
          <input type="text" name="academy" value={formData.academy} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Competition:</label>
          <select name="competition" value={formData.competition} onChange={handleChange} required>
            <option value="">Select Competition</option>
            {competitions.map((competition, index) => (
              <option key={index} value={competition}>{competition}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
    </div>
  );
};

export default TournamentRegistration;
