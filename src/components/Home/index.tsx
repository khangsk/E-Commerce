import { useEffect } from "react";
import styled from "styled-components";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import MainContent from "../MainContent";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Product from "./Product";

const HomePage: React.FC = () => {
  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const DUMMY_DATA = [
    {
      productName: "Giày bóng đá",
      items: data,
    },
    {
      productName: "Phụ kiện",
      items: data,
    },
  ];

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
