import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HomeFilter: React.FC<{
  filter: string;
  onChangeFilterHandler: (x: string) => void;
}> = (props) => {
  return (
    <div className="home-filter">
      <span className="home-filter__label">Sắp xếp theo</span>
      {/* <button className="home-filter__btn btn btn--primary">Phổ biến</button> */}
      <button
        className={`home-filter__btn btn ${
          props.filter === "new" ? "btn--primary" : ""
        }`}
        onClick={() => props.onChangeFilterHandler("new")}
      >
        Mới nhất
      </button>
      <button
        className={`home-filter__btn btn ${
          props.filter === "bestSale" ? "btn--primary" : ""
        }`}
        onClick={() => props.onChangeFilterHandler("bestSale")}
      >
        Bán chạy
      </button>

      <div
        className={`select-input ${
          props.filter === "lowToHigh" || props.filter === "highToLow"
            ? "select-input--active"
            : ""
        }`}
      >
        <span className="select-input__label">
          {props.filter === "lowToHigh"
            ? "Giá: Thấp đến cao"
            : props.filter === "highToLow"
            ? "Giá: Cao đến thấp"
            : "Giá"}
        </span>

        <FontAwesomeIcon
          icon={faAngleDown}
          className={`select-input__icon ${
            props.filter === "lowToHigh" || props.filter === "highToLow"
              ? "select-input--active"
              : ""
          }`}
        />

        <ul className="select-input__list">
          <li className="select-input__item">
            <Link
              to="#"
              className={`select-input__link ${
                props.filter === "lowToHigh" ? "select-input__link--active" : ""
              }`}
              onClick={() => props.onChangeFilterHandler("lowToHigh")}
            >
              Giá: Thấp đến cao
            </Link>
          </li>
          <li className="select-input__item">
            <Link
              to="#"
              className={`select-input__link ${
                props.filter === "highToLow" ? "select-input__link--active" : ""
              }`}
              onClick={() => props.onChangeFilterHandler("highToLow")}
            >
              Giá: Cao đến thấp
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeFilter;
