import styled from "styled-components";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import MainContent from "../MainContent";
import RepositoriesList from "../RepositoriesList";
import Product from "./Product";

const DUMMY_DATA = [
  {
    productName: "Giày bóng đá",
    items: [1, 2, 3, 4, 5],
  },
  {
    productName: "Phụ kiện",
    items: [1, 2, 3],
  },
];

const HomePage: React.FC = () => {
  return (
    <>
      <SwipeableTextMobileStepper />
      {DUMMY_DATA.map((product) => (
        <Product name={product.productName} items={product.items} />
      ))}
    </>
  );
};

export default HomePage;
