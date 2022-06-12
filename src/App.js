import React, { useLayoutEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { useMyContext } from "./context/store";
import Cart from "./pages/cart";
import Home from "./pages/home";
import Login from "./pages/login";
import Product from "./pages/product";
import Register from "./pages/register";

import { actionTypes } from "./context/reducers";

const App = () => {
  const [{ auth }, dispatch] = useMyContext();

  useLayoutEffect(() => {
    const setToken = async () => {
      const token = await localStorage.getItem("token");
      const refresh_token = await localStorage.getItem("refresh_token");
      if (token && refresh_token) {
        dispatch({
          type: actionTypes.SET_AUTH,
          payload: { access_token: token, refresh_token: refresh_token },
        });
      }
    };
    if (auth.token === "") {
      setToken();
    }
  }, [dispatch, auth]);
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          exact={true}
          element={
            auth.token ? <Home /> : <Navigate to="/login" replace={true} />
          }
        />
        <Route
          path="/login"
          element={!auth.token ? <Login /> : <Navigate to="/" replace={true} />}
        />
        <Route
          path="/register"
          element={
            !auth.token ? <Register /> : <Navigate to="/" replace={true} />
          }
        />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
