import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDNkZGNkYzRiYzA4OTk1OWE5ZGY5MTRjYTg0ODljZSIsIm5iZiI6MTc0ODQ2MzAyMy4wMTgsInN1YiI6IjY4Mzc2ZGFmYzQzNTU4MDdkMzAzODJiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l4EZna9Aw6jfYp5rDv_PcKWQsmj_MtlvJ3GRvlSnG-A";

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get("/trending/movie/day");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    throw error;
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/credits`);
    return data.cast;
  } catch (error) {
    console.error(`Error fetching credits for movie ID ${movieId}:`, error);
    throw error;
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const { data } = await axios.get(`/movie/${movieId}/reviews`);
    return data.results;
  } catch (error) {
    console.error(`Error fetching reviews for movie ID ${movieId}:`, error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const { data } = await axios.get("/search/movie", {
      params: {
        query,
      },
    });
    return data.results;
  } catch (error) {
    console.error(`Error searching for movies with query "${query}":`, error);
    throw error;
  }
};
