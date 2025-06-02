import css from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../api/api";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className={css.homePage}>
      <h1 className={css.title}>Trending today</h1>
      {loading && <p>Loading...</p>}
      {error && <p className={css.error}>Error: {error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
