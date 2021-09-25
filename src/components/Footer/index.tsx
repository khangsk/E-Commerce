import "./index.css";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="grid">
        <div className="grid__row">
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Chăm sóc khách hàng</h3>
            <ul className="footer-list">
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Trung Tâm Trợ Giúp
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  T-Fooball Blog
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  T-Fooball Mall
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Hướng Dẫn Mua Hàng
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Hướng Dẫn Bán Hàng
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Thanh Toán
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  {" "}
                  Vận Chuyển{" "}
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Trả Hàng & Hoàn Tiền
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Chăm Sóc Khách Hàng
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Chính Sách Bảo Hành
                </a>
              </li>
            </ul>
          </div>
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Về T-Fooball</h3>
            <ul className="footer-list">
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Giới Thiệu Về T-Fooball
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Tuyển Dụng
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Điều Khoản T-Fooball
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Chính Sách Bảo Mật
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Chính Hãng
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Kênh Người Bán
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Flash Sales
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Chương Trình Tiếp Thị Liên Kết T-Fooball
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  Liên Hệ Với Truyền Thông
                </a>
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
                <a href="#" className="footer-item__link">
                  <i className="footer-item__icon fab fa-facebook"></i>
                  Facebook
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  <i className="footer-item__icon fab fa-instagram"></i>
                  Instagram
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  <i className="footer-item__icon fab fa-linkedin"></i>
                  LinkedIn
                </a>
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
