import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CartIcon from "../Cart/CartIcon";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { ActionType } from "../../state/action-types";
import { toast } from "react-toastify";

const HeaderOptions: React.FC = (props) => {
  const dispatch = useDispatch();
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const { isLoggedIn, user, productsOrder } = useTypedSelector(
    (state) => state.repositories
  );
  const { menuItems } = useTypedSelector((state) => state.repositories);

  const btnClasses = `button link ${btnIsHighlighted ? "bump" : ""}`;

  useEffect(() => {
    if (productsOrder.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [productsOrder]);

  return (
    <div className="cssmenu">
      <div className="link list__category separate">
        Cửa hàng
        <FontAwesomeIcon icon={faAngleDown} className="list__category__icon" />
        <ul className="select-input__list">
          {menuItems.map((el) => (
            <li className="select-input__item" key={el.menuItemId}>
              <Link
                to={`/menu-item/${el.menuItemId}`}
                className="select-input__link"
              >
                {el.name}
              </Link>
            </li>
          ))}
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

      {isLoggedIn && (
        <div className="link list__category separate">
          <FontAwesomeIcon
            icon={faUser}
            className="list__category__icon"
            style={{ marginRight: "8px" }}
          />
          {user.firstName}
          <ul className="select-input__list">
            <li className="select-input__item">
              <Link to="/category/giay-bong-da" className="select-input__link">
                Trang của tôi
              </Link>
            </li>
            <li className="select-input__item">
              <Link
                to="/category/quan-ao-bong-da"
                className="select-input__link"
              >
                Đổi mật khẩu
              </Link>
            </li>
            <li className="select-input__item">
              <button
                onClick={() => dispatch({ type: ActionType.LOGOUT })}
                className="select-input__link"
                style={{ padding: "2px 8px", cursor: "pointer" }}
              >
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      )}
      <Link
        to="/cart"
        className={btnClasses}
        onClick={() => {
          if (!isLoggedIn) {
            toast.warning("Vui lòng đăng nhập!");
          }
        }}
      >
        <span className="icon">
          <CartIcon />
        </span>
        <span className="badge">{productsOrder.length}</span>
      </Link>
    </div>
  );
};

export default HeaderOptions;
