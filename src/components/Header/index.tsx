import { Link } from "react-router-dom";
import HeaderOptions from "./HeaderOptions";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>
          <Link to="/" className="link">
            <FontAwesomeIcon icon={faFutbol} style={{ marginRight: "4px" }} />
            E-Football
          </Link>
        </h1>
        <HeaderOptions />
      </div>
    </header>
  );
};

export default Header;
