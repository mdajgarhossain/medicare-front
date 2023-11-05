import CategoryList from "@/components/product/CategoryList";
import ProductList from "@/components/product/ProductList";
import { medicareApi } from "@/utils/http";
import React, { useEffect, useState } from "react";

function Products() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategory();
    fetchProducts();
  }, []);

  /**
   * Retrieve categories.
   */
  function getCategory() {
    medicareApi
      .get("/category", {
        params: {
          limit: 60,
        },
      })
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {});
  }

  /** Fetch products from api */
  const fetchProducts = (categoryId, type) => {
    let params = {
      limit: 100,
      include:
        "product.stocks,product.attachments,product.category,product.subcategory",
    };
    if (type === "category") params.categoryId = categoryId;
    if (type === "subcategory") params.subcategoryId = categoryId;

    medicareApi
      .get(`/product`, {
        params: params,
      })
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        // Handle errors
      });
  };

  console.log({ selectedCategory });

  const handleCategoryClick = (category, type) => {
    setSelectedCategory(category);
    fetchProducts(category?.id, type);
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-3 lg:pb-10">
      <h2 className="headline text-[#5f27cd] py-2">Product</h2>
      <div className="container mx-auto mt-2 p-2 flex">
        <div className="w-1/4 pr-2">
          <CategoryList
            categories={categories}
            onCategoryClick={handleCategoryClick}
          />
        </div>
        <div className="w-2/3 pl-2">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}

export default Products;
