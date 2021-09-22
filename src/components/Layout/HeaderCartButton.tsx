import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import CartIcon from "../Cart/CartIcon";
// import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton: React.FC<{ onClick: () => void }> = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  // const cartCtx = useContext(CartContext);

  // const { items } = cartCtx;

  // const numberOfCartItems = items.reduce((curNumber, item) => {
  //   return curNumber + item.amount;
  // }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  // useEffect(() => {
  //   if (items.length === 0) {
  //     return;
  //   }
  //   setBtnIsHighlighted(true);

  //   const timer = setTimeout(() => {
  //     setBtnIsHighlighted(false);
  //   }, 300);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [items]);

  return (
    <div className={classes.cssmenu}>
      <NavLink
        activeClassName="active"
        className={classes.link + " " + classes.separate}
        to="/register"
      >
        Đăng ký
      </NavLink>
      <Link className={classes.link + " " + classes.separate} to="/shop">
        Cửa hàng
      </Link>
      <Link className={classes.link + " " + classes.separate} to="/login">
        Tài khoản của tôi
      </Link>
      <Link className={classes.link} to="/checkout">
        Liên hệ
      </Link>
      <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span className={classes.badge}>{/* {numberOfCartItems} */}3</span>
      </button>
    </div>
  );
};

export default HeaderCartButton;
