import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { CategoryType } from "../../state/reducers/repositoriesReducer";
import { Link } from "react-router-dom";

const Category: React.FC<{
  categories: CategoryType[];
  onChoseHandler: (x: string) => void;
}> = (props) => {
  return (
    <nav className="grid__column-2 category">
      <h3 className="category__heading">
        <FontAwesomeIcon icon={faListUl} className="category__heading-icon" />
        Danh mục
      </h3>

      <ul className="category-list">
        {props.categories.map((category) => (
          <li key={category.categoryId} className="category-item">
            <Link
              to={`#`}
              className="category-item__link"
              onClick={() => props.onChoseHandler(category.categoryId)}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Category;
