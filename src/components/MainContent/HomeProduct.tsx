import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HomeProduct: React.FC = () => {
  return (
    <div className="grid__column-2-4">
      <Link to="/product-detail/123" className="home-product-item">
        <div
          className="home-product-item__img"
          style={{
            backgroundImage:
              "url(https://cf.shopee.vn/file/42c51761d53b623a5bc6fcf8772d9e94)",
          }}
        ></div>
        <h4 className="home-product-item__name">
          Apple MacBook Pro (2020) M1 Chip, 13 inch, 8GB, 256GB SSD
        </h4>
        <div className="home-product-item__price">
          <span className="home-product-item__price-old">36.990.000đ</span>
          <span className="home-product-item__price-current">31.490.000đ</span>
        </div>
        <div className="home-product-item__action">
          <span
            className="
                            home-product-item__like
                            home-product-item__like--liked
                          "
          >
            <i
              className="
                              home-product-item__like-icon-empty
                              fal
                              fa-heart
                            "
            ></i>
            <i
              className="
                              home-product-item__like-icon-fill
                              fas
                              fa-heart
                            "
            ></i>
          </span>
          <div className="home-product-item__rating">
            <i className="home-product-item__star--gold fas fa-star"></i>
            <i className="home-product-item__star--gold fas fa-star"></i>
            <i className="home-product-item__star--gold fas fa-star"></i>
            <i className="home-product-item__star--gold fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
          <span className="home-product-item__sold">88 đã bán</span>
        </div>

        <div className="home-product-item__origin">
          <span className="home-product-item__brand"> Apple </span>
          <span className="home-product-item__origin-name">Mỹ</span>
        </div>

        <div className="home-product-item__favorite">
          <FontAwesomeIcon
            icon={faCheck}
            className="home-product-item__favorite_icon"
          />
          <span>Yêu thích</span>
        </div>

        <div className="home-product-item__sale-off">
          <span className="home-product-item__sale-off-percent">15%</span>
          <span className="home-product-item__sale-off-label">GIẢM</span>
        </div>
      </Link>
    </div>
  );
};

export default HomeProduct;
