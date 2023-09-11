import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <Link to={"/home"} className="link">
        <p className="nav-button">HOME</p>
      </Link>

      <Link to={"/create"} className="link">
        <p className="nav-button">CREATE GAME</p>
      </Link>
    </div>
  );
}

export default Navbar;
