import { useEffect, useState } from "react";
import Category from "./Category";
import HomeFilter from "./HomeFilter";
import HomeProduct from "./HomeProduct";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useParams } from "react-router-dom";
import "./index.css";
import { getAllProducts } from "../../helper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ProductType } from "../../state/reducers/repositoriesReducer";

const MainContent: React.FC = () => {
  const { menuItems } = useTypedSelector((state) => state.repositories);
  const [categoryChoice, setCategoryChoice] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const onChoseHandler = (e: string) => {
    setCategoryChoice(e);
  };

  const menuItemID = useParams<{ menuItemID?: string }>()?.menuItemID;

  const menuItem = menuItems.find((el) => el.menuItemId === menuItemID);

  let productsChoice: ProductType[] = [];
  if (menuItem) {
    productsChoice = getAllProducts(menuItem.categories);
  }

  if (categoryChoice) {
    const category = menuItem?.categories.find(
      (el) => el.categoryId === categoryChoice
    );

    if (category && category.products) productsChoice = category?.products;
  }

  const sizeProducts = productsChoice.length;

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
                    productsChoice
                      .slice(15 * (page - 1), 15 * page)
                      .map((item) => (
                        <HomeProduct key={item.ProductID} data={item} />
                      ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "2.5rem",
                }}
              >
                <Stack spacing={2}>
                  <Pagination
                    count={Math.floor(sizeProducts / 15) + 1}
                    page={page}
                    color="secondary"
                    onChange={(event, val) => setPage(val)}
                  />
                </Stack>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
