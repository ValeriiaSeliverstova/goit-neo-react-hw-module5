import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";

const MoviesLayout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default MoviesLayout;
