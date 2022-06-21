import { useState, useEffect, useMemo } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { CartService } from "../../services/cart.service";
import { useMyContext } from "../../context/store";
import { BASEURL } from "../..";
import { checkType, formatMoney, totalAmount } from "../../utils/format";
import { actionTypes } from "../../context/reducers";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [{ auth, cart }, dispatch] = useMyContext();
  const [carts, setCarts] = useState([]);

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const [isHovering, setIsHovering] = useState(false);
  const [hover_id, setHover_id] = useState("");
  const [delivery_address, setDelivery_address] = useState("");
  const { isFetching, error, isPreviousData } = useQuery({
    cacheTime: 0,
    queryKey: "carts",
    enabled: !!auth.token,
    // isPreviousData: false,
    queryFn: CartService.getList,
    onSuccess: (res) => {
      setCarts(res.data);
    },
  });

  const { data: orders, mutateAsync } = useMutation(
    "addOrder",
    CartService.addOrder,
    {
      onSuccess: (res) => {
        toast.success("Order added successfully");
        dispatch({
          type: actionTypes.REMOVE_ALL_CART,
        });
        navigate("/orders");
        // dispatch({
        //   type: actionTypes.ADD_TO_CART,
        //   payload: res.data.product,
        // });
        // localStorage.setItem("token", res.data.access);
        // localStorage.setItem("refresh_token", res.data.refresh);
      },
      onError: (res) => {
        toast.error("Order cannot added");
      },
    }
  );

  const updateCart = async (id) => {
    try {
      await CartService.addToCart(id);
    } catch (error) {}
  };
  const removeCart = async (id) => {
    try {
      const data = {
        product: id,
        number_product: 1,
      };
      await CartService.removeToCart(data);
    } catch (error) {}
  };

  const removeFromCart = async (id, count) => {
    try {
      const data = {
        product: id,
        number_product: count,
      };
      const res = await CartService.removeToCart(data);
      return res;
    } catch (error) {}
  };

  const handleChangeInput = async (e, index, id) => {
    const newCarts = [...carts];
    let count = newCarts[index].number_product;
    newCarts[index].number_product = Number(e.target.value);
    if (count < Number(e.target.value)) {
      await updateCart(id);
    } else if (count > Number(e.target.value)) {
      await removeCart(id);
    }
    setCarts(newCarts);
  };

  const handleChangeAddress = (e) => {
    setDelivery_address(e.target.value);
  };

  return (
    <main className="main_carts">
      <h3 className="mb-2">Shopping Cart</h3>

      <div className="cart">
        <div className="products_cart">
          {carts.map((item, index) => (
            <div
              key={item.product.id}
              className="product"
              onMouseOver={() => {
                setHover_id(index);
                setIsHovering(true);
              }}
              onMouseOut={() => {
                setHover_id("");
                setIsHovering(false);
              }}
            >
              <img
                src={`${BASEURL}` + item.product.src_img}
                alt={`${BASEURL}` + item.product.src_img}
              />

              <div className="product-info">
                <h3 className="product-name">
                  {
                    item.product.detail_infor[
                      `name_${item.product.product_type.toLowerCase()}`
                    ]
                  }
                </h3>
                <h4 className="product-price">
                  {formatMoney(
                    Number(item.product.price * item.number_product)
                  )}
                </h4>

                <p className="product-quantity">
                  Count:{" "}
                  <input
                    type="number"
                    min={1}
                    max={item.product.Available_Quantity}
                    value={item.number_product}
                    onChange={(e) => {
                      handleChangeInput(e, index, item.product.id);
                    }}
                    style={{ border: "1px solid black" }}
                  />
                </p>
              </div>
              {isHovering && hover_id === index && (
                <button
                  onClick={async () => {
                    const res = await removeFromCart(
                      item.product.id,
                      item.number_product
                    );
                    setCarts(res.data);
                    dispatch({
                      type: actionTypes.REMOVE_TO_CART,
                      payload: index,
                    });
                  }}
                  className="product-remove"
                >
                  <p className="mb-0">X</p>
                </button>
              )}
            </div>
          ))}
        </div>

        {carts.length > 0 && (
          <div className="cart-total">
            <div>
              <p>
                <span>Count:</span>
                <span>{carts.length}</span>
              </p>
              <p>
                <span className="product-price" style={{ fontSize: 25 }}>
                  Total Price:
                </span>

                <span className="product-price" style={{ fontSize: 25 }}>
                  {totalAmount(carts)}
                </span>
              </p>
              <div className="cart-delivery">
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                  }}
                >
                  Delivery Address:
                </span>
                <input
                  value={delivery_address}
                  onChange={handleChangeAddress}
                />
              </div>
            </div>

            <button
              disabled={delivery_address ? false : true}
              className="w-100"
              onClick={async () => {
                setShow(true);
                // if (auth.token) {
                //   await mutateAsync({
                //     delivery_address: delivery_address,
                //     payment: 1,
                //   });
                // }
              }}
            >
              Checkout
            </button>
          </div>
        )}
        {show && (
          <div id="myModal" className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Confirm</h2>
                <button
                  className="close"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <h5>Are you want to checkout order here?</h5>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  style={{ width: 120 }}
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  style={{ width: 120 }}
                  onClick={async () => {
                    setShow(false);
                    if (auth.token) {
                      await mutateAsync({
                        delivery_address: delivery_address,
                        payment: 1,
                      });
                    }
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
