import React from "react";
import { Route, Redirect } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import styled from "styled-components";
import HomePage from "./components/HomePage";
import Header from "./components/Layout/Header";

const Layout = styled.div`
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
`;

function App() {
  return (
    <>
      <Layout>
        <Header />
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={HomePage} />
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={SignIn} />
      </Layout>
    </>
  );
}

export default App;
