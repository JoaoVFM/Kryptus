import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav id="navbar">
      <h2>
        <Link to="/star-wars">Home</Link>
      </h2>
    </nav>
  );
};

export default Navbar;
