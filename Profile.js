import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Profile.css';

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('profile/', {
          params: {
            email: currentUser.email,
            password: currentUser.password
          }
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('profile/', profileData, {
        params: {
          email: currentUser.email,
          password: currentUser.password
        }
      });
      setProfileData(response.data);
      alert('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p><strong>ID:</strong> {profileData.user.id}</p>
      <p><strong>Name:</strong> {profileData.user.username}</p>
      <p><strong>Email:</strong> {profileData.user.email}</p>
      {isEditing ? (
        <>
          <label>
            Phone Number:
            <input
              type="text"
              name="phone_number"
              value={profileData.phone_number}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
            />
          </label>
          <br />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Phone Number:</strong> {profileData.phone_number}</p>
          <p><strong>Address:</strong> {profileData.address}</p>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
};

export default Profile;
