import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './Lessons.css';

const LearningModule = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);

  const location = useLocation();
  const selectedCourse = location.state?.selectedCourse;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/courses/');
        const data = await response.json();
        const formattedData = data.map(course => ({
          id: course.id,
          name: course.name,
          details: course.details,
          image: course.image_url,
          startDate: course.start_date,
          textLesson: course.text_lesson_url,
          videoLesson: course.video_lesson_url
        }));
        
        // Filter to only include the selected course
        const filteredCourse = formattedData.find(course => course.name === selectedCourse);
        if (filteredCourse) {
          setCourses([filteredCourse]);  // Set it as a single-element array
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [selectedCourse]);

  const handleClickOpen = (course) => {
    setSelectedCourseDetails(course);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourseDetails(null);
  };

  const handleViewLesson = (type) => {
    const url = type === 'text' ? selectedCourseDetails.textLesson : selectedCourseDetails.videoLesson;
    window.open(url, '_blank');
    handleClose();
  };

  return (
    <div className="courses-container">
      <h2 style={{color:'white'}}>Lessons</h2>
      <div className="courses-list">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.name} className="course-image" />
            <h3>{course.name}</h3>
            <p>{course.details}</p>
            <p>Start Date: {course.startDate}</p>
            <Button variant="contained" color="primary" onClick={() => handleClickOpen(course)}>
              View
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Lesson Type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select the type of lesson you want to view for {selectedCourseDetails?.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleViewLesson('text')} color="primary">
            Text Lesson
          </Button>
          <Button onClick={() => handleViewLesson('video')} color="primary">
            Video Lesson
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LearningModule;
