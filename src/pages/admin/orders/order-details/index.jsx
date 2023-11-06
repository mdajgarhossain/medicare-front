import { medicareApi } from "@/utils/http";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const router = useRouter();
  const [theOrder, setTheOrder] = useState({});

  useEffect(() => {
    if (router.query?.id !== undefined) {
      getSingleOrder(router.query?.id);
    }
  }, [router]);

  function getSingleOrder(id) {
    medicareApi
      .get(`/order/${id}?include=o.orderBy,o.updatedBy,o.products`)
      // .get(
      //   `/product?include=product.category,product.subcategory,product.stocks,product.attachments&productId=${id}`
      // )
      .then((response) => {
        let order = response.data.data;
        setTheOrder(product);
      })
      .catch((error) => {
        if (error.response?.data?.type === "ValidationException") {
          toast.error(error?.response?.data?.errors[0]?.message, {
            duration: 1000,
          });
        } else {
          toast.error(error?.response?.data?.message, {
            duration: 1000,
          });
        }
      });
  }

  return (
    <div className="grid p-4 mt-2 gap-y-8">
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5">
        <h1 className="px-4 py-2 sm:py-2 sm:px-6 my-3 text-lg font-semibold leading-6 text-gray-900">
          Order Details
        </h1>
      </div>
    </div>
  );
};

export default OrderDetails;
