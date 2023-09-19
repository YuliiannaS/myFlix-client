import { useState } from "react";
import { MovieCard } from './MovieCard';
import { MovieView } from './MovieView';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Silence of the Lambs",
      image:
        "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX200_.jpg",
      director: "Jonathan Demme",
      genre: "Thriller"
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      image:
        "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX200_.jpg",
      director: "Frank Darabont",
      genre: "Drama"
    },
    {
      id: 3,
      title: "Philadelphia",
      image:
        "https://m.media-amazon.com/images/M/MV5BNDE0MWE1ZTMtOWFkMS00YjdiLTkwZTItMDljYjY3MjM0NTk5XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_FMjpg_UX200_.jpg",
      director: "Jonathan Demme",
      genre: "Drama"
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};