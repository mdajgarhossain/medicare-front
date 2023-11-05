import { useCart } from "@/context/CartContext";
import React from "react";
import DemoImage from "public/images/demo-product-images/demoImage.jpg";

const shippingCost = 10; // Define the constant shipping cost

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  console.log({ cart });

  // Calculate the total price of all items in the cart
  // const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = cart.reduce((acc, item) => {
    const price = item?.stocks?.data[0].sellingPrice || 0; // Use 0 as a default price if undefined
    const quantity = item.quantity || 0; // Use 0 as a default quantity if undefined
    return acc + price * quantity;
  }, 0);

  // Function to handle the checkout
  const checkout = () => {
    // Implement your checkout logic here
    // This function will be called when the "Checkout" button is clicked
  };

  // Populate Image
  const getImage = (url, image) => {
    if (url && image) {
      return `${url}${image}`;
    } else {
      return DemoImage.src;
    }
  };

  return (
    <div className="bg-white p-10 border rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Your Shopping Cart</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 border-b pb-4"
          >
            <img
              src={getImage(
                process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
                item?.attachments?.data[0]?.src
              )}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-grow">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-gray-600">
                {/* Quantity: {item.quantity} x ${item.price.toFixed(2)} = $
                {(item.quantity * item.price).toFixed(2)} */}
                Quantity: {item.quantity} x $
                {item?.stocks?.data[0].sellingPrice.toFixed(2) || 0} = $
                {(
                  item.quantity * (item.stocks?.data[0].sellingPrice || 0)
                ).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="bg-gray-200 text-gray-600 px-2 py-1 rounded hover:bg-gray-300"
              >
                -
              </button>
              <p>{item.quantity}</p>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="bg-gray-200 text-gray-600 px-2 py-1 rounded hover-bg-gray-300"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {cart.length === 0 && <p>Your cart is empty.</p>}

      {/* Show calculation with grand total */}
      {cart.length > 0 && (
        <div className="mt-4">
          <p className="text-lg">Shipping: ${shippingCost.toFixed(2)}</p>
          <p className="text-xl font-semibold">
            Grand Total: ${(total + shippingCost).toFixed(2)}
          </p>

          <button
            onClick={checkout}
            className="bg-[#464e6e] text-white px-4 py-2 rounded hover:bg-[#353c57] mt-4 flex items-center"
          >
            Checkout
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
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
