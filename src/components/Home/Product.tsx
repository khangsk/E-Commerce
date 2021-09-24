import HomeProduct from "../MainContent/HomeProduct";
import { Link } from "react-router-dom";

const Product: React.FC<{ name: string; items: number[] }> = ({
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
            <HomeProduct />
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
