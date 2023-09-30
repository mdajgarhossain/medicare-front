import CategoryList from "@/components/product/CategoryList";
import ProductList from "@/components/product/ProductList";
import categories from "@/utils/categories";
import demoCategories from "@/utils/demoCategories";
import React, { useState } from "react";

function Products() {
  // return (
  //   <div>Products</div>
  // )
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Fetch products from your API based on the selected category/subcategory
    // Update the 'products' state with the fetched data
    // For now, you can use placeholder data
    const placeholderProducts = [
      { name: "Product 1" },
      { name: "Product 2" },
      { name: "Product 3" },
    ];
    setProducts(placeholderProducts);
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-3 lg:pb-10">
      <h2 className="headline text-[#5f27cd] py-2">Product</h2>
      <div className="container mx-auto mt-2 p-2">
        <CategoryList
          categories={demoCategories}
          onCategoryClick={handleCategoryClick}
        />
        <ProductList products={products} />
      </div>
    </div>
  );
}

export default Products;
