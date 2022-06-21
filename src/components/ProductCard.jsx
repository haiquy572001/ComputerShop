import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import useLazyLoadImg from "../hooks/useLazyLoadImg";
import { toast } from "react-toastify";
import { BASEURL } from "..";
import { formatMoney } from "../utils/format";
import { ModalShowLogin } from "./modal/ModalShowLogin";
import { useMyContext } from "../context/store";
import { CartService } from "../services/cart.service";
import { actionTypes } from "../context/reducers";

const ProductsCard = ({ product }) => {
  const { ref } = useLazyLoadImg();
  const [{ auth }, dispatch] = useMyContext();
  const [show, setShow] = useState(false);

  const { isError, error, mutateAsync } = useMutation(
    "addToCart",
    CartService.addToCart,
    {
      onSuccess: (res) => {
        toast.success("Add to cart successfully");
        dispatch({
          type: actionTypes.ADD_TO_CART,
          payload: res.data.product,
        });
        // localStorage.setItem("token", res.data.access);
        // localStorage.setItem("refresh_token", res.data.refresh);
      },
      onError: () => {
        toast.error("Error. Please try again.");
      },
    }
  );

  return (
    <div className="product-card">
      <div className="card-banner">
        <Link to={`/products/${product.product_type}/${product.id}`}>
          <img
            src={`${BASEURL}` + product.src_img}
            alt={`${BASEURL}` + product.src_img}
            width="312"
            height="350"
            loading="lazy"
            className="lazy-load image-contain"
            ref={ref}
          />
        </Link>
      </div>
      <div className="box">
        <div className="card__title__name">
          <Link to={`/products/${product.product_type}/${product.id}`}>
            {product.detail_infor[`name_${product.product_type.toLowerCase()}`]}
          </Link>
        </div>
        <div className="card__price">{formatMoney(Number(product.price))}</div>
        {product.Available_Quantity > 0 ? (
          <div className="card__price mt-2">
            Total: {product.Available_Quantity}
          </div>
        ) : (
          <div className="card__price mt-2">Out of stock</div>
        )}
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center">
        <button
          className="btn w-100 mb-2 mx-2"
          style={{ background: "#334d6e", color: "white" }}
          onClick={async () => {
            if (auth.token) {
              await mutateAsync(product.id);
            } else {
              toast.error("Please login here");
            }
          }}
        >
          Add to cart
        </button>
      </div>
      {/* {show && <ModalShowLogin />} */}
    </div>
  );
};

export default ProductsCard;
