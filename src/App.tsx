import React from "react";
import { Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Route path="/" component={Header} />
      <Route path="/register" component={SignUp} />
      <Route path="/login" component={SignIn} />
    </>
  );
}

export default App;
