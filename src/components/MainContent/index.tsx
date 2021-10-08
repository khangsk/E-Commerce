import { useEffect, useState } from "react";
import Category from "./Category";
import HomeFilter from "./HomeFilter";
import HomeProduct from "./HomeProduct";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./index.css";
import { getAllProducts } from "../../helper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  MenuItemType,
  ProductType,
} from "../../state/reducers/repositoriesReducer";
import { Helmet } from "react-helmet";
import { useHistory, useLocation, useParams } from "react-router-dom";

const MainContent: React.FC = () => {
  const menuItems = useTypedSelector((state) => state.repositories.menuItems);
  const [categoryChoice, setCategoryChoice] = useState("");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("new");
  const [menuItem, setMenuItem] = useState<MenuItemType>();
  const history = useHistory();
  const location = useLocation();

  const onChoseHandler = (e: string) => {
    setCategoryChoice(e);
  };

  const onChangeFilterHandler = (e: string) => {
    setFilter(e);
  };

  const menuItemID = useParams<{ menuItemID?: string }>()?.menuItemID;

  useEffect(() => {
    const temp = menuItems.find((el) => el.menuItemId === menuItemID);
    if (temp) {
      setMenuItem(temp);
    }
  }, [menuItemID, menuItems]);

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

  if (filter === "lowToHigh") {
    productsChoice.sort((a: ProductType, b: ProductType) =>
      a.Price > b.Price ? 1 : b.Price > a.Price ? -1 : 0
    );
  } else if (filter === "highToLow") {
    productsChoice.sort((a: ProductType, b: ProductType) =>
      a.Price > b.Price ? -1 : b.Price > a.Price ? 1 : 0
    );
  } else if (filter === "new") {
    productsChoice.sort((a: ProductType, b: ProductType) =>
      +a.ProductID > +b.ProductID ? -1 : +b.ProductID > +a.ProductID ? 1 : 0
    );
  } else {
    productsChoice.sort((a: ProductType, b: ProductType) =>
      a.Sold > b.Sold ? -1 : b.Sold > a.Sold ? 1 : 0
    );
  }

  const sizeProducts = productsChoice.length;

  useEffect(() => {
    window.scrollTo(0, 0);
    const query = new URLSearchParams(location.search);
    const pageNumber = parseInt(query.get("page") || "1", 10);
    if (
      menuItem &&
      getAllProducts(menuItem.categories).length < 15 * (pageNumber - 1)
    ) {
      setPage(1);
      history.replace(`${location.pathname}?page=1`);
    } else setPage(pageNumber);
  }, [page, location.search, menuItem, location.pathname, history]);

  return (
    <div className="app__container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{menuItem ? menuItem.name : "Sản phẩm"}</title>
      </Helmet>
      <div className="grid">
        {menuItem && (
          <div className="grid__row app-content">
            <Category
              categories={menuItem.categories}
              onChoseHandler={onChoseHandler}
            />
            <div className="grid__column-10">
              <HomeFilter
                filter={filter}
                onChangeFilterHandler={onChangeFilterHandler}
              />
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
                    onChange={(event, val) => {
                      history.push(`${location.pathname}?page=${val}`);
                      setPage(val);
                    }}
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
