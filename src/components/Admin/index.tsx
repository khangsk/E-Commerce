import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useLocation } from "react-router-dom";
import ManageAccount from "./ManageAccount";
import ManageOrder from "./ManageOrder";
import ManageProduct from "./ManageProduct";

const Admin: React.FC = () => {
  const { isLoggedIn, user } = useTypedSelector((state) => state.repositories);
  const location = useLocation();
  const [categoryActive, setCategoryActive] = useState("account");

  useEffect(() => {
    setCategoryActive(
      location.pathname.match("account")
        ? "account"
        : location.pathname.match("order")
        ? "order"
        : "product"
    );
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin</title>
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
                <span style={{ fontWeight: "bold" }}>{user.firstName}</span>
              </div>
              <ul className="category-list">
                <li key={"account"} className="category-item">
                  <Link
                    to="/admin/account"
                    className={`category-item__link ${
                      categoryActive === "account"
                        ? "category-item--active"
                        : ""
                    }`}
                    onClick={() => {
                      setCategoryActive("account");
                    }}
                  >
                    Quản lý tài khoản
                  </Link>
                </li>
                <li key={"order"} className="category-item">
                  <Link
                    to="/admin/order"
                    className={`category-item__link ${
                      categoryActive === "order" ? "category-item--active" : ""
                    }`}
                    onClick={() => {
                      setCategoryActive("order");
                    }}
                  >
                    Quản lý đơn hàng
                  </Link>
                </li>
                <li key={"product"} className="category-item">
                  <Link
                    to="/admin/product"
                    className={`category-item__link ${
                      categoryActive === "product"
                        ? "category-item--active"
                        : ""
                    }`}
                    onClick={() => {
                      setCategoryActive("product");
                    }}
                  >
                    Quản lý sản phẩm
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="grid__column-10">
              <div className="home-product">
                <div className="grid__row" style={{ marginLeft: "8px" }}>
                  {isLoggedIn &&
                    location.pathname === "/admin/account" &&
                    user && <ManageAccount />}
                  {isLoggedIn &&
                    location.pathname === "/admin/order" &&
                    user && <ManageOrder />}
                  {isLoggedIn &&
                    location.pathname === "/admin/product" &&
                    user && <ManageProduct />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
