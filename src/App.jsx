import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [emojis, setEmojis] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const response = await fetch(
          `https://emoji-api.com/emojis?search=${encodeURIComponent(searchTerm)}&access_key=7337c12e57c0a7e84ea28d38cd6e49a6a4a9547d`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.length === 0) {
          setErrorMessage('No emojis found for your search');
        } else {
          setErrorMessage('');
          setEmojis(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchEmojis();
    } else {
      setEmojis([]);
      setErrorMessage('');
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <main>
      <div className="center">
        <h1>Emoji Search</h1>
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search for emojis" />
      </div>
      {errorMessage ? (
        <p className="error-message">{errorMessage}</p>
      ) : (
        <ul>
          {emojis.map((emoji, index) => (
            <li key={index}>{emoji.character}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
