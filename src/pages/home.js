import { useState, useEffect, useMemo } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";

// import Pagination from "../components/Pagination";+
import Products from "../components/Products";
import { useMyContext } from "../context/store";
import { ProductService } from "../services/product.service";
import { AuthService } from "../services/auth.service";

import { actionTypes } from "../context/reducers";

import Profile from "../pages/profile";
import { CartService } from "../services/cart.service";

const Home = ({ open, setOpen }) => {
  const [{ auth }, dispatch] = useMyContext();
  const [type, setType] = useState("All");
  const [products, setProducts] = useState([]);
  const queryClient = useQueryClient();

  const keys = queryClient.getQueryData("keys");

  const key = [type];
  const key2 = "getInfo";
  const key3 = "typeProduct";
  const key4 = "getCart";
  queryClient.setQueryData("keys", { k1: key, k2: key2, k3: key3, k4: key4 });

  const { data: info } = useQuery(key2, AuthService.getInfo, {
    // cacheTime: 0,
    enabled: !!auth.token,
    isPreviousData: false,
    onSuccess: (res) => {
      dispatch({
        type: actionTypes.SET_PROFILE,
        payload: res.data,
      });
    },
  });

  const { data: dataType } = useQuery(key3, ProductService.getType, {
    isPreviousData: false,
  });

  const { isFetching, error, isPreviousData } = useQuery({
    cacheTime: 0,
    queryKey: key,
    // isPreviousData: false,
    enabled: !!type,
    queryFn: () => ProductService.getList(type),
    onSuccess: (res) => {
      setProducts(res.data);
    },
  });

  const { data: carts } = useQuery({
    cacheTime: 0,
    queryKey: key4,
    // isPreviousData: false,
    enabled: !!auth.token,
    queryFn: CartService.getList,
    onSuccess: (res) => {
      dispatch({
        type: actionTypes.GET_LIST_CART,
        payload: res.data,
      });
      // setProducts(res.data);
    },
  });

  return (
    <main className="main-home">
      <div className="card-menu my-2">
        <div className="card bg-white">
          <div className="flex flex-center-hor">
            <div className="h3 heading m-b-20">Computer Accessories</div>
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            <button
              className="mr-5 mt-3"
              style={{ outline: "none" }}
              onClick={() => {
                setType("All");
              }}
            >
              <div
                className="category_image"
                style={{ borderColor: type === "All" ? "red" : "#e1e4e6" }}
              >
                <i className="fa fa-id-card mr-0" style={{ fontSize: 40 }}></i>
              </div>
              <strong style={{ color: type === "All" ? "red" : "black" }}>
                All
              </strong>
            </button>
            {dataType?.data.map((x) => (
              <button
                key={x}
                className="mr-5 mt-3"
                style={{ outline: "none" }}
                onClick={() => {
                  setType(x);
                }}
              >
                <div
                  className="category_image"
                  style={{ borderColor: type === x ? "red" : "#e1e4e6" }}
                >
                  <i
                    className="fa fa-id-card mr-0"
                    style={{ fontSize: 40 }}
                  ></i>
                </div>
                <strong style={{ color: type === x ? "red" : "black" }}>
                  {x}
                </strong>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="products">
        {products.length > 0 ? (
          <Products products={products} />
        ) : (
          <div style={{ fontSize: 20, fontWeight: "bold" }}>No products</div>
        )}
      </div>

      {isPreviousData && isFetching && (
        <p style={{ textAlign: "center" }}>Loading...</p>
      )}

      {error && (
        <p style={{ textAlign: "center" }}>
          {error.response.data.error.message
            ? error.response.data.error.message
            : error.message}
        </p>
      )}
      {open && <Profile open={open} setOpen={setOpen} />}
      {/* <Pagination totalPages={totalPages} /> */}
    </main>
  );
};

export default Home;
