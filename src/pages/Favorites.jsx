import React from "react";

const Favorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <div className="container">
      <h2 className="text-center">❤️ My Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p className="text-center mt-3">No favorites added yet.</p>
      ) : (
        <div className="row">
          {favorites.map((movie) => (
            <div key={movie.id} className="col-md-4 mb-4">
              <div className="card">
                <img src={movie.poster} className="card-img-top" alt={movie.title} />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">{movie.year}</p>
                  <button className="btn btn-danger">Remove ❌</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
