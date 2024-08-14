import React, { useState } from 'react';
// Ensure the correct CSS file is imported

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const items = document.querySelectorAll('.searchable-item');
    items.forEach(item => {
      const text = item.textContent || item.innerText;
      if (text.toLowerCase().includes(searchQuery.toLowerCase())) {
        item.classList.add('highlight');
      } else {
        item.classList.remove('highlight');
      }
    });
  };

  return (
    <div>
      <div className="search-bar-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
          placeholder="Search..."
          aria-label="Search"
        />
        <button
          type="button"
          className="search-button"
          onClick={handleSearch}
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0111 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.969 5.617zm-2.006-.742A6.977 6.977 0 0018 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 004.875-1.975l.15-.15z"></path>
          </svg>
        </button>
      </div>
      <div className="searchable-items-container">
        <button className="searchable-item">Courses</button>
        <button className="searchable-item">Tournament</button>
        <button className="searchable-item">Profile</button>
        <a href="/contact" className="searchable-item">Contact Us</a>
        {/* Other content */}
      </div>
    </div>
  );
};

export default SearchBar;
