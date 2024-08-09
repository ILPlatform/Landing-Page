import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Registrations from "./views/Registrations";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/registrations/:event" Component={Registrations} />
    </Routes>
  </BrowserRouter>,
);
