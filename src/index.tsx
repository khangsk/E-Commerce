import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./asset/css/etalage.css";
import "./asset/css/form.css";
import "./asset/css/megamenu.css";
import "./asset/css/style.css";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
