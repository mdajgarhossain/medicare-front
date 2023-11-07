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
      .get(`/order?include=o.orderBy,o.updatedBy,o.products&orderId=${id}`)
      .then((response) => {
        let order = response.data.data[0];
        console.log({ order });
        setTheOrder(order);
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
    <div className="p-4 mt-2">
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">
          Order Details
        </h1>
        <div className="grid grid-cols-2 gap-4 bg-gray-200 p-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Order Information
            </h2>
            <div className="text-gray-600">
              <p>
                <strong>Order ID:</strong> {theOrder.id}
              </p>
              <p>
                <strong>Created At:</strong> {theOrder.createdAt}
              </p>
              <p>
                <strong>Shipping Address:</strong> {theOrder.shippingAddress}
              </p>
              <p>
                <strong>House Address:</strong> {theOrder.billingAddress}
              </p>
              <p>
                <strong>Order Status:</strong> {theOrder.orderStatus}
              </p>
              <p>
                <strong>Payment Method:</strong> {theOrder.paymentMethod}
              </p>
              <p>
                <strong>Payment Status:</strong> {theOrder.paymentStatus}
              </p>
              <p>
                <strong>Shipping Cost:</strong> ${theOrder.shippingCost}
              </p>
              <p>
                <strong>Total Cost:</strong> ${theOrder.totalCost}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Ordered By</h2>
            <div className="text-gray-600">
              <p>
                <strong>Name:</strong> {theOrder?.orderBy?.name}
              </p>
              <p>
                <strong>Email:</strong> {theOrder?.orderBy?.email}
              </p>
              <p>
                <strong>Type:</strong> {theOrder?.orderBy?.type}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 p-3">
          <h2 className="text-xl font-semibold text-gray-800 mt-4">
            Ordered Products
          </h2>
          <div className="text-gray-600">
            {theOrder?.products?.map((product) => (
              <div key={product.id} className="mb-4">
                <p>
                  <strong>Name:</strong> {product.name}
                </p>
                <p>
                  <strong>Description:</strong> {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
