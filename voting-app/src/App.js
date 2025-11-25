import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('movies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });
  const [newMovie, setNewMovie] = useState('');

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
    console.log('Saved movies to localStorage:', movies);
  }, [movies]);

  const addMovie = () => {
    if (newMovie.trim()) {
      setMovies([...movies, { name: newMovie, status: 'want' }]);
      setNewMovie('');
    }
  };

  const toggleStatus = (index) => {
    const updatedMovies = movies.map((movie, i) =>
      i === index ? { ...movie, status: movie.status === 'want' ? 'watched' : 'want' } : movie
    );
    setMovies(updatedMovies);
  };

  const wantToWatch = movies.filter(movie => movie.status === 'want');
  const watched = movies.filter(movie => movie.status === 'watched');

  return (
    <div className="App">
      <h1>Список фильмов для просмотра</h1>
      <div className="add-movie">
        <input
          type="text"
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
          placeholder="Название фильма"
        />
        <button onClick={addMovie}>Добавить</button>
      </div>
      <div className="movie-lists">
        <div className="list-section">
          <h2>Хочу посмотреть</h2>
          <ul>
            {wantToWatch.map((movie, index) => (
              <li key={movies.indexOf(movie)}>
                {movie.name}
                <button onClick={() => toggleStatus(movies.indexOf(movie))}>Отметить как просмотренный</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="list-section">
          <h2>Посмотрено</h2>
          <ul>
            {watched.map((movie, index) => (
              <li key={movies.indexOf(movie)}>
                {movie.name}
                <button onClick={() => toggleStatus(movies.indexOf(movie))}>Вернуть в хочу посмотреть</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
