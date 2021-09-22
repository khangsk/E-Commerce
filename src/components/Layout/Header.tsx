import { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";

const Header: React.FC = () => {
  const onShowCart = () => {};

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.container}>
          <h1>
            <Link to="/home" className={classes.link}>
              E-Football
            </Link>
          </h1>
          <HeaderCartButton onClick={onShowCart} />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
