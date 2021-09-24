import HomeProduct from "../MainContent/HomeProduct";
import { Link } from "react-router-dom";
import { ProductType } from "../../state/reducers/repositoriesReducer";

const Product: React.FC<{ name: string; items: ProductType[] }> = ({
  name,
  items,
}) => {
  return (
    <>
      <div className="home-filter">
        <Link
          to="/category/giay-bong-da"
          className="home-filter__btn btn btn--primary"
        >
          {name}
        </Link>
      </div>
      <div className="home-product">
        <div className="grid__row">
          {items.map((item) => (
            <HomeProduct data={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
