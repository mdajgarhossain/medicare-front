import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { XCircleIcon } from "@heroicons/react/outline";
import { medicareApi } from "@/utils/http";
import toast from "react-hot-toast";
import SearchSelect from "@/components/common/SearchSelect";

const EditSubCategory = () => {
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const [theSubCategory, setTheSubCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (router.query?.id !== undefined) {
      getSubCategory(router.query?.id);
      getCategory();
    }
  }, [router]);

  useEffect(() => {
    setValue("categoryId", selectedCategory?.id ?? null);
  }, [selectedCategory]);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    categoryId: yup.string().required("Category is required"),
    description: yup.string(),
  });

  // Form validation hooks
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  /**
   * Set category.
   */
  function handleCategory(data) {
    setSelectedCategory(data);

    // Revalidate the category.
    setTimeout(() => {
      trigger("categoryId");
    }, 500);
  }

  // Fetch sub category data
  function getSubCategory(id) {
    medicareApi
      .get(`/subcategory/${id}?include=sc.category`)
      .then((response) => {
        console.log("response.data", response.data);
        let subCategory = response.data;
        setTheSubCategory(subCategory);

        // set react form data (default value).
        setValue("name", subCategory.name);
        // setValue("categoryId", subCategory.category?.id);
        setSelectedCategory(subCategory.category);
        setValue("description", subCategory.description);
      })
      .catch((error) => {
        if (error.response?.data?.type === "ValidationException") {
          toast.error(error?.response?.data?.errors[0]?.message, {
            duration: 3000,
          });
        } else {
          toast.error(error?.response?.data?.message, {
            duration: 3000,
          });
        }
      });
  }

  /**
   * Retrieve categories.
   */
  function getCategory() {
    setCategoryLoading(true);
    medicareApi
      .get("/category", {
        params: {
          limit: 60,
        },
      })
      .then((response) => {
        setCategories(response.data.data);
        setCategoryLoading(false);
      })
      .catch((error) => {
        setCategoryLoading(false);
      });
  }

  /**
   * Edit sub category item.
   */
  function editSubCategory(data) {
    setProcessing(true);
    let formData = new FormData();

    // Define the list of fields you want to include in the formData
    const fieldsToInclude = ["name", "categoryId", "description"];

    // Use a loop to append valid and non-empty fields to formData
    fieldsToInclude.forEach((field) => {
      if (data[field]) {
        formData.append(field, data[field]);
      }
    });

    medicareApi
      .patch(`/subcategory/${theSubCategory?.id}`, formData)
      .then((response) => {
        toast.success("Subcategory is updated", { duration: 1500 });
        setTimeout(() => {
          setProcessing(false);
          router.push("/admin/sub-categories");
        }, 1000);
      })
      .catch((error) => {
        setProcessing(false);
        if (error.response?.data?.type === "ValidationException") {
          toast.error(error?.response?.errors[0]?.message, { duration: 3000 });
        }
      });
  }

  return (
    <Fragment>
      <div className="grid p-4 mt-2 gap-y-8">
        <form className="bg-white shadow-sm ring-1 ring-gray-900/5">
          <h1 className="px-4 py-2 sm:py-2 sm:px-6 mt-4 text-lg font-semibold leading-6 text-gray-900">
            Edit Sub Category
          </h1>
          <span className="px-4 sm:px-6">
            The fields labels marked with
            <span className="text-lg text-red-700"> *</span> are required input
            field
          </span>
          <div className="px-4 py-6 sm:py-8 sm:px-6 mt-3">
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
                    {...register("name")}
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="w-full px-4 py-2 text-base border border-gray-300 rounded focus:outline-primary focus:ring-primary focus:border-primary"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name?.message}
                    </p>
                  )}
                </div>
              </div>
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
                    getOptionLabel={(item) => `${item?.name}`}
                    isClearable={true}
                    isLoading={categoryLoading}
                    placeholder={
                      categoryLoading ? "Fetching data" : "Select Category"
                    }
                  />
                  {errors.categoryId && (
                    <p className="text-sm text-red-500">
                      {errors.categoryId?.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <input
                    {...register("description")}
                    id="description"
                    name="description"
                    type="text"
                    autoComplete="description"
                    className="w-full px-4 py-2 text-base border border-gray-300 rounded focus:outline-primary focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-4 px-4 py-4 sm:px-8 mt-4">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 border-2 py-2 px-4 rounded"
              onClick={() => router.push("/admin/sub-categories")}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={processing}
              onClick={handleSubmit(editSubCategory)}
            >
              {processing ? (
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  Processing...
                </div>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default EditSubCategory;
