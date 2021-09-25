import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HomeFilter: React.FC = () => {
  return (
    <div className="home-filter">
      <span className="home-filter__label">Sắp xếp theo</span>
      <button className="home-filter__btn btn btn--primary">Phổ biến</button>
      <button className="home-filter__btn btn">Mới nhất</button>
      <button className="home-filter__btn btn">Bán chạy</button>

      <div className="select-input">
        <span className="select-input__label">Giá</span>

        <FontAwesomeIcon icon={faAngleDown} className="select-input__icon" />

        <ul className="select-input__list">
          <li className="select-input__item">
            <Link to="#" className="select-input__link">
              Giá: Thấp đến cao
            </Link>
          </li>
          <li className="select-input__item">
            <Link to="#" className="select-input__link">
              Giá: Cao đến thấp
            </Link>
          </li>
        </ul>
      </div>

      <div className="home-filter__page">
        <span className="home-filter__page-num">
          <span className="home-filter__page-current">1</span>/14
        </span>

        <div className="home-filter__page-control">
          <Link
            to=""
            className="
          home-filter__page-btn home-filter__page-btn--disabled
        "
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="home-filter__page-icon"
            />
          </Link>
          <Link to="" className="home-filter__page-btn">
            <FontAwesomeIcon
              icon={faAngleRight}
              className="home-filter__page-icon"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeFilter;
