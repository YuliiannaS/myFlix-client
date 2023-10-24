import React, { useState, useEffect } from "react";

export const Profile = ({ user, token, setUser, deleteUser }) => {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        setFavoriteMovies(user.movies);
    }, [])

    const handleUpdateUser = () => {
        // Send a PUT request to update user information
        fetch(`https://fathomless-coast-10170-8a6e0563517f.herokuapp.com/users/${user.email}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ username, email, password, dateOfBirth })
        })
            .then((response) => response.json())
            .then((updatedUser) => {
                setUser(updatedUser);
            });
    };

    const handleUnfavoriteMovie = (movieTitle) => {
        // Send a DELETE request to unfavorite a movie
        fetch(`https://fathomless-coast-10170-8a6e0563517f.herokuapp.com/users/${user.email}/${movieTitle}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                if (response.status === 200) {
                    const updatedFavoriteMovies = favoriteMovies.filter((movie) => movie.title !== movieTitle);
                    setFavoriteMovies(updatedFavoriteMovies);
                    const updatedUser = { ...user, movies: updatedFavoriteMovies.filter((movie) => movie.title) };
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                } else {
                    console.error('Favorite movies update error');
                }
            });
    };

    const handleUnregisterUser = () => {
        // Send a DELETE request to unregister user
        fetch(`https://fathomless-coast-10170-8a6e0563517f.herokuapp.com/users`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ email: user.email })
        })
            .then((response) => {
                console.log(response);
                deleteUser();
                document.location.href = '/login';
            })
            .catch((error) => {
                console.error(error);
            })
    };

    return (
        <div>
            <h2 className="mb-4">Profile</h2>
            <div className="mb-3">
                <label className="form-label">Username:</label>
                <input type="text" className="form-control" value={user.username} readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" value={user.email} readOnly />
            </div>
            <div className="mb-3">
                <label className="form-label">New Password:</label>
                <input type="password" className="form-control" />
            </div>
            <button className="btn btn-primary" onClick={handleUpdateUser}>Update User</button>
            <button className="btn btn-danger" onClick={handleUnregisterUser}>Unregister</button>

            <h3 className="mt-4">Favorite Movies</h3>
            <ul className="list-group">
                {favoriteMovies.map((movie) => (
                    <li className="list-group-item" key={movie?.title}>
                        {movie?.title}
                        <button className="btn btn-sm btn-danger ms-2" onClick={() => handleUnfavoriteMovie(movie.title)}>
                            Remove from Favorites
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
