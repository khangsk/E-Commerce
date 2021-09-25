import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import SignIn from "./components/Utils/SignIn";
import SignUp from "./components/Utils/SignUp";
import styled from "styled-components";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import ProductDetail from "./components/ProductDetail";
import UploadImage from "./UploadImage";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { User, Products, Categories, MenuItems } from "./firebase";
import jwt_decode from "jwt-decode";
import { ActionType } from "./state/action-types";
import {
  ProductType,
  UserType,
  CategoryType,
  MenuItemType,
} from "./state/reducers/repositoriesReducer";
import Loading from "./components/Utils/Loading";

const Layout = styled.div`
  width: 1200px;
  max-width: 100%;
  margin: 66px auto;
`;

const getProductsOfCategory = (products: ProductType[]) => {
  let result: { [key: string]: ProductType[] } = {};
  products.forEach((product) => {
    if (!result[product.CategoryID]) {
      result[product.CategoryID] = [product];
    } else {
      result[product.CategoryID].push(product);
    }
  });

  return result;
};

const getCategoriesOfMenuItem = (categories: CategoryType[]) => {
  let result: { [key: string]: CategoryType[] } = {};
  categories.forEach((category) => {
    if (!result[category.menuItemId]) {
      result[category.menuItemId] = [category];
    } else {
      result[category.menuItemId].push(category);
    }
  });

  return result;
};

function App() {
  const { isLoggedIn } = useTypedSelector((state) => state.repositories);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let products: ProductType[] = [];
      let categories: CategoryType[] = [];
      let menuItems: MenuItemType[] = [];

      const snapshotProducts = await Products.get();
      snapshotProducts.forEach((doc) => {
        products.push({
          ProductID: doc.id,
          CategoryID: doc.data().CategoryID,
          Name: doc.data().Name,
          Price: doc.data().Price,
          Discount: doc.data().Sale,
          Description: doc.data().Description,
          image: doc.data().Image,
        });
      });

      const listProductsOfCategory = getProductsOfCategory(products);

      const snapshotCategories = await Categories.get();
      snapshotCategories.forEach((doc) => {
        categories.push({
          categoryId: doc.id,
          menuItemId: doc.data().MenuItemID,
          name: doc.data().Name,
          isDeleted: doc.data().isDeleted,
          products: listProductsOfCategory[doc.id],
        });
      });

      const listCategoriesOfMenuItem = getCategoriesOfMenuItem(categories);

      const snapshotMenuItems = await MenuItems.get();
      snapshotMenuItems.forEach((doc) => {
        menuItems.push({
          menuItemId: doc.id,
          name: doc.data().Name,
          isDeleted: doc.data().isDeleted,
          categories: listCategoriesOfMenuItem[doc.id],
        });
      });

      console.log(products, menuItems, categories);

      dispatch({
        type: ActionType.LOAD_PRODUCT,
        payload: [products, categories, menuItems],
      });

      // const snapshotMenuItems = await MenuItems.get();
      // snapshotMenuItems.forEach((doc) => {
      //   menuItems.push({
      //     menuItemId: doc.data().name,
      //     name: doc.data().name,
      //     isDeleted: doc.data().isDeleted,
      //   });
      // });

      // const snapshot = await Products.get();
      // snapshot.forEach((doc) => {
      //   result[doc.data().name] = doc.data();
      //   console.log(doc.data(), doc.data().name);
    })();
  }, []);

  useEffect(() => {
    const getUserWhenReload = async (token: any) => {
      // const decoded = parseJwt(token);
      const decoded: any = jwt_decode(token);

      const snapshot = await User.where("email", "==", decoded.email).get();

      const user: UserType | any = {
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data(),
      };

      return user;
    };

    if (localStorage.getItem("token")) {
      setIsLoading(true);
      (async () => {
        const user = await getUserWhenReload(localStorage.getItem("token"));
        dispatch({ type: ActionType.LOAD_USER, payload: user });
        setIsLoading(false);
      })();
    }
  }, [setIsLoading, dispatch]);

  return (
    <>
      {isLoading && <Loading />}
      <Layout>
        <ToastContainer autoClose={3000} />
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/register">
          {!isLoggedIn && <SignUp />}
          {isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/login">
          {!isLoggedIn && <SignIn />}
          {isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path="/menu-item/:menuItemID" component={MainContent} />
        <Route path="/product-detail/:id" component={ProductDetail} />
        <Route path="/checkout" component={UploadImage} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
        <Footer />
      </Layout>
    </>
  );
}

export default App;
