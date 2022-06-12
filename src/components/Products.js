import React from "react";
import ProductsCard from "./ProductCard";

const Products = React.memo(({ products }) => {
  return (
    <div className="products">
      {products.map((product) => (
        <ProductsCard key={product._id} product={product} />
      ))}
    </div>
  );
});

export default Products;
