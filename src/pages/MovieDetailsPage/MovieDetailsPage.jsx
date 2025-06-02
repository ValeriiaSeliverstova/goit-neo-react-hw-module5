import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getMovieDetails } from "../../api/api";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const details = await getMovieDetails(movieId);
        setMovieDetails(details);
      } catch (err) {
        setError("Failed to fetch movie details.");
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (loading) {
    return <p className={css.loading}>Loading...</p>;
  }

  if (error) {
    return <p className={css.error}>Error: {error}</p>;
  }

  return (
    movieDetails && (
      <div className={css.movieDetailsPage}>
        <Link to={backLinkRef.current} className={css.backButton}>
          Back
        </Link>
        <div className={css.content}>
          <img
            className={css.poster}
            src={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movieDetails.title}
          />

          <div className={css.info}>
            <h1 className={css.title}>
              {movieDetails.title} ({movieDetails.release_date.slice(0, 4)})
            </h1>

            <p className={css.score}>
              <strong>User Score:</strong>{" "}
              {Math.round(movieDetails.vote_average * 10)}%
            </p>

            <h2 className={css.subheading}>Overview</h2>
            <p className={css.overview}>{movieDetails.overview}</p>

            <h2 className={css.subheading}>Genres</h2>
            <p className={css.genres}>
              {movieDetails.genres.map((genre) => genre.name).join("  ")}
            </p>
          </div>
        </div>

        <hr />

        <div className={css.additional}>
          <h3>Additional information</h3>
          <ul className={css.additionalList}>
            <li>
              <NavLink
                to="cast"
                className={({ isActive }) =>
                  isActive ? css.activeLink : css.additionalLink
                }
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to="reviews"
                className={({ isActive }) =>
                  isActive ? css.activeLink : css.additionalLink
                }
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <Outlet />
        </div>
      </div>
    )
  );
};

export default MovieDetailsPage;
