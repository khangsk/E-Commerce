import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="header-top">
      <div className="wrap">
        <div className="logo">
          <Link to="/index">
            <img src="asset/images/logo.png" alt="" />
          </Link>
        </div>
        <div className="cssmenu">
          <ul>
            <li className="active">
              <Link to="/register">Đăng ký</Link>
            </li>
            <li>
              <Link to="/shop">Store Locator</Link>
            </li>
            <li>
              <Link to="/login">Tài khoản của tôi</Link>
            </li>
            <li>
              <Link to="/checkout">Thanh toán</Link>
            </li>
          </ul>
        </div>
        <ul className="icon2 sub-icon2 profile_img">
          <li>
            <Link className="active-icon c2" to="1">
              {" "}
            </Link>
            <ul className="sub-icon2 list">
              <li>
                <h3>Products</h3>
                <Link to="/"></Link>
              </li>
              <li>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer{" "}
                  <Link to="/">adipiscing elit, sed diam</Link>
                </p>
              </li>
            </ul>
          </li>
        </ul>
        <div className="clear"></div>
      </div>
    </div>
  );
};

export default Header;
