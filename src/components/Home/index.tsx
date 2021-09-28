import { useEffect } from "react";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Product from "./Product";
import { getAllProducts } from "../../helper";
import { Helmet } from "react-helmet";

const HomePage: React.FC = () => {
  const menuItems = useTypedSelector((state) => state.repositories.menuItems);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>E-Football</title>
      </Helmet>
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
