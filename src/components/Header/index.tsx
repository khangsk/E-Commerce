import { Link } from "react-router-dom";
import HeaderOptions from "./HeaderOptions";
import "./index.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>
          <Link to="/" className="link">
            E-Football
          </Link>
        </h1>
        <HeaderOptions />
      </div>
    </header>
  );
};

export default Header;
