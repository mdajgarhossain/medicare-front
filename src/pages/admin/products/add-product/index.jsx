import SearchSelect from "@/components/common/SearchSelect";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

const AddProduct = () => {
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  // Category states
  const [categories, setCategories] = useState([
    { id: 1, title: "E-Sell" },
    { id: 2, title: "Physical" },
  ]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Sub category states
  const [subCategories, setSubCategories] = useState([
    { id: 1, title: "Test 1" },
    { id: 2, title: "Test 2" },
  ]);
  const [subCategoryLoading, setSubCategoryLoading] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);


  // useEffect(() => {
  //   getCategory();
  // }, [router]);

  // useEffect(() => {
  //   getSubCategory();
  // }, [router]);

  // useEffect(() => {
  //   setValue("category", selectedCategory?.id ?? null);
  //   setValue("subCategory", selectedSubCategory?.id ?? null);
  
  // }, [
  //   selectedCategory,
  //   selectedSubCategory,
  // ]);

  /**
   * Retrieve categories.
   */
  function getCategory() {
    dokaneApi
      .get("/restaurant/food-categories", {
        params: {
          per_page: 60,
        },
      })
      .then((response) => {
        setCategories(response.data.food_categories);
        setCategoryLoading(false);
      })
      .catch((error) => {
        setCategoryLoading(false);
      });
  }

  /**
   * Retrieve sub categories.
   */
  function getSubCategory() {
    dokaneApi
      .get("/restaurant/food-categories", {
        params: {
          per_page: 60,
        },
      })
      .then((response) => {
        setSubCategories(response.data.food_categories);
        setSubCategoryLoading(false);
      })
      .catch((error) => {
        setSubCategoryLoading(false);
      });
  }

  /**
   * Set category.
   */
  function handleCategory(data) {
    setSelectedCategory(data);

    // Revalidate the category.
    // setTimeout(() => {
    //   trigger("category");
    // }, 500);
  }

  /**
   * Set category.
   */
  function handleSubCategory(data) {
    setSelectedSubCategory(data);

    // Revalidate the category.
    // setTimeout(() => {
    //   trigger("category");
    // }, 500);
  }

  /**
   * Reset all data form inputs.
   */
  function resetAllValue() {
    // setValue("category",  null);
    setSelectedCategory(null);

    // setValue("subCategory",  null);
    setSelectedSubCategory(null);

    // reset({
    //   title: null,
    //   unit_cost: null,
    //   food_code: null,
    //   price: null,
    //   discount: null
    // });
  }

  return (
    <Fragment>
      <div className="grid p-4 mt-2 gap-y-8">
        {/* <h1 className="mt-2 text-lg font-semibold leading-6 text-gray-900">
          Add Product
        </h1> */}
        <form className="bg-white shadow-sm ring-1 ring-gray-900/5">
          <h1 className="px-4 py-6 sm:py-8 sm:px-6 mt-2 text-lg font-semibold leading-6 text-gray-900">
            Add Product
          </h1>
          <div className="px-4 py-6 sm:py-8 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="w-full px-4 py-2 text-base border border-gray-300 rounded focus:outline-primary focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              {/* <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="category"
                    name="category"
                    type="text"
                    autoComplete="category"
                    className="w-full px-4 py-2 text-base border border-gray-300 rounded focus:outline-primary focus:ring-primary focus:border-primary"
                  />
                </div>
              </div> */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <SearchSelect
                    options={categories}
                    onChange={(data) => handleCategory(data)}
                    value={
                      JSON.stringify(selectedCategory) !== "{}"
                        ? selectedCategory
                        : false
                    }
                    getOptionValue={(item) => item.id}
                    getOptionLabel={(item) => `${item?.title}`}
                    isClearable={true}
                    isLoading={categoryLoading}
                    placeholder={
                      categoryLoading ? "Fetching data" : "Select Category"
                    }
                  />
                  {/* {errors.category && (
                  <p className="text-sm text-red-500">
                    {errors.category?.message}
                  </p>
                )} */}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 mt-8 md:grid-cols-2 gap-x-6 gap-y-8">
              {/* <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sub Category <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="category"
                    name="category"
                    type="text"
                    autoComplete="category"
                    className="w-full px-4 py-2 text-base border border-gray-300 rounded focus:outline-primary focus:ring-primary focus:border-primary"
                  />
                </div>
              </div> */}

              <div>
                <label
                  htmlFor="subCategory"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sub Category <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <SearchSelect
                    options={subCategories}
                    onChange={(data) => handleSubCategory(data)}
                    value={
                      JSON.stringify(selectedSubCategory) !== "{}"
                        ? selectedSubCategory
                        : false
                    }
                    getOptionValue={(item) => item.id}
                    getOptionLabel={(item) => `${item?.title}`}
                    isClearable={true}
                    isLoading={subCategoryLoading}
                    placeholder={
                      subCategoryLoading ? "Fetching data" : "Select Sub Category"
                    }
                  />
                  {/* {errors.subCategory && (
                  <p className="text-sm text-red-500">
                    {errors.subCategory?.message}
                  </p>
                )} */}
                </div>
              </div>

              <div>
                <label
                  htmlFor="details"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Details <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="category"
                    name="category"
                    type="text"
                    autoComplete="category"
                    className="w-full px-4 py-2 text-base border border-gray-300 rounded focus:outline-primary focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse items-center px-4 py-1 mb-3 sm:px-6">
            <button
              type="submit"
              className="block mt-4 rounded-md bg-[#464e6e] px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#464e6e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddProduct;
