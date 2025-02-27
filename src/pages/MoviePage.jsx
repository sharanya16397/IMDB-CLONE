import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${id}&apikey=a06aaba2`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-page">
        <h2 className="loading-text">Loading movie details...</h2>
      </div>
    );
  }

  if (!movie || movie.Response === "False") {
    return (
      <div className="movie-page">
        <h2 className="error-text">Movie not found</h2>
      </div>
    );
  }

  return (
    <div className="movie-page">
      <div className="movie-card">
        {/* Movie Poster */}
        <div className="movie-poster">
          <img src={movie.Poster} alt={movie.Title} />
        </div>

        {/* Movie Details */}
        <div className="movie-info">
          <h2>{movie.Title}</h2>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}</p>

          <a
            href={`https://www.imdb.com/title/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-imdb"
          >
            View on IMDb
          </a>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
