import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ForgetPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(isEmailValid){
    alert(`Password reset email sent to ${email}`);
    navigate('/login');
    }
    else {
      if (!isEmailValid) {
        alert('Invalid email');
      }
      }
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: 'auto',
    padding: '7px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundImage: 'url("../images/chess3.jpg)',
    backgroundSize: 'cover',
  };

  const logoStyle = {
    width: '150px',
    height: '150px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  };

  return (
    <div className="forget-password-container">
      <form onSubmit={handleSubmit}>
        <div style={containerStyle}>
          <img src="https://webstockreview.net/images/chess-clipart-border-20.png" alt="Logo" style={logoStyle} />
          <div style={{ maxWidth: '100%', padding: '10px', borderRadius: '10px' }}>
            <h1 style={{ fontSize: '1.5rem', color: 'black', fontFamily: 'cursive', textAlign: 'center' }}>RESET PASSWORD</h1>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              style={{ width: '90%', marginBottom: '15px', color: 'black' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ style: { fontWeight: 'bold' } }}
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ForgetPasswordPage;
