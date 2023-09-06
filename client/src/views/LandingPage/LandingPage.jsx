import { Link } from "react-router-dom";
import "./LandingPage.css";

function Landing() {
  return (
    <div className="App">
      <h1>Landing Page</h1>
      <Link to={"/home"}>
        <button>INGRESAR</button>
      </Link>
    </div>
  );
}

export default Landing;
