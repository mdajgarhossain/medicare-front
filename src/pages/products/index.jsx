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
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      image: "images/new-products/product-1.jpeg",
      detailsLink: "/product/1", // Replace with actual product details link
    },
    {
      id: 2,
      name: "Product 2",
      image: "images/new-products/product-2.jpeg",
      detailsLink: "/product/2", // Replace with actual product details link
    },
    {
      id: 3,
      name: "Product 3",
      image: "images/new-products/product-3.jpeg",
      detailsLink: "/product/3", // Replace with actual product details link
    },
    {
      id: 4,
      name: "Product 4",
      image: "images/new-products/product-4.jpeg",
      detailsLink: "/product/3", // Replace with actual product details link
    },
    {
      id: 5,
      name: "Product 5",
      image: "images/new-products/product-5.jpeg",
      detailsLink: "/product/3", // Replace with actual product details link
    },
    {
      id: 6,
      name: "Product 6",
      image: "images/new-products/product-6.jpeg",
      detailsLink: "/product/3", // Replace with actual product details link
    },
  ]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Fetch products from your API based on the selected category/subcategory
    // Update the 'products' state with the fetched data
    // For now, you can use placeholder data
    const placeholderProducts = [
      // { name: "Product 1" },
      // { name: "Product 2" },
      // { name: "Product 3" },

      
      {
        id: 7,
        name: "Product 7",
        image: "images/new-products/product-7.jpeg",
        detailsLink: "/product/3", // Replace with actual product details link
      },
      {
        id: 8,
        name: "Product 8",
        image: "images/new-products/product-8.jpeg",
        detailsLink: "/product/3", // Replace with actual product details link
      },
      {
        id: 9,
        name: "Product 9",
        image: "images/demo-product-images/demoImage.jpg",
        detailsLink: "/product/3", // Replace with actual product details link
      },
      {
        id: 10,
        name: "Product 10",
        image: "images/demo-product-images/demoImage.jpg",
        detailsLink: "/product/3", // Replace with actual product details link
      },
    ];
    setProducts(placeholderProducts);
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-3 lg:pb-10">
      <h2 className="headline text-[#5f27cd] py-2">Product</h2>
      <div className="container mx-auto mt-2 p-2 flex">
        <div className="w-1/4 pr-2">
          <CategoryList
            categories={demoCategories}
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
