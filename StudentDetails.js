import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentDetails.css';

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editableStudent, setEditableStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/payments/');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/courses/');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchStudents();
    fetchCourses();
  }, []);

  const handleEditClick = (student) => {
    setEditMode(student.id);
    setEditableStudent({ ...student });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/payments/${editableStudent.id}/`, editableStudent);
      setStudents(students.map(student =>
        student.id === editableStudent.id ? editableStudent : student
      ));
      setEditMode(null);
    } catch (error) {
      console.error('Error updating student details:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/payments/${id}/`);
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="student-details-container">
      <h1>Enrolled Students</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Course Enrolled</th>
            <th>Frequency</th>
            <th>Slot</th>
            <th>Time</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.contact_no}</td>
              {editMode === student.id ? (
                <>
                  <td>
                    <select name="course" value={editableStudent.course} onChange={handleInputChange}>
                      <option value="">Select Course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.name}>{course.name}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select name="frequency" value={editableStudent.frequency} onChange={handleInputChange}>
                      <option value="">Select Frequency</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                    </select>
                  </td>
                  <td>
                    <select name="slot" value={editableStudent.slot} onChange={handleInputChange}>
                      <option value="">Select Slot</option>
                      <option value="morning">Morning</option>
                      <option value="evening">Evening</option>
                    </select>
                  </td>
                  <td><input type="time" name="time" value={editableStudent.time} onChange={handleInputChange} /></td>
                  <td>
                    <select name="payment_status" value={editableStudent.payment_status} onChange={handleInputChange}>
                      <option value="">Select Payment Status</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={() => setEditMode(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{student.course}</td>
                  <td>{student.frequency}</td>
                  <td>{student.slot}</td>
                  <td>{student.time}</td>
                  <td>{student.payment_status}</td>
                  <td>
                    <button onClick={() => handleEditClick(student)}>Edit</button>
                    <button onClick={() => handleDeleteClick(student.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetails;
