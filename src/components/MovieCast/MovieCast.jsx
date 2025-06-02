import { getMovieCredits } from "../../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    const fetchCast = async () => {
      try {
        setLoading(true);
        setError(null);
        const castData = await getMovieCredits(movieId);
        setCast(castData);
      } catch (err) {
        setError("Failed to fetch movie cast.");
        console.error("Error fetching movie cast:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2 className={css.title}>Cast</h2>
      {loading && <p className={css.loading}>Loading cast...</p>}
      {error && <p className={css.error}>Error: {error}</p>}
      {cast.length > 0 ? (
        <ul className={css.castList}>
          {cast.map((actor) => (
            <li key={actor.id} className={css.castItem}>
              <img
                className={css.actorImage}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : "https://via.placeholder.com/150x225?text=No+Image"
                }
                alt={actor.name}
              />
              <div className={css.actorInfo}>
                <h3 className={css.actorName}>{actor.name}</h3>
                <p className={css.characterName}>
                  Character: {actor.character}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.noCast}>
          No cast information available for this movie.
        </p>
      )}
    </div>
  );
};

export default MovieCast;
