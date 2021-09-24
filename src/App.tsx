import React from "react";
import { Route, Redirect } from "react-router-dom";
import SignIn from "./components/Utils/SignIn";
import SignUp from "./components/Utils/SignUp";
import styled from "styled-components";
import Home from "./components/Home";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import ProductDetail from "./components/ProductDetail";
import UploadImage from "./UploadImage";

const Layout = styled.div`
  width: 1200px;
  max-width: 100%;
  margin: 66px auto;
`;

function App() {
  return (
    <>
      <Layout>
        <Header />
        <Route path="/home" exact>
          <Redirect to="/" />
        </Route>

        <Route path="/" exact component={Home} />
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={SignIn} />
        <Route path="/category/:categoryName" component={MainContent} />
        <Route path="/product-detail/:id" component={ProductDetail} />
        <Route path="/checkout" component={UploadImage} />
      </Layout>
    </>
  );
}

export default App;
