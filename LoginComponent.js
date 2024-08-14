import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../ReduxComponent/userSlice';
import './LoginComponent.css';

const LoginComponent = ({ onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        dispatch(setCurrentUser(userData));
        alert('Login successful');

        // Redirect based on role
        if (userData.role === 'student') {
          navigate('/student-home');
        } else if (userData.role === 'trainer') {
          navigate('/admin-home');
        }
      } else {
        const errorData = await response.json();
        alert('Invalid email or password: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in, please try again later.');
    }
  };
  const logoStyle = {
    width: '150px',
    height: '150px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  };

  return (
    <div className='login-body'>
      <div style={containerStyle} className='login-container'>
      <img src="https://webstockreview.net/images/chess-clipart-border-20.png" alt="Logo" style={logoStyle} />
        <div style={{ maxWidth: '100%', padding: '10px', borderRadius: '10px' }}>
          <h1 style={{ fontSize: '1.5rem', color: 'black', fontFamily: 'cursive', textAlign: 'center' }}>LOGIN FORM</h1>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            style={{ width: '90%', marginBottom: '15px', color: 'black' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{ style: { fontWeight: 'bold' } }} />
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
          <button className="login-button " onClick={handleLogin}>
            Submit
          </button>
          <button className='cancel-button' color="primary" onClick={onCancel}>
            Cancel
          </button><br></br><br></br>
          <Link to="/forgot-password" style={{ color: 'black', fontWeight: 'bold' }}>Forgot Password</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;

const containerStyle = {
  maxWidth: '400px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};
