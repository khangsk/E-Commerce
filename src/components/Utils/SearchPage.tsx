import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./index.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ProductType } from "../../state/reducers/repositoriesReducer";
import { Helmet } from "react-helmet";
import HomeFilter from "../MainContent/HomeFilter";
import HomeProduct from "../MainContent/HomeProduct";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get("keyword") || "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = useTypedSelector((state) => state.repositories.products);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("new");
  const history = useHistory();

  const onChangeFilterHandler = (e: string) => {
    setFilter(e);
  };

  const productsChoice = products.filter((el) =>
    el.Name?.toLowerCase().includes(keyword)
  );

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
    if (sizeProducts < 15 * (pageNumber - 1)) {
      setPage(1);
      history.replace(`${location.pathname}?page=1`);
    } else setPage(pageNumber);
  }, [history, location, sizeProducts]);

  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "rgb(245, 251, 255)",
          padding: "32px",
          fontSize: "1.2rem",
        }}
      >
        <span>Kết quả cho từ khóa tìm kiếm: </span>
        <span style={{ fontWeight: "bold", color: "var(--primary-color)" }}>
          {keyword}
        </span>
      </div>
      {productsChoice.length > 0 ? (
        <div className="app__container">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Tìm kiếm</title>
          </Helmet>
          <div className="grid">
            <div className="grid__row app-content">
              <HomeFilter
                filter={filter}
                onChangeFilterHandler={onChangeFilterHandler}
              />
              <div className="home-product">
                <div className="grid__row">
                  {productsChoice
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
                  width: "100%",
                }}
              >
                <Stack spacing={2}>
                  <Pagination
                    count={Math.floor(sizeProducts / 15) + 1}
                    page={page}
                    color="secondary"
                    onChange={(event, val) => {
                      history.push(
                        `${location.pathname}?keyword=${keyword}&page=${val}`
                      );
                      setPage(val);
                    }}
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            backgroundColor: "var(--white-color)",
            padding: "12rem",
          }}
        >
          <p style={{ marginTop: 0, fontSize: "1.8rem" }}>
            Không tìm thấy kết quả nào
          </p>
          <span style={{ fontWeight: 300 }}>
            Hãy thử sử dụng các từ khóa chung chung hơn
          </span>
        </div>
      )}
    </>
  );
};

export default SearchPage;
