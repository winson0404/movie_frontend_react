import { useState, useEffect } from 'react';
import MovieList from './components/MovieList/';
import MovieDetails from './components/MovieDetails/';
import './App.css';

function App() {

  const [movies, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();

  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 55252c9d226d4ca9fd129d08f1f9476afda5fcc7'
      }
    })
    .then( res => res.json())
    .then( res => setMovie(res))
    .catch(err => console.log(err))
  }, [])

  const movieCLicked = (movie)=>{
    setSelectedMovie(movie);
  }

  const updateMovie = movie =>{
    setSelectedMovie(movie);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie rater</h1>
      </header>
      <div className = "layout">
        <MovieList movies={movies} movieCLicked={movieCLicked}/>
        <MovieDetails movie={selectedMovie} updateMovie={updateMovie}/>
      </div>
    </div>
  );
}

export default App;
