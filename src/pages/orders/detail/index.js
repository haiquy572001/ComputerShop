import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { CartService } from "../../../services/cart.service";
import moment from "moment";
import { formatMoney } from "../../../utils/format";
import { BASEURL } from "../../..";

const DetailOrder = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const keys = queryClient.getQueryData("keys");

  const key = `/orders/${id}`;
  const { data: productDetail, error } = useQuery(
    key,
    () => CartService.getOrderDetail(id),
    {
      enabled: !!id,
      cacheTime: 0,
      onSuccess: (res) => {
        console.log(res.data);
      },
    }
  );

  return (
    <main>
      <div className="product_orders">
        <div className="products_cart">
          {productDetail?.data?.list_product?.map((item, index) => (
            <button
              key={item.product.id}
              className="product"
              onClick={() =>
                navigate(
                  `/products/${item.product.product_type}/${item.product.id}`
                )
              }
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
              </div>
            </button>
          ))}
        </div>
        <div className="box" style={{ height: 300 }}>
          {productDetail && (
            <table>
              {Object.entries({
                name_customer: productDetail.data.name_customer,
                delivery_address: productDetail.data.delivery_address,
                order_date: moment(productDetail.data.order_date).format(
                  "DD-MM-YYYY"
                ),
                payment: productDetail.data.payment,
                total_prices: formatMoney(productDetail.data.total_prices),
              }).map(([key, val]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <th>{val}</th>
                </tr>
              ))}
            </table>
          )}
        </div>
      </div>

      {error && <p style={{ textAlign: "center" }}>{error.message}</p>}
    </main>
  );
};

export default DetailOrder;
