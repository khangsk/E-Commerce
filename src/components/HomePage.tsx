import Header from "./Layout/Header";
import styled from "styled-components";
import SwipeableTextMobileStepper from "./Carousel";
import MainContent from "./MainContent";
import RepositoriesList from "./RepositoriesList";

const HomePage: React.FC = () => {
  return (
    <>
      <SwipeableTextMobileStepper />
      <MainContent />

      {/* test API */}
      <RepositoriesList />
    </>
  );
};

export default HomePage;
