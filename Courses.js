import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/courses/');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error('Error fetching courses:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleBookNowClick = () => {
      navigate('/payment');
  };

  return (
    <div className='courses-body'>
      <div className="courses-container">
        <h2 style={{color:'white'}}>Available Courses</h2>
        <div className="courses-list">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div key={index} className="course-card">
                <img src={course.image_url} alt={course.name} className="course-image" />
                <h3>{course.name}</h3>
                <p>{course.details}</p>
                <p>Start Date: {course.start_date}</p>
                <p>Fee: {course.fee}</p>
                <Button variant="contained" color="primary" onClick={handleBookNowClick}>
                  Book Now
                </Button>
              </div>
            ))
          ) : (
            <p>No courses available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Courses;
