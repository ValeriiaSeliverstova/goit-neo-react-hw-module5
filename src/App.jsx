import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomeLayout = lazy(() => import("./layouts/HomeLayout/HomeLayout"));
const MoviesLayout = lazy(() => import("./layouts/MoviesLayout/MoviesLayout"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const NotFoundLayout = lazy(() =>
  import("./layouts/NotFoundLayout/NotFoundLayout")
);

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/movies" element={<MoviesLayout />}>
            <Route index element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundLayout />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
