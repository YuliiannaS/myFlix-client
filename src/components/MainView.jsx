import { useState, useEffect } from "react";
import { LoginView } from './LoginView';
import { SignupView } from './SignupView';
import { MovieCard } from './MovieCard';
import { MovieView } from './MovieView';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://fathomless-coast-10170-8a6e0563517f.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView onLoggedIn={(user) => setUser(user)} />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
          <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </>
      )}
    </Row>
  );
};

/* if (!user) {
   return (
     <>
       <LoginView onLoggedIn={(user, token) => {
         setUser(user);
         setToken(token);
       }} />
       or
       <SignupView />
     </>
   );
 }

 if (selectedMovie) {
   return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
 }

 if (movies.length === 0) {
   return <div>The list is empty!</div>;
 }

 return (
   <>
     <div>
       {movies.map((movie) => (
         <MovieCard
           key={movie._id}
           movie={movie}
           onMovieClick={(newSelectedMovie) => {
             setSelectedMovie(newSelectedMovie);
           }}
         />
       ))}
     </div>
     <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
   </>
 );
};*/