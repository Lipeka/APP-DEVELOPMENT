import React, { useState, useEffect } from 'react';
import axiosinstance from './axiosinstance';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './Tournaments.css'; // Import CSS file for styling

const tournamentsList = [
  { id: 1, name: 'Local Chess Tournament', date: 'August 15, 2024', description: 'A tournament for local chess enthusiasts.', imageUrl: 'https://i0.wp.com/sanantonioreport.org/wp-content/uploads/2020/01/ScottBall_san-antonio-chess-tournament-dreamweek-dream-week-education-competition-1-18-2020-3.jpg?w=2040&ssl=1' },
  { id: 2, name: 'State Chess Championship', date: 'September 1, 2024', description: 'The best players from across the state compete.', imageUrl: 'https://cdndailyexcelsior.b-cdn.net/wp-content/uploads/2018/01/page12-21.jpg' },
  { id: 3, name: 'National Chess Championship', date: 'October 5, 2024', description: 'Compete with the best players from around the country.', imageUrl: 'https://www.al.com/resizer/ktIa_4lMUxLUW1_sau0urGY4Ba4=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/image.al.com/home/bama-media/width2048/img/living_impact/photo/img-2773jpg-8ab210d45f874bb5.jpg' },
  { id: 4, name: 'International Chess Championship', date: 'November 10, 2024', description: 'A prestigious international chess tournament.', imageUrl: 'http://aicf.in/wp-content/uploads/2018/05/MuraliVantika2ndRound-768x512.jpg' },
  { id: 5, name: 'ChessBusters GrandMaster of the Year', date: 'July 20, 2025', description: 'The ultimate chess competition of the year.', imageUrl: 'https://chessklub.com/wp-content/uploads/2021/07/international-chess-day-tournament.jpg' },
  // Add more tournaments as needed
];

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    axiosinstance.get('/tournaments')
      .then(response => {
        if (Array.isArray(response.data)) {
          setTournaments(response.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      })
      .catch(error => console.error('Error fetching tournaments:', error));

    // For now, use the local tournamentsList for demonstration
    setTournaments(tournamentsList);
  }, []);

  return (
    <div className="tournaments-container">
      <h2 style={{ color: 'white' }}>Tournaments</h2>
      <div className="tournaments-list">
        {Array.isArray(tournaments) && tournaments.length > 0 ? (
          tournaments.map(tournament => (
            <div key={tournament.id} className="tournament-card">
              <img src={tournament.imageUrl} alt={tournament.name} className="tournament-image" />
              <h3>{tournament.name}</h3>
              <p>{tournament.description}</p>
              <p>Date: {tournament.date}</p>
              <Link to="/tournament-registration">
                <Button variant="contained" color="primary">Register</Button>
              </Link>
            </div>
          ))
        ) : (
          <p>No tournaments available.</p>
        )}
      </div>
    </div>
  );
};

export default Tournaments;
