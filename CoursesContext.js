import React, { createContext, useContext, useState } from 'react';

// Create context
const CoursesContext = createContext();

export const useCourses = () => useContext(CoursesContext);

// Create a provider component
export const CoursesProvider = ({ children }) => {
  const courseList = [
    { 
      id: 1, 
      name: 'Beginner Chess Lessons', 
      description: 'Learn the basics of chess, including moves, rules, and basic strategies.', 
      imageUrl: 'https://thechessworld.com/wp-content/uploads/2020/10/how-chess-pieces-move-complete-guide-beginners.jpg', 
      startDate: 'August 1',
      textLessonUrl: 'https://www.wikihow.com/Play-Chess-for-Beginners',
      videoLessonUrl: 'https://www.youtube.com/watch?v=OCSbzArwB10'
    },
    { 
      id: 2, 
      name: 'Intermediate Chess Strategies', 
      description: 'Improve your chess skills with intermediate strategies and tactics.', 
      imageUrl: 'https://i.ytimg.com/vi/W6a_Y4SLFP0/maxresdefault.jpg',  
      startDate: 'August 1',
      textLessonUrl: 'https://chessandfootball.com/chess/chess-tips-for-intermediate-players/',
      videoLessonUrl: 'https://www.youtube.com/watch?v=KknSpGmTLkg'
    },
    { 
      id: 3, 
      name: 'Advanced Chess Tactics', 
      description: 'Master advanced chess tactics and competitive play strategies.', 
      imageUrl: 'https://i.ytimg.com/vi/zayHjbFRRgE/maxresdefault.jpg', 
      startDate: 'August 1',
      textLessonUrl: 'https://lichess.org/study/txE6GcIe',
      videoLessonUrl: 'https://www.youtube.com/watch?v=LyvC8H_60eU'
    },
  ];

  const [courses, setCourses] = useState(courseList);

  const addCourse = (course) => {
    setCourses((prevCourses) => [...prevCourses, { ...course, id: prevCourses.length + 1 }]);
  };

  return (
    <CoursesContext.Provider value={{ courses, addCourse }}>
      {children}
    </CoursesContext.Provider>
  );
};
