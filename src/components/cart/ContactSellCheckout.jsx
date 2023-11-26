import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SHIPPING_COST } from "@/utils/constants";
import cookies from "@/utils/cookies";
import { medicareApi } from "@/utils/http";
import toast from "react-hot-toast";
import { useContactSellCart } from "@/context/ContactSellCartContext";

const ContactSellCheckout = () => {
  const { cart } = useContactSellCart();
  const shippingCost = SHIPPING_COST;
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [orderDescription, setOrderDescription] = useState("");
  const [processing, setProcessing] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [addressError, setAddressError] = useState("");
  const router = useRouter();

  // Get authenticated user info
  useEffect(() => {
    const authUser = cookies.get("user_info");
    if (authUser?.id) {
      setLoggedInUser(authUser);
    } else {
      setLoggedInUser(null); // User is not logged in
    }
  }, []);

  const total = cart.reduce((acc, item) => {
    const price = item?.stocks?.data[0].sellingPrice || 0; // Use 0 as a default price if undefined
    const quantity = item.quantity || 0; // Use 0 as a default quantity if undefined
    return acc + price * quantity;
  }, 0);

  const grandTotal = parseFloat((total + shippingCost).toFixed(2));

  console.log({ total });

  /**
   * Place Order.
   */
  function placeOrder() {
    setProcessing(true);

    if (!shippingAddress) {
      setAddressError("Street address is required!");
      toast.error("Street address is required!", { duration: 2000 });
      setProcessing(false);
      return;
    }

    let formData = {
      orderBy: loggedInUser.id,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      orderDescription: orderDescription,
      subtotal: total,
      shippingCost: shippingCost,
      totalCost: grandTotal,
      paymentMethod: selectedPayment,
      products: cart,
    };

    medicareApi
      .post("/order", formData)
      .then((response) => {
        if (response?.data?.url) {
          setTimeout(() => {
            setProcessing(false);
            localStorage.removeItem("contactSellCart");
            window.location.replace(response?.data?.url);
          }, 500);
        } else {
          setTimeout(() => {
            setProcessing(false);
            localStorage.removeItem("contactSellCart");
            window.location.replace("/order-success");
          }, 500);
        }
      })
      .catch((error) => {
        setProcessing(false);
        if (error.response?.data?.type === "ValidationException") {
          toast.error(error?.response?.errors[0]?.message, { duration: 2000 });
        }
      });
  }

  return (
    <div className="bg-white p-10 border rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Contact Sell Checkout</h2>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <h3 className="text-lg font-semibold mb-4">Billing Details</h3>
          <div className="mb-4">
            <label
              htmlFor="shippingAddress"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Street Address<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="shippingAddress"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded"
            />
            <p className="text-red-500">
              {!shippingAddress ? addressError : ""}
            </p>
          </div>
          <div>
            <label
              htmlFor="billingAddress"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              House Address
            </label>
            <input
              type="text"
              id="billingAddress"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Description
            </label>
            <textarea
              value={orderDescription}
              onChange={(e) => setOrderDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded"
              id="description"
              placeholder=""
              name="description"
            ></textarea>
          </div>
        </div>
        <div className="ml-10">
          <h3 className="text-lg font-semibold mb-4">Order Details</h3>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-2"
            >
              <p className="text-gray-700">
                {item.name} x {item.quantity}
              </p>
              {/* <p>
                $
                {(item.quantity * item.stocks?.data[0].sellingPrice).toFixed(2)}
              </p> */}
            </div>
          ))}
          <div className="mb-6 mt-8">
            <h4 className="text-sm font-medium mb-2">Payment Method</h4>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="cash"
                  checked={selectedPayment === "cash"}
                  onChange={() => setSelectedPayment("cash")}
                />
                <span>Cash</span>
              </label>
            </div>
          </div>
          {/* <p className="text-lg">Shipping: ${shippingCost.toFixed(2)}</p>
          <p className="text-xl font-semibold">Grand Total: ${grandTotal}</p> */}
        </div>
      </div>

      <button
        onClick={placeOrder}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 mt-4 flex items-center"
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
          <>
            Place Order
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.293 4.293a1 1 0 00-1.414 0L11 8.586V2a1 1 0 10-2 0v6.586l-3.293-3.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </>
        )}
      </button>
    </div>
  );
};

export default ContactSellCheckout;
