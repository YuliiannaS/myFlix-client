import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../scss/movie-view.scss";

export const MovieView = ({ movies, user, token, updateUser }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  const handleFavoriteMovie = () => {
    fetch(`https://fathomless-coast-10170-8a6e0563517f.herokuapp.com/users/${user.email}/${movie.title}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((data) => {
        console.log(data);
        const user = JSON.parse(localStorage.getItem("user"));
        user.movies.push(movie);
        localStorage.setItem("user", JSON.stringify(user));
        updateUser(user);
      })
      .catch((error) => {
        console.error("Error favoriting movie:", error);
      });
  };

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
      <Button variant="primary" onClick={handleFavoriteMovie}>
        Favorite Movie
      </Button>
      <hr />
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};