import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Lessons.css';

const Lessons = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch the courses from the Django backend
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

  return (
    <div className='coursebody'>
    <div className="courses-container">
      <h1 style={{color:'white', textAlign:'center'}}>Lessons</h1>
      <div className="courses-list">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.image_url} alt={course.name} className="course-image" />
            <h3>{course.name}</h3>
            <p>{course.details}</p>
            <p>Start Date: {course.start_date}</p>
            <Link to={course.text_lesson_url} target="_blank">
              <Button variant="contained" color="primary">Text Lesson</Button>
            </Link>
            <br />
            <Link to={course.video_lesson_url} target="_blank">
              <Button variant="contained" color="primary">Video Lesson</Button>
            </Link>
            <br />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Lessons;
