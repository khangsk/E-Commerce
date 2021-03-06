import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ProductType } from "../../state/reducers/repositoriesReducer";
import { FormatAmount } from "../../helper";

const HomeProduct: React.FC<{ data: ProductType }> = (props) => {
  const {
    ProductID,
    Name,
    Price,
    Discount,
    image,
    Producer,
    Source,
    Star,
    Sold,
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
            {Discount !== 0 ? FormatAmount(Price) : ""}
          </span>
          <span className="home-product-item__price-current">
            {FormatAmount(Price * (1 - Discount))}
          </span>
        </div>
        <div className="home-product-item__action">
          {Star > 4 && (
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
          )}
          <div className="home-product-item__rating">
            {Array.from({ length: Star }, (_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className="home-product-item__star--gold"
              />
            ))}
            {Array.from({ length: 5 - Star }, (_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                style={{ color: "#ccc" }}
              />
            ))}
          </div>
          <span style={{ fontSize: "0.8rem", marginLeft: "8px" }}>
            ???? b??n {Sold}
          </span>
        </div>

        <div className="home-product-item__origin">
          <span className="home-product-item__brand"> {Producer} </span>
          <span className="home-product-item__origin-name">{Source}</span>
        </div>

        {Star > 4 && (
          <div className="home-product-item__favorite">
            <FontAwesomeIcon
              icon={faCheck}
              className="home-product-item__favorite_icon"
            />
            <span>Y??u th??ch</span>
          </div>
        )}

        {Discount !== 0 && (
          <div className="home-product-item__sale-off">
            <span className="home-product-item__sale-off-percent">
              {Discount * 100}%
            </span>
            <span className="home-product-item__sale-off-label">GI???M</span>
          </div>
        )}
      </Link>
    </div>
  );
};

export default HomeProduct;
