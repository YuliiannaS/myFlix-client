import { useState, useEffect } from "react";
import { LoginView } from './LoginView';
import { SignupView } from './SignupView';
import { MovieCard } from './MovieCard';
import { MovieView } from './MovieView';
import { NavigationBar } from './NavigationBar';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie._id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
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