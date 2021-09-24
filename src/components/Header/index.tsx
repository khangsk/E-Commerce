import { Link } from "react-router-dom";
import HeaderOptions from "./HeaderOptions";
import "./index.css";

const Header: React.FC = () => {
  const onShowCart = () => {};

  return (
    <header className="header">
      <div className="container">
        <h1>
          <Link to="/" className="link">
            E-Football
          </Link>
        </h1>
        <HeaderOptions onClick={onShowCart} />
      </div>
    </header>
  );
};

export default Header;
