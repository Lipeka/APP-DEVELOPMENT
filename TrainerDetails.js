import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TrainerDetails.css';

const TrainerDetails = () => {
  const [trainers, setTrainers] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '' });

  useEffect(() => {
    const fetchTrainerDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/');
        setTrainers(response.data);
      } catch (error) {
        console.error('Error fetching trainer details:', error);
      }
    };

    fetchTrainerDetails();
  }, []);

  const handleEdit = (trainer) => {
    setEditMode(trainer.id);
    setFormData({ username: trainer.username, email: trainer.email });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/users/${id}/`, {
        username: formData.username,
        email: formData.email,
        role: 'trainer',
      });
      setEditMode(null);
      setTrainers((prevTrainers) =>
        prevTrainers.map((trainer) =>
          trainer.id === id ? { ...trainer, ...formData } : trainer
        )
      );
    } catch (error) {
      console.error('Error saving trainer details:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}/`);
      setTrainers(trainers.filter((trainer) => trainer.id !== id));
    } catch (error) {
      console.error('Error deleting trainer:', error);
    }
  };

  return (
    <div className="trainer-details-container">
      <h2>Training Staff</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer) => (
            <tr key={trainer.id}>
              <td>{trainer.id}</td>
              <td>
                {editMode === trainer.id ? (
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                ) : (
                  trainer.username
                )}
              </td>
              <td>
                {editMode === trainer.id ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                ) : (
                  trainer.email
                )}
              </td>
              <td>
                {editMode === trainer.id ? (
                  <button onClick={() => handleSave(trainer.id)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(trainer)}>Edit</button>
                    <button onClick={() => handleDelete(trainer.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainerDetails;
