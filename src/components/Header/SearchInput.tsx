import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./index.css";
import { ProductType } from "../../state/reducers/repositoriesReducer";
import { useHistory, Link } from "react-router-dom";

const SearchInput: React.FC = () => {
  const products = useTypedSelector((state) => state.repositories.products);
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();

  const onSearchHandler = () => {
    history.push(`/search?keyword=${searchInput}`);
  };

  const [productsShow, setProductsShow] = useState<ProductType[]>([]);
  return (
    <>
      <div className="header-with-search">
        <div className="header__search">
          <div className="header__search-input-wrap">
            <input
              type="text"
              className="header__search-input"
              placeholder="Nhập để tìm kiếm sản phẩm"
              value={searchInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (searchInput) {
                    e.currentTarget.blur();
                    onSearchHandler();
                  }
                }
              }}
              onChange={(e) => {
                setSearchInput(e.target.value);
                if (e.target.value) {
                  setProductsShow(
                    products.filter((p) =>
                      p.Name?.toLowerCase().includes(
                        e.target.value.toLowerCase()
                      )
                    )
                  );
                } else {
                  setProductsShow([]);
                }
              }}
            />
            {productsShow.length > 0 && (
              <div className="header__search-history">
                <h3 className="header__search-history-heading">
                  Các sản phẩm tương ứng
                </h3>
                <ul className="header__search-history-list">
                  {(productsShow.length >= 5
                    ? productsShow.slice(0, 5)
                    : productsShow
                  ).map((el) => (
                    <li
                      className="header__search-history-item"
                      key={el.ProductID}
                    >
                      <Link
                        to={`/product-detail/${el.ProductID}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          src={el.image}
                          alt=""
                          width="30"
                          style={{ marginRight: "16px" }}
                        />
                        {el.Name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            className="header__search-btn"
            disabled={!searchInput}
            onClick={() => {
              if (searchInput) onSearchHandler();
            }}
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="header__search-btn-icon"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
