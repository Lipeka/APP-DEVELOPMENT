import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axiosinstance from './axiosinstance';
import './AddCourse.css';

const AddCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [courseImage, setCourseImage] = useState('');
  const [courseDetails, setCourseDetails] = useState(''); // Added courseDetails state
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [courseFee, setCourseFee] = useState('');
  const [textLesson, setTextLesson] = useState('');
  const [videoLesson, setVideoLesson] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the startDate is in the format 'YYYY-MM-DD'
    const formattedStartDate = startDate.split('T')[0];

    const newCourse = {
      name: courseName,
      image_url: courseImage,
      details: courseDetails, // Ensure course details are included
      duration: duration,
      fee: courseFee,
      start_date: formattedStartDate,
      text_lesson_url: textLesson,
      video_lesson_url: videoLesson,
    };

    try {
      const response = await axiosinstance.post('courses/', newCourse);
      console.log(response.data);

      alert('Course added successfully');
      navigate('/admin-home/view-courses');
    } catch (error) {
      console.error('Error adding course:', error.response?.data || error.message);
      alert(`Failed to add course: ${error.response?.data?.[0] || 'Unknown error'}`);
    }
  };

  return (
    <div className='add-coursebody'>
    <div className="add-course">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Course Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
        <TextField
          label="Course Image URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={courseImage}
          onChange={(e) => setCourseImage(e.target.value)}
          required
        />
        <TextField
          label="Course Details" // Added Course Details TextField
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={courseDetails}
          onChange={(e) => setCourseDetails(e.target.value)}
          required
        />
        <TextField
          label="Duration"
          variant="outlined"
          fullWidth
          margin="normal"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <TextField
          label="Start Date"
          variant="outlined"
          fullWidth
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <TextField
          label="Course Fee"
          variant="outlined"
          fullWidth
          margin="normal"
          value={courseFee}
          onChange={(e) => setCourseFee(e.target.value)}
          required
        />
        <TextField
          label="Text Lesson URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={textLesson}
          onChange={(e) => setTextLesson(e.target.value)}
          required
        />
        <TextField
          label="Video Lesson URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={videoLesson}
          onChange={(e) => setVideoLesson(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">Add Course</Button>
      </form>
    </div>
    </div>
  );
};

export default AddCourse;
