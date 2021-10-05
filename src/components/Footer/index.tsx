import { Link } from "react-router-dom";
import "./index.css";
import { toast } from "react-toastify";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="grid">
        <div className="grid__row">
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Chăm sóc khách hàng</h3>
            <ul className="footer-list">
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Trung Tâm Trợ Giúp
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  E-Football Blog
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  E-Football Mall
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Hướng Dẫn Mua Hàng
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Hướng Dẫn Bán Hàng
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Thanh Toán
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  {" "}
                  Vận Chuyển{" "}
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Trả Hàng & Hoàn Tiền
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Chăm Sóc Khách Hàng
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Chính Sách Bảo Hành
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Về E-Football</h3>
            <ul className="footer-list">
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Giới Thiệu Về E-Football
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Tuyển Dụng
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Điều Khoản E-Football
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Chính Sách Bảo Mật
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Chính Hãng
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Kênh Người Bán
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Flash Sales
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Chương Trình Tiếp Thị Liên Kết E-Football
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  Liên Hệ Với Truyền Thông
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Thanh toán</h3>
            <ul className="footer__payment">
              <li className="footer__payment-item">
                <div className="footer__background footer__payment-visa"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__background footer__payment-mastercard"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__background footer__payment-jcb"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__background footer__payment-amex"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__background footer__payment-cod"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__background footer__payment-installment"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__background footer__payment-shopeepay"></div>
              </li>
            </ul>
          </div>
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Theo dõi chúng tôi trên</h3>
            <ul className="footer-list">
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  <i className="footer-item__icon fab fa-facebook"></i>
                  Facebook
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  <i className="footer-item__icon fab fa-instagram"></i>
                  Instagram
                </Link>
              </li>
              <li className="footer-item">
                <Link
                  to="#"
                  onClick={() => toast.warning("Chức năng đang được cập nhật!")}
                  className="footer-item__link"
                >
                  <i className="footer-item__icon fab fa-linkedin"></i>
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Đơn vị vận chuyển</h3>
            <ul className="footer__payment">
              <li className="footer__payment-item">
                <div className="footer__background footer__deliver-shopeeexpress"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__background footer__deliver-ghtk"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__background footer__deliver-ghn"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__background footer__deliver-viettelpost"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__background footer__deliver-vnpost"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__background footer__deliver-jnt"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__background footer__deliver-grabexpress"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__background footer__deliver-nowship"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__background footer__deliver-ninja"></div>
              </li>
              <li className="footer__payment-item">
                <div className="footer__background footer__deliver-bestexpress"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="grid">
          <p className="footer__text">
            © 2021 E-Football. Tất cả các quyền được bảo lưu
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
