import React, { useState } from 'react';

const CategoryList = ({ categories, onCategoryClick }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);

  const handleCategoryClick = (category) => {
    if (hoveredCategory === category) {
      // Clicking the same category again, close it
      setHoveredCategory(null);
      setHoveredSubcategory(null);
    } else {
      setHoveredCategory(category);
      setHoveredSubcategory(null);
      onCategoryClick(category);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setHoveredSubcategory(null);
    onCategoryClick(subcategory);
  };

  const handleCategoryMouseEnter = (category) => {
    setHoveredCategory(category);
    setHoveredSubcategory(null);
  };

  const handleSubcategoryMouseEnter = (subcategory, category) => {
    setHoveredSubcategory(subcategory);
    setHoveredCategory(category); // Set the category containing the subcategory
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
    setHoveredSubcategory(null);
  };

  return (
    <div className="flex" onMouseLeave={handleMouseLeave}>
      <div className="p-2 bg-white rounded border border-gray-300 w-72 h-[345px]">
        {/* <h2 className="text-2xl font-bold mb-4">Categories</h2> */}
        <ul>
          {categories.map((category, index) => (
            <li
              key={category.mainCategory}
              className={`cursor-pointer relative p-1 border-x-2 ${index === categories.length - 1 ? "border-t-2 border-b-2" : "border-t-2"}`}
              onMouseEnter={() => handleCategoryMouseEnter(category)}
            >
              <div
                className={`${
                  (hoveredCategory === category || (hoveredSubcategory && hoveredSubcategory.category === category)) ? 'text-blue-600' : ''
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <span className="text-lg font-semibold">{category.mainCategory}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Subcategory section */}
      {hoveredCategory && hoveredCategory.subCategories && (
        <div 
          className="p-2 bg-white rounded border border-gray-300 w-72 h-[345px]"
          style={{
            position: 'absolute',
            zIndex: 1,
            top: '30.5%',
            left: '30%',
            marginTop: '0px',
          }}
        >
          {/* <h2 className="text-2xl font-bold mb-4">Subcategories</h2> */}
          <ul>
            {hoveredCategory.subCategories.map((subCategory, index) => (
              <li
                key={subCategory.name}
                // className="cursor-pointer relative"
                className={`cursor-pointer relative p-1 border-x-2 ${index === hoveredCategory.subCategories.length - 1 ? "border-t-2 border-b-2" : "border-t-2"}`}
                onMouseEnter={() => handleSubcategoryMouseEnter(subCategory, hoveredCategory)}
              >
                <div
                  className={`${
                    hoveredSubcategory === subCategory ? 'text-blue-600' : ''
                  }`}
                  onClick={() => handleSubcategoryClick(subCategory)}
                >
                  <span className="text-lg font-semibold">{subCategory.name}</span>
                </div>
                {/* Add logic to display sub-subcategories here */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
