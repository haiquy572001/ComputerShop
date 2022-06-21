import { useState, useEffect, useMemo } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { CartService } from "../../services/cart.service";
import { useMyContext } from "../../context/store";
import { BASEURL } from "../..";
import { checkType, formatMoney, totalAmount } from "../../utils/format";
import { useNavigate } from "react-router-dom";
// import { actionTypes } from "../../context/reducers";
import moment from "moment";

const Order = () => {
  const [{ auth }, dispatch] = useMyContext();
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const { isFetching, error, isPreviousData } = useQuery({
    cacheTime: 0,
    queryKey: "carts",
    enabled: !!auth.token,
    // isPreviousData: false,
    queryFn: CartService.getOrder,
    onSuccess: (res) => {
      setOrders(res.data);
    },
  });
  return (
    <main className="main_carts">
      <h3 className="mb-2">List Orders ({orders.length})</h3>

      <div className="cart">
        <div className="w-100">
          {orders.map((item, index) => (
            <button
              key={item.id}
              className="product"
              style={{
                height: "auto",
                alignItems: "flex-start",
              }}
              onClick={() => {
                navigate(`/orders/${item.id}`);
              }}
            >
              <div className="product-info">
                <h3 className="product-name">{item.payment}</h3>
                <h4 className="product-price">
                  {formatMoney(Number(item.total_prices))}
                </h4>
                <h3 className="product-name">
                  Create at: {moment(item.order_date).format("DD-MM-YYYY")}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Order;
