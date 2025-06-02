import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.movieItem}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <h2 className={css.movieTitle}>{movie.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
