import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './RegistrationComponent.css';

const RegistrationComponent = ({ onCancel }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password || !role) {
      alert('Please fill in all fields.');
    } else {
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const isPasswordValid = password.length >= 6;
      if (isEmailValid && isPasswordValid) {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/users/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              username,
              password,
              role,
            }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert('Registration Successful');
            navigate('/login');
          } else {
            console.log('Server response:', data);
            alert('Error registering user: ' + (data.message || 'Unknown error'));
          }
        } catch (error) {
          console.error('Error registering user:', error);
          alert('Error registering user, please try again later.');
        }
      } else {
        alert('Invalid email/password format');
      }
    }
  };
  

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const containerStyle = {
    maxWidth: '400px',
    // padding: '7px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const logoStyle = {
    width: '150px',
    height: '150px',
    paddingLeft: '115px',
  };

  return (
    <div className='register-body'>
    <div style={containerStyle} className='register-container'>
    <img src="https://webstockreview.net/images/chess-clipart-border-20.png" alt="Logo" style={logoStyle} />
      <div style={{ maxWidth: '100%', padding: '10px', borderRadius: '10px' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'black', fontFamily: 'cursive' }}>REGISTRATION FORM</h1>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          style={{ width: '90%', marginBottom: '15px' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{ style: { fontWeight: 'bold' } }}
        />
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          style={{ width: '90%', marginBottom: '15px' }}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{ style: { fontWeight: 'bold' } }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          style={{ width: '90%', marginBottom: '15px', color: 'black' }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{ style: { fontWeight: 'bold' } }} /><br></br>
        <TextField
          label="Role"
          variant="outlined"
          fullWidth
          margin="normal"
          style={{ width: '90%', marginBottom: '15px', color: 'black' }}
          select
          SelectProps={{ native: true }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="trainer">Trainer</option>
        </TextField>
        <button className="register-button" onClick={handleRegister}>
          Submit
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button><br></br><br></br>
        <Link to="/login" style={{ color: 'black', fontWeight: 'bold' }}>Already have an account? Login</Link>
      </div>
    </div>
    </div>
  );
};
export default RegistrationComponent;