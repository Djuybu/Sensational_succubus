import React from "react";

import "./App.css";
import HomePage from "./homepage/HomePage.tsx";
import Login from "./Login/Login.tsx";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

export const cookies = new Cookies();

function App() {
  return (
    <>
      <HomePage></HomePage>
    </>
  );
}

export default App;
