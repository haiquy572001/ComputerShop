import React, { useLayoutEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { useMyContext } from "./context/store";
import Cart from "./pages/carts";
import Home from "./pages/home";
import Login from "./pages/login";
import Product from "./pages/products";
import Register from "./pages/register";

import { actionTypes } from "./context/reducers";
import DetailProduct from "./pages/products/detail";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Order from "./pages/orders";
import DetailOrder from "./pages/orders/detail";

const App = () => {
  const [{ auth, loading }, dispatch] = useMyContext();
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const setToken = async () => {
      const token = await localStorage.getItem("token");
      const refresh_token = await localStorage.getItem("refresh_token");
      if (token && refresh_token) {
        dispatch({
          type: actionTypes.SET_AUTH,
          payload: { access: token, refresh: refresh_token },
        });
      }
    };
    if (auth.token === "") {
      setToken();
    }
  }, [dispatch, auth]);

  return (
    <>
      {/* <input type="checkbox" id="theme" /> */}
      <Header open={open} setOpen={setOpen} />
      <Routes>
        <Route
          path="/"
          exact={true}
          element={<Home open={open} setOpen={setOpen} />}
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
        <Route path="/orders" element={<Order />} />
        <Route path="/orders/:id" element={<DetailOrder />} />

        <Route path="/products/:type/:id" element={<DetailProduct />} />
        {/* <Route path="/profile" chid={<Profile />} /> */}
        <Route path="/carts" element={<Cart />} />

        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
      {loading && <Loading />}

      {/* <Footer /> */}
    </>
  );
};

export default App;
