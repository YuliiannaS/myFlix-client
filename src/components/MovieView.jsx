export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <img src={movie.imageurl} width="200"/>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre.name}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director.name}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };