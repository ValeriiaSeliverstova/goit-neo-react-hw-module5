import Navigation from "../../components/Navigation/Navigation";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
