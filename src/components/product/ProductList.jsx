import React from "react";
import ProductCard from "../home/ProductCard";

const ProductList = ({ products }) => {
  return (
    <div className="flex flex-wrap">
      {products.map((product) => (
        <div key={product.name} className="w-1/3">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
