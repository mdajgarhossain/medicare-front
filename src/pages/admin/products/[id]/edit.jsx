import SearchSelect from "@/components/common/SearchSelect";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUpload from "@/components/common/ImageUpload";
import { XCircleIcon } from "@heroicons/react/outline";
import { medicareApi } from "@/utils/http";
import toast from "react-hot-toast";

const EditProduct = () => {
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const [theProduct, setTheProduct] = useState({});

  useEffect(() => {
    if (router.query?.id !== undefined) {
      getProduct(router.query?.id);
    }
  }, [router]);

  // Category states
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Sub category states
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryLoading, setSubCategoryLoading] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Image state
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    category: yup.string().required("Category is required"),
    subCategory: yup.string().required("Sub Category is required"),
    details: yup.string(),
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

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (selectedCategory?.id) {
      getSubCategory(selectedCategory.id);
    }
  }, [selectedCategory]);

  function getProduct(id) {
    medicareApi
      .get(
        `/product/${id}?include=product.categories,product.attachments,product.subcategory`
      )
      .then((response) => {
        let product = response.data;
        setTheProduct(product);

        // set react form data (default value).
        const category = product?.categories?.data.length
          ? product?.categories.data[0]
          : {};
        console.log({ category });
        setValue("name", product.name);
        setSelectedCategory(category);
        setSelectedSubCategory(product.subcategory);
        setValue("details", product.description);

        // if(product?.image?.path && product?.image?.file) {
        //   setImageUrl(`${process.env.NEXT_PUBLIC_IMAGE_CDN}${courseProps?.image?.path}${courseProps?.image?.file}`)
        // }

        // if (theProduct?.image?.src) {
        //   setImageUrl(`${theProduct?.image?.src}`);
        // }
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

  useEffect(() => {
    setValue("category", selectedCategory?.id ?? null);
    setValue("subCategory", selectedSubCategory?.id ?? null);
    setValue("images", images);
    setValue("preview_images", previewImages);
  }, [selectedCategory, selectedSubCategory, images, previewImages]);

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
        setCategoryLoading(false);
      })
      .catch((error) => {
        setCategoryLoading(false);
      });
  }

  /**
   * Retrieve sub categories.
   */
  function getSubCategory(categoryId) {
    medicareApi
      .get(`/subcategory/by/${categoryId}`, {
        params: {
          limit: 60,
        },
      })
      .then((response) => {
        setSubCategories(response.data.data);
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
    console.log({ data });
    setSelectedCategory(data);

    // Revalidate the category.
    setTimeout(() => {
      trigger("category");
      setSelectedSubCategory(null);
    }, 500);
  }

  /**
   * Set sub category.
   */
  function handleSubCategory(data) {
    setSelectedSubCategory(data);

    // Revalidate the sub category.
    setTimeout(() => {
      trigger("subCategory");
    }, 500);
  }

  /**
   * Set image.
   */
  function handleImageUpload(data) {
    setPreviewImages(data?.previewImages ?? []);
    setImages(data?.images ?? []);

    // Revalidate the discount type
    setTimeout(() => {
      trigger("preview_images");
    }, 500);
  }

  /**
   * Remove image.
   */
  function removeImage() {
    setPreviewImages([]);
    setImages([]);
    setImageUrl("");

    setTimeout(() => {
      trigger("preview_images");
    }, 500);
  }

  /**
   * Edit product item.
   */
  function editProduct(data) {
    setProcessing(true);
    let formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("categoryId", data.category);
    // formData.append("subCategoryId", data.subCategory);
    // formData.append("details", data.details);
    // formData.append("image", data.images[0]);

    formData.append("name", data.name);
    formData.append("categories[]", data.category);
    formData.append("subcategoryId", data.subCategory);
    formData.append("description", data.details);

    medicareApi
      .patch(`/product/${theProduct?.id}`, formData)
      .then((response) => {
        toast.success("Product is updated", { duration: 3000 });
        router.push("/admin/products");
      })
      .catch((error) => {
        setProcessing(false);
        if (error.response?.data?.type === "ValidationException") {
          toast.error(error?.response?.errors[0]?.message, { duration: 3000 });
        }
      });
  }

  /**
   * Reset all data form inputs.
   */
  function resetAllValue() {
    setValue("category", null);
    setSelectedCategory(null);

    setValue("subCategory", null);
    setSelectedSubCategory(null);

    setPreviewImages([]);
    setImages([]);

    reset({
      name: null,
      details: null,
    });
  }

  return (
    <Fragment>
      <div className="grid p-4 mt-2 gap-y-8">
        {/* <h1 className="mt-2 text-lg font-semibold leading-6 text-gray-900">
          Add Product
        </h1> */}
        <form className="bg-white shadow-sm ring-1 ring-gray-900/5">
          <h1 className="px-4 py-2 sm:py-2 sm:px-6 mt-4 text-lg font-semibold leading-6 text-gray-900">
            Edit Product
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
                  {errors.category && (
                    <p className="text-sm text-red-500">
                      {errors.category?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 mt-8 md:grid-cols-2 gap-x-6 gap-y-8">
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
                    getOptionLabel={(item) => `${item?.name}`}
                    isClearable={true}
                    isLoading={subCategoryLoading}
                    placeholder={
                      subCategoryLoading
                        ? "Fetching data"
                        : "Select Sub Category"
                    }
                  />
                  {errors.subCategory && (
                    <p className="text-sm text-red-500">
                      {errors.subCategory?.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="details"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Details
                </label>
                <div className="mt-2">
                  <input
                    {...register("details")}
                    id="details"
                    name="details"
                    type="text"
                    autoComplete="details"
                    className="w-full px-4 py-2 text-base border border-gray-300 rounded focus:outline-primary focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 mt-8 md:grid-cols-2 gap-x-6 gap-y-8">
              <div className="sm:col-span-4">
                <label
                  htmlFor="productImage"
                  className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                >
                  Product Image
                </label>
                {previewImages.length >= 1 || imageUrl ? (
                  <div className="w-6/12">
                    <div className="relative inline-block">
                      <button
                        onClick={() => removeImage()}
                        className="absolute right-0.75 rounded-full bg-gray-100 w-8 h-8"
                      >
                        <XCircleIcon
                          className="w-8 h-8 text-red-600 cursor-pointer"
                          aria-hidden="true"
                        />
                      </button>

                      <img
                        className="object-contain h-48 bg-white border border-gray-200 rounded-lg shadow-md w-96"
                        src={previewImages[0] || imageUrl}
                        alt="product image"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-6/12">
                    <ImageUpload imageUploadEmit={handleImageUpload} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8 mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={processing}
              onClick={handleSubmit(editProduct)}
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

export default EditProduct;
