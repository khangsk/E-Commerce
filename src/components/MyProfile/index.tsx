import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useLocation } from "react-router-dom";
import MyPurchase from "./MyPurchase";
import MyAccount from "./MyAccount";
import MyOrderWaiting from "./MyOrderWaiting";
import MyNewPassword from "./MyNewPassword";

const MyProfile: React.FC = () => {
  const user = useTypedSelector((state) => state.repositories.user);
  const isLoggedIn = useTypedSelector((state) => state.repositories.isLoggedIn);
  const location = useLocation();
  const [categoryActive, setCategoryActive] = useState("account");

  useEffect(() => {
    setCategoryActive(
      location.pathname.match("account")
        ? "account"
        : location.pathname.match("purchase")
        ? "purchase"
        : location.pathname.match("password")
        ? "newPassword"
        : "waiting"
    );
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Trang của tôi</title>
      </Helmet>
      <div className="app__container" style={{ minHeight: "79vh" }}>
        <div className="grid">
          <div className="grid__row app-content">
            <nav className="grid__column-2 category">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt={user.firstName}
                  src={user.avatar}
                  style={{ margin: "16px" }}
                />
                <div>
                  <span style={{ fontWeight: "bold" }}>{user.firstName}</span>
                  <div
                    style={{
                      color: "#ccc",
                      fontSize: "0.8rem",
                    }}
                    onClick={() => {
                      setCategoryActive("account");
                    }}
                  >
                    <FontAwesomeIcon icon={faUserEdit} />
                    <Link
                      to="/my/account"
                      className="link"
                      style={{
                        marginLeft: "4px",
                        color: "var(--text-color)",
                      }}
                    >
                      Chỉnh sửa
                    </Link>
                  </div>
                </div>
              </div>
              <ul className="category-list">
                <li key={"account"} className="category-item">
                  <Link
                    to="/my/account"
                    className={`category-item__link ${
                      categoryActive === "account"
                        ? "category-item--active"
                        : ""
                    }`}
                    onClick={() => {
                      setCategoryActive("account");
                    }}
                  >
                    Tài khoản của tôi
                  </Link>
                </li>
                <li key={"newPassword"} className="category-item">
                  <Link
                    to="/my/new-password"
                    className={`category-item__link ${
                      categoryActive === "newPassword"
                        ? "category-item--active"
                        : ""
                    }`}
                    onClick={() => {
                      setCategoryActive("newPassword");
                    }}
                  >
                    Đổi mật khẩu
                  </Link>
                </li>
                <li key={"order-waiting"} className="category-item">
                  <Link
                    to="/my/order-waiting"
                    className={`category-item__link ${
                      categoryActive === "waiting"
                        ? "category-item--active"
                        : ""
                    }`}
                    onClick={() => {
                      setCategoryActive("waiting");
                    }}
                  >
                    Chờ xác nhận
                  </Link>
                </li>
                <li key={"purchase"} className="category-item">
                  <Link
                    to="/my/purchase"
                    className={`category-item__link ${
                      categoryActive === "purchase"
                        ? "category-item--active"
                        : ""
                    }`}
                    onClick={() => {
                      setCategoryActive("purchase");
                    }}
                  >
                    Lịch sử mua hàng
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="grid__column-10">
              <div className="home-product">
                <div className="grid__row" style={{ marginLeft: "8px" }}>
                  {isLoggedIn &&
                    location.pathname === "/my/account" &&
                    user && <MyAccount />}
                  {isLoggedIn &&
                    location.pathname === "/my/order-waiting" &&
                    user && <MyOrderWaiting />}
                  {isLoggedIn &&
                    location.pathname === "/my/purchase" &&
                    user && <MyPurchase />}
                  {isLoggedIn &&
                    location.pathname === "/my/new-password" &&
                    user && <MyNewPassword />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
