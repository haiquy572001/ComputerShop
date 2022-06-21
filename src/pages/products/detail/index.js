import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";

import ProductInfo from "../../../components/ProductInfo";
import { ProductService } from "../../../services/product.service";

const DetailProduct = () => {
  const { type, id } = useParams();

  const queryClient = useQueryClient();

  const keys = queryClient.getQueryData("keys");

  const key = `/products/${id}`;
  const { data: product, error } = useQuery(
    key,
    () => ProductService.detail(id),
    {
      enabled: !!id,
      cacheTime: 0,
    }
  );

  return (
    <main>
      {product && (
        <ProductInfo
          product={product.id !== undefined ? product : product.data}
        />
      )}
      {error && <p style={{ textAlign: "center" }}>{error.message}</p>}
    </main>
  );
};

export default DetailProduct;
