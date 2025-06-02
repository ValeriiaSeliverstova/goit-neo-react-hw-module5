import { getMovieReviews } from "../../api/api";
import css from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (err) {
        setError("Failed to fetch movie reviews.");
        console.error("Error fetching movie reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h2>Movie Reviews</h2>
      {loading && <p className={css.loading}>Loading reviews...</p>}
      {error && <p className={css.error}>Error: {error}</p>}
      {reviews.length > 0 ? (
        <ul className={css.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={css.reviewItem}>
              <h3 className={css.author}>{review.author}</h3>
              <p className={css.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.noReviews}>No reviews available for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
