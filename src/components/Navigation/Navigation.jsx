import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

const navClasses = ({ isActive }) => (isActive ? css.active : "");

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <NavLink to="/" className={navClasses}>
            Home
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink to="/movies" className={navClasses}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
