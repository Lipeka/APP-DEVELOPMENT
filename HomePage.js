import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static" style={{ backgroundColor: 'black' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            CHESSBUSTERS ACADEMY
          </Typography>
          <div className='home'>
          </div>
        </Toolbar>
      </AppBar> 
      {/* Main content with background image */}
      <div className="homepage-background">
        <h1>Join us in our mission <br></br>to transform every talented individual <br></br>into a GrandMaster </h1>
        <div className='buttons'>
        <button className='logbutton'
              color="inherit" 
              onClick={handleLoginClick} 
              style={{ marginRight: '10px' }}
            >
              Login
            </button>
            <button className='signbutton'
              color="inherit" 
              onClick={handleRegisterClick}
            >
              Register
            </button>
            </div>
      </div>
    </div>
  );
};

export default HomePage;
