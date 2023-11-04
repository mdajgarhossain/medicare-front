import CategoryList from "@/components/product/CategoryList";
import ProductList from "@/components/product/ProductList";
import categories from "@/utils/categories";
import demoCategories from "@/utils/demoCategories";
import { medicareApi } from "@/utils/http";
import React, { useEffect, useState } from "react";

function Products() {
  // return (
  //   <div>Products</div>
  // )
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // console.log({ categories });

  // console.log({products});

  useEffect(() => {
    getCategory();
    fetchProducts()
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

  // useEffect(() => {
  //   if (selectedCategory.name === "E-sell") {
  //     setProducts([
  //       {
  //         id: 1,
  //         name: "Product 1",
  //         image: "images/new-products/product-1.jpeg",
  //         detailsLink: "/product/1", // Replace with actual product details link
  //       },
  //       {
  //         id: 2,
  //         name: "Product 2",
  //         image: "images/new-products/product-2.jpeg",
  //         detailsLink: "/product/2", // Replace with actual product details link
  //       },
  //       {
  //         id: 3,
  //         name: "Product 3",
  //         image: "images/new-products/product-3.jpeg",
  //         detailsLink: "/product/3", // Replace with actual product details link
  //       },
  //       {
  //         id: 4,
  //         name: "Product 4",
  //         image: "images/new-products/product-4.jpeg",
  //         detailsLink: "/product/3", // Replace with actual product details link
  //       },
  //       {
  //         id: 5,
  //         name: "Product 5",
  //         image: "images/new-products/product-5.jpeg",
  //         detailsLink: "/product/3", // Replace with actual product details link
  //       },
  //       {
  //         id: 6,
  //         name: "Product 6",
  //         image: "images/new-products/product-6.jpeg",
  //         detailsLink: "/product/3", // Replace with actual product details link
  //       },
  //     ]);
  //   }
  // }, [selectedCategory]);

  // console.log("selectedCategory", selectedCategory);

  /** Fetch products from api */
  const fetchProducts = (categoryId, type) => {
    let params = {
      limit: 100,
      include: "product.stocks,product.attachments,product.category",
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
    console.log("handleCategoryClick", category, type);
    setSelectedCategory(category);
    fetchProducts(category?.id, type);
    // Fetch products from your API based on the selected category/subcategory
    // Update the 'products' state with the fetched data
    // For now, you can use placeholder data
    // const placeholderProducts = [
    //   // { name: "Product 1" },
    //   // { name: "Product 2" },
    //   // { name: "Product 3" },

    //   {
    //     id: 7,
    //     name: "Product 7",
    //     image: "images/new-products/product-7.jpeg",
    //     detailsLink: "/product/3", // Replace with actual product details link
    //   },
    //   {
    //     id: 8,
    //     name: "Product 8",
    //     image: "images/new-products/product-8.jpeg",
    //     detailsLink: "/product/3", // Replace with actual product details link
    //   },
    //   {
    //     id: 9,
    //     name: "Product 9",
    //     image: "images/demo-product-images/demoImage.jpg",
    //     detailsLink: "/product/3", // Replace with actual product details link
    //   },
    //   {
    //     id: 10,
    //     name: "Product 10",
    //     image: "images/demo-product-images/demoImage.jpg",
    //     detailsLink: "/product/3", // Replace with actual product details link
    //   },
    // ];
    // setProducts(placeholderProducts);
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
