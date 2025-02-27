import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0); // Track total results

  const fetchMovies = async (query, pageNumber = 1) => {
    if (query.length < 3) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=a06aaba2&page=${pageNumber}`
      );
      if (response.data.Search) {
        setMovies((prev) => (pageNumber === 1 ? response.data.Search : [...prev, ...response.data.Search]));
        setTotalResults(response.data.totalResults);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (search) {
      fetchMovies(search, page);
    }
  }, [search, page]);

  const handleSearch = (query) => {
    setSearch(query);
    setPage(1);
    setMovies([]);
  };

  const handleLoadMore = () => {
    if (movies.length < totalResults) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container mt-4">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Movie Grid */}
      <div className="movie-grid mt-3">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{movie.Title}</h5>
              <p className="card-text">Year: {movie.Year}</p>
              <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {movies.length > 0 && movies.length < totalResults && !loading && (
        <button className="btn btn-secondary mt-3" onClick={handleLoadMore}>
          Load More
        </button>
      )}

      {/* Loading Message */}
      {loading && <p>Loading movies...</p>}
    </div>
  );
};

export default Home;
