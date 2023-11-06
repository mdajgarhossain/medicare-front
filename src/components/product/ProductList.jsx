import React from "react";
import ProductCard from "../home/ProductCard";

const ProductList = ({ products }) => {
  return (
    <div className="flex flex-wrap">
      {(products.length &&
        products.map((product) => (
          <div key={product.name} className="w-1/3">
            <ProductCard product={product} />
          </div>
        ))) || (
        <div className="h-40 flex items-center justify-center mx-auto">
          <p className="text-lg py-8 border border-gray-400 px-6">
            No products available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
