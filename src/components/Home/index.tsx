import { useEffect } from "react";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Product from "./Product";
import { getAllProducts } from "../../helper";

const HomePage: React.FC = () => {
  const menuItems = useTypedSelector((state) => state.repositories.menuItems);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SwipeableTextMobileStepper />
      {menuItems &&
        menuItems.map((menuItem) => (
          <Product
            key={menuItem.menuItemId}
            name={menuItem.name}
            menuItemID={menuItem.menuItemId}
            items={getAllProducts(menuItem.categories).slice(0, 5)}
          />
        ))}
    </>
  );
};

export default HomePage;
