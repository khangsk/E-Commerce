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

const MyProfile: React.FC = () => {
  const { isLoggedIn, user } = useTypedSelector((state) => state.repositories);
  const location = useLocation();
  const [categoryActive, setCategoryActive] = useState(
    location.pathname.match("account") ? "account" : "purchase"
  );

  useEffect(() => {
    setCategoryActive(
      location.pathname.match("account") ? "account" : "purchase"
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
                    location.pathname === "/my/purchase" &&
                    user && <MyPurchase />}
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
