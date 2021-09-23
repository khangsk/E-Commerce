import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

const DUMMY_DATA = ["Giày bóng đá", "Quần áo bóng đá", "Phụ kiện"];

const Category: React.FC = () => {
  return (
    <nav className="category">
      <h3 className="category__heading">
        <FontAwesomeIcon icon={faListUl} className="category__heading-icon" />
        Danh mục
      </h3>

      <ul className="category-list">
        {/* <li className="category-item category-item--active">
          <a href="#" className="category-item__link">
            Laptop
          </a>
        </li> */}

        {DUMMY_DATA.map((category) => (
          <li key={category} className="category-item">
            <a href="#" className="category-item__link">
              {category}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Category;
