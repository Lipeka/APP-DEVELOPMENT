import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ResourceLogin.css';

const ResourceLogin = () => {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/courses/');
        if (response.status === 200) {
          setCourses(response.data);
        } else {
          console.error('Error fetching courses:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/verify-payment/', {
        student_id: studentId,
        name: name,
        course: course,
      });
  
      if (response.data.status === 'success') {
        navigate('/student-home/learning-module', { state: { selectedCourse: course } });
      } else if (response.data.status === 'pending') {
        alert(response.data.message);
        navigate('/payment');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Wrong course selected or payment not found.');
      } else {
        alert('Error verifying payment. Please try again.');
      }
    }
  };
  

  return (
    <div className="resource-login-container">
      <div className="resource-login-box">
        <h2>Access Your Resources</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="studentId">Student ID</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="course">Course</label>
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          >
            <option value="">Select your course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
          <button type="submit">Access Resources</button>
        </form>
      </div>
    </div>
  );
};

export default ResourceLogin;
