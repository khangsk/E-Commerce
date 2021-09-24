import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import CartIcon from "../Cart/CartIcon";
// import CartContext from "../../store/cart-context";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const HeaderOptions: React.FC<{ onClick: () => void }> = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const { isLoggedIn } = useTypedSelector((state) => state.repositories);
  // const cartCtx = useContext(CartContext);

  // const { items } = cartCtx;

  // const numberOfCartItems = items.reduce((curNumber, item) => {
  //   return curNumber + item.amount;
  // }, 0);

  const btnClasses = `button ${btnIsHighlighted ? "bump" : ""}`;

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
    <div className="cssmenu">
      <div className="link list__category separate">
        Cửa hàng
        <FontAwesomeIcon icon={faAngleDown} className="list__category__icon" />
        <ul className="select-input__list">
          <li className="select-input__item">
            <Link to="/category/giay-bong-da" className="select-input__link">
              Giày bóng đá
            </Link>
          </li>
          <li className="select-input__item">
            <Link to="/category/quan-ao-bong-da" className="select-input__link">
              Quần áo bóng đá
            </Link>
          </li>
          <li className="select-input__item">
            <Link to="/category/phu-kien" className="select-input__link">
              Phụ kiện
            </Link>
          </li>
        </ul>
      </div>
      {!isLoggedIn && (
        <Link className="link separate" to="/register">
          Đăng ký
        </Link>
      )}
      {!isLoggedIn && (
        <Link className="link separate" to="/login">
          Đăng nhập
        </Link>
      )}

      <Link className="link" to="/checkout">
        Liên hệ
      </Link>
      <button className={btnClasses} onClick={props.onClick}>
        <span className="icon">
          <CartIcon />
        </span>
        <span className="badge">{/* {numberOfCartItems} */}3</span>
      </button>
    </div>
  );
};

export default HeaderOptions;
