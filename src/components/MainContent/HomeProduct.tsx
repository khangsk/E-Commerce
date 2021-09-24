import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ProductType } from "../../state/reducers/repositoriesReducer";
import { FormatAmount } from "../../helper";

const HomeProduct: React.FC<{ data: ProductType }> = (props) => {
  const {
    ProductID,
    CategoryID,
    Name,
    Price,
    Discount,
    Description,
    image,
    isDeleted,
  } = props.data;
  return (
    <div className="grid__column-2-4">
      <Link to={`/product-detail/${ProductID}`} className="home-product-item">
        <div
          className="home-product-item__img"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        <h4 className="home-product-item__name">{Name}</h4>
        <div className="home-product-item__price">
          <span className="home-product-item__price-old">
            {FormatAmount(Price)}
          </span>
          <span className="home-product-item__price-current">
            {FormatAmount(Price * (1 - Discount))}
          </span>
        </div>
        <div className="home-product-item__action">
          <span
            className="
                            home-product-item__like
                            home-product-item__like--liked
                          "
          >
            <FontAwesomeIcon
              icon={faHeart}
              className="home-product-item__like-icon-fill"
            />
          </span>
          <div className="home-product-item__rating">
            <FontAwesomeIcon
              icon={faStar}
              className="home-product-item__star--gold"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="home-product-item__star--gold"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="home-product-item__star--gold"
            />
            <FontAwesomeIcon
              icon={faStar}
              className="home-product-item__star--gold"
            />
            <FontAwesomeIcon icon={faStar} style={{ color: "#ccc" }} />
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
          <span className="home-product-item__sale-off-percent">
            {Discount * 100}%
          </span>
          <span className="home-product-item__sale-off-label">GIẢM</span>
        </div>
      </Link>
    </div>
  );
};

export default HomeProduct;
