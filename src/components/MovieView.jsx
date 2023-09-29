import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "../scss/movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  return (
    <div>
      <div>
        <h1>{movie.title}</h1>
      </div>
      <div>
        <img src={movie.imageurl} className="w-100" />
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};