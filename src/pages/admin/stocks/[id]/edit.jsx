import SearchSelect from "@/components/common/SearchSelect";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { medicareApi } from "@/utils/http";
import toast from "react-hot-toast";

const EditStock = () => {
  const [theStock, setTheStock] = useState({});
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  // Product states
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (router.query?.id !== undefined) {
      getStock(router.query?.id);
    }
  }, [router]);

  const schema = yup.object().shape({
    productId: yup.string().required("Product is required"),
    quantity: yup.string().required("Quantity is required"),
    purchasePrice: yup.string().required("Purchase price is required"),
    sellingPrice: yup.string().required("Selling price is required"),
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
    getProducts();
  }, []);

  useEffect(() => {
    setValue("productId", selectedProduct?.id ?? null);
  }, [selectedProduct]);

  // Get Single Stock
  function getStock(id) {
    medicareApi
      .get(`/stock/${id}?include=stock.product`)
      .then((response) => {
        let stock = response.data;
        setTheStock(stock);

        // set react form data (default value).
        // setValue("productId", stock?.product?.id);
        setSelectedProduct(stock?.product);
        setValue("quantity", stock?.quantity);
        setValue("purchasePrice", stock?.purchasePrice);
        setValue("sellingPrice", stock?.sellingPrice);
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
   * Retrieve products.
   */
  function getProducts() {
    medicareApi
      .get("/product", {
        params: {
          limit: 60,
        },
      })
      .then((response) => {
        setProducts(response.data.data);
        setProductLoading(false);
      })
      .catch((error) => {
        setProductLoading(false);
      });
  }

  /**
   * Set product.
   */
  function selectProduct(data) {
    setSelectedProduct(data);

    // Revalidate the category.
    setTimeout(() => {
      trigger("productId");
    }, 500);
  }

  /**
   * Add stock.
   */
  async function addStock(data) {
    setProcessing(true);
    let formData = new FormData();
    formData.append("productId", data.productId);
    formData.append("quantity", data.quantity);
    formData.append("purchasePrice", data.purchasePrice);
    formData.append("sellingPrice", data.sellingPrice);
    // formData.append("status", "In-Stock");

    medicareApi
      .patch(`/stock/${theStock?.id}`, formData)
      .then((response) => {
        // toast.success("Stock is updated", { duration: 1000 });
        setTimeout(() => {
          setProcessing(false);
          router.push("/admin/stocks");
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
            Add Stock
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
                  htmlFor="product"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Select Product <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <SearchSelect
                    options={products}
                    onChange={(data) => selectProduct(data)}
                    value={
                      JSON.stringify(selectedProduct) !== "{}"
                        ? selectedProduct
                        : false
                    }
                    getOptionValue={(item) => item.id}
                    getOptionLabel={(item) => `${item?.name}`}
                    isClearable={true}
                    isLoading={productLoading}
                    placeholder={
                      productLoading ? "Fetching data" : "Select Product"
                    }
                  />
                  {errors.productId && (
                    <p className="text-sm text-red-500">
                      {errors.productId?.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Quantity <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    {...register("quantity")}
                    type="number"
                    name="quantity"
                    id="quantity"
                    autoComplete="given-name"
                    min={1}
                    className="w-full px-4 py-2 text-base border border-gray-300 rounded focus:outline-primary focus:ring-primary focus:border-primary"
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-500">
                      {errors.quantity?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 mt-8 md:grid-cols-2 gap-x-6 gap-y-8">
              <div>
                <label
                  htmlFor="purchasePrice"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Purchase Price <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    {...register("purchasePrice")}
                    type="number"
                    name="purchasePrice"
                    id="purchasePrice"
                    min={0}
                    autoComplete="given-name"
                    className="w-full px-4 py-2 text-base border border-gray-300 rounded focus:outline-primary focus:ring-primary focus:border-primary"
                  />
                  {errors.purchasePrice && (
                    <p className="text-sm text-red-500">
                      {errors.purchasePrice?.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="sellingPrice"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Selling Price <span className="text-red-600">*</span>
                </label>
                <div className="mt-2">
                  <input
                    {...register("sellingPrice")}
                    type="number"
                    name="sellingPrice"
                    id="sellingPrice"
                    min={0}
                    autoComplete="given-name"
                    className="w-full px-4 py-2 text-base border border-gray-300 rounded focus:outline-primary focus:ring-primary focus:border-primary"
                  />
                  {errors.sellingPrice && (
                    <p className="text-sm text-red-500">
                      {errors.sellingPrice?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8 mt-4">
          <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 border-2 py-2 px-4 rounded"
              onClick={() => router.push("/admin/stocks")}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={processing}
              onClick={handleSubmit(addStock)}
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

export default EditStock;
