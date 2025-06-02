import { useState, useEffect } from "react";
import { searchMovies } from "../../api/api";
import css from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (err) {
        setError("Failed to fetch movies.");
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    setIsSubmitted(true);

    if (trimmed) {
      setSearchParams({ query: trimmed });
    } else {
      setSearchParams({});
      setMovies([]);
    }
  };

  return (
    <div className={css.moviesPage}>
      <form className={css.searchForm} onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchInput}
          placeholder="Search for movies..."
          onChange={(e) => setSearchInput(e.target.value.toLocaleLowerCase())}
          className={css.searchInput}
        />
        <button
          type="submit"
          className={css.searchButton}
          onClick={handleSearchSubmit}
        >
          Search
        </button>
      </form>

      {loading && <p className={css.loading}>Loading...</p>}
      {error && <p className={css.error}>Error: {error}</p>}

      {movies.length > 0 && <MovieList movies={movies} />}
      {isSubmitted && query && !loading && movies.length === 0 && (
        <p className={css.noResults}>No results found for "{query}"</p>
      )}
    </div>
  );
};

export default MoviesPage;
