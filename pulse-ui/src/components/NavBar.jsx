import { Link, useLocation } from "react-router-dom";
function NavBar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navigation-links">
      <Link
        className={`navigation-item ${currentPath === "/" ? "active-link" : ""}`}
        to="/"
      >
        Home
      </Link>
      <Link
        className={`navigation-item ${currentPath === "/dashboard" ? "active-link" : ""}`}
        to="/dashboard"
      >
        Dashboard
      </Link>
      <Link
        className={`navigation-item ${currentPath === "/about" ? "active-link" : ""}`}
        to="/about"
      >
        About
      </Link>
      <Link
        className={`navigation-item ${currentPath === "/my-plan" ? "active-link" : ""}`}
        to="/my-plan"
      >
        My Plan
      </Link>
    </nav>
  );
}

export default NavBar;
