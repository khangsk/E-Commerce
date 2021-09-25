import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import SignIn from "./components/Utils/SignIn";
import SignUp from "./components/Utils/SignUp";
import styled from "styled-components";
import Home from "./components/Home";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import ProductDetail from "./components/ProductDetail";
import UploadImage from "./UploadImage";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { User } from "./firebase";
import jwt_decode from "jwt-decode";
import { ActionType } from "./state/action-types";
import { UserType } from "./state/reducers/repositoriesReducer";
import Loading from "./components/Utils/Loading";

const Layout = styled.div`
  width: 1200px;
  max-width: 100%;
  margin: 66px auto;
`;

function App() {
  const { isLoggedIn } = useTypedSelector((state) => state.repositories);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
        <Route path="/category/:categoryName" component={MainContent} />
        <Route path="/product-detail/:id" component={ProductDetail} />
        <Route path="/checkout" component={UploadImage} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Layout>
    </>
  );
}

export default App;
