import { medicareApi } from "@/utils/http";
import React, { useState, useEffect } from "react";

const CategoryList = ({ categories, onCategoryClick }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  // console.log({ subcategories });

  /**
   * Retrieve sub categories.
   */
  function getSubCategory(category) {
    medicareApi
      .get(`/subcategory/by/${category.id}`, {
        params: {
          limit: 60,
        },
      })
      .then((response) => {
        setSubcategories(response.data.data);
        // setSubCategoryLoading(false);
      })
      .catch((error) => {
        // setSubCategoryLoading(false);
      });
  }

  useEffect(() => {
    if (hoveredCategory) {
      getSubCategory(hoveredCategory);
    }
  }, [hoveredCategory]);

  const handleCategoryClick = (category, type) => {
    // if (hoveredCategory === category) {
    //   // if(category.name === 'E-Sell') {
    //   //   setHoveredCategory(category);
    //   //   onCategoryClick(category);
    //   // }
    //   // Clicking the same category again, close it
    //   setHoveredCategory(null);
    //   setHoveredSubcategory(null);
    // } else {
    setHoveredCategory(category);
    setHoveredSubcategory(null);
    onCategoryClick(category, type);

    // Set subcategories empty for click category
    setSubcategories([]);
    // }
  };

  const handleCategoryMouseEnter = (category) => {
    setHoveredCategory(category);
    setHoveredSubcategory(null);
  };

  const handleSubcategoryClick = (subcategory, type) => {
    onCategoryClick(subcategory, type);
  };

  const handleSubcategoryMouseEnter = (subcategory) => {
    setHoveredSubcategory(subcategory);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
    setHoveredSubcategory(null);
    setSubcategories([]); // Clear subcategories when mouse leaves
  };

  return (
    <div className="flex" onMouseLeave={handleMouseLeave}>
      <div className="p-2 bg-white rounded border border-gray-300 w-72 h-[400px]">
        <ul>
          {categories.map((category, index) => (
            <li
              key={category.id}
              className={`cursor-pointer relative p-1 border-x-2 ${
                index === categories.length - 1
                  ? "border-t-2 border-b-2"
                  : "border-t-2"
              }`}
              onMouseEnter={() => handleCategoryMouseEnter(category)}
            >
              <div
                className={`${
                  hoveredCategory === category ||
                  (hoveredSubcategory &&
                    hoveredSubcategory.category === category)
                    ? "text-blue-600"
                    : ""
                }`}
                onClick={() => handleCategoryClick(category, "category")}
              >
                <span className="text-lg font-semibold">{category.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {subcategories.length > 0 && (
        <div
          className="p-2 bg-white rounded border border-gray-300 w-72 h-[400px]"
          style={{
            position: "absolute",
            zIndex: 1,
            top: "32%",
            left: "30%",
            marginTop: "0px",
          }}
        >
          <ul>
            {subcategories.map((subCategory, index) => (
              <li
                key={subCategory.id}
                className={`cursor-pointer relative p-1 border-x-2 ${
                  index === subcategories.length - 1
                    ? "border-t-2 border-b-2"
                    : "border-t-2"
                }`}
                onMouseEnter={() => handleSubcategoryMouseEnter(subCategory)}
              >
                <div
                  className={`${
                    hoveredSubcategory === subCategory ? "text-blue-600" : ""
                  }`}
                  onClick={() =>
                    handleSubcategoryClick(subCategory, "subcategory")
                  }
                >
                  <span className="text-lg font-semibold">
                    {subCategory.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
