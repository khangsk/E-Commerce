import { useEffect, useState } from "react";
import Category from "./Category";
import HomeFilter from "./HomeFilter";
import HomeProduct from "./HomeProduct";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useParams } from "react-router-dom";
import "./index.css";
import { getAllProducts } from "../../helper";

const MainContent: React.FC = () => {
  const { menuItems } = useTypedSelector((state) => state.repositories);
  const [categoryChoice, setCategoryChoice] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChoseHandler = (e: string) => {
    setCategoryChoice(e);
  };

  const menuItemID = useParams<{ menuItemID?: string }>()?.menuItemID;

  const menuItem = menuItems.find((el) => el.menuItemId === menuItemID);

  let productsChoice;
  if (menuItem) {
    productsChoice = getAllProducts(menuItem.categories);
  }

  if (categoryChoice) {
    const category = menuItem?.categories.find(
      (el) => el.categoryId === categoryChoice
    );

    if (category && category.products) productsChoice = category?.products;
  }

  return (
    <div className="app__container">
      <div className="grid">
        {menuItem && (
          <div className="grid__row app-content">
            <Category
              categories={menuItem.categories}
              onChoseHandler={onChoseHandler}
            />
            <div className="grid__column-10">
              <HomeFilter />
              <div className="home-product">
                <div className="grid__row">
                  {productsChoice &&
                    productsChoice.map((item) => (
                      <HomeProduct key={item.ProductID} data={item} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
