import React from "react";
import { BASEURL } from "..";
import { checkType } from "../utils/format";
import { formatMoney } from "../utils/format";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { CartService } from "../services/cart.service";
import { useMyContext } from "../context/store";
import { actionTypes } from "../context/reducers";

const ProductInfo = ({ product }) => {
  const [{ auth }, dispatch] = useMyContext();

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
      },
      onError: () => {
        toast.error("Error. Please try again.");
      },
    }
  );
  return (
    <div className="product_info">
      <div className="box">
        <img
          src={`${BASEURL}` + product.src_img}
          alt={`${BASEURL}` + product.src_img}
        />
        <table>
          {Object.entries({
            Available_Quantity: product.Available_Quantity,
            Origin: product.Origin,
            Warranty_Period: product.Warranty_Period,
            manufacturer: product.manufacturer,
          }).map(([key, val]) => (
            <tr key={key}>
              <th>{key}</th>
              <th>{val}</th>
            </tr>
          ))}
        </table>
      </div>

      <div className="box">
        <h3 className="mb-4">Thông số kỹ thuật</h3>

        <table>
          {Object.entries(checkType(product.product_type, product)).map(
            ([key, val]) => (
              <tr key={key}>
                <th>{key}</th>
                <th>{val}</th>
              </tr>
            )
          )}
        </table>
        <h2 className="card__price w-100 mt-3">
          {formatMoney(Number(product.price))}
        </h2>
        <div className="d-flex flex-row align-items-center justify-content-center">
          <button
            className="btn w-100"
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
      </div>
    </div>
  );
};

export default ProductInfo;
