import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.name} className="mb-4">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            {/* Display product details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
