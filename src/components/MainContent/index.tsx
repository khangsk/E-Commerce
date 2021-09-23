import Category from "./Category";
import HomeFilter from "./HomeFilter";
import HomeProduct from "./HomeProduct";

import "./index.css";

const MainContent: React.FC = () => {
  return (
    <div className="app__container">
      <div className="grid">
        <div className="grid__row app-content">
          <Category />
          <div className="grid__column-10">
            <HomeFilter />
            <HomeProduct />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
