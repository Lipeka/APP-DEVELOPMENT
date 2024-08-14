import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './StudentHomePage.css';

const StudentHomePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/login');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <div className="student-homepage">
      <nav className="navbar">
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="menu" 
          onClick={toggleDrawer(true)}
          style={{ color: 'white' }}
        >
          <MenuIcon />
        </IconButton>
        <h3 style={{ color: 'white', margin: 0 }}>CHESSBUSTERS ACADEMY</h3>
        <Button variant="contained" color="error" className="logout-button" onClick={handleLogout}>
          Logout
        </Button>
      </nav>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List
          style={{ backgroundColor: 'black', height: '100%', color: 'white' }}
          onClick={toggleDrawer(false)}
        >
          <ListItem button component={Link} to="courses">
            <ListItemText primary="View Courses" />
          </ListItem>
          <ListItem button component={Link} to="Tournaments">
            <ListItemText primary="View Tournaments" />
          </ListItem>
          <ListItem button component={Link} to="resources">
            <ListItemText primary="My Resources" />
          </ListItem>
          <ListItem button component={Link} to="https://www.chess.com/play">
            <ListItemText primary="Play" />
          </ListItem>
        </List>
      </Drawer>

      <div className="intro">
        <div className="intro-text">
          <h1>Learn chess <br />&<br /> become Grandmasters</h1>
          <button className="explore" onClick={toggleDrawer(true)}>
            Explore
          </button>
        </div>
        <img 
          src="https://i.pinimg.com/564x/a4/f2/2b/a4f22b7842ec324d6965b84f54e19e0b.jpg" 
          alt="Chess Academy" 
        />
      </div>

      <footer className="footer">
        <ul>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="https://docs.google.com/document/d/1Ngz9lsjIcCpZL2ptnHsZt-ZwRE1_YvM7yRL99hRqbX0/edit?usp=sharing">How we work</Link></li>
          <li><Link to="/contact">Connect with us</Link></li>
          <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
        <div className="registration-details">
          <p>© 2022 ChessBusters Academy. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default StudentHomePage;
