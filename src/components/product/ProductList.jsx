import React from 'react';
import ProductCard from '../home/ProductCard';

const ProductList = ({ products }) => {
  return (
    // Previous codes
    // <div>
    //   {/* <h2 className="text-2xl font-bold mb-4">Products</h2> */}
    //   <ul>
    //     {products.map((product) => (
    //       <li key={product.name} className="mb-4">
    //         <ProductCard product={product}/>
    //         {/* <h3 className="text-xl font-semibold">{product.name}</h3> */}
    //         {/* Display product details here */}
    //       </li>
    //     ))}
    //   </ul>
    // </div>

    // Current codes
    <div className="flex flex-wrap">
      {products.map((product) => (
        <div key={product.name} className="w-1/3">
          <ProductCard product={product}/>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
