import { useCart } from "@/context/CartContext";
import { medicareApi } from "@/utils/http";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { cart, addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [theProduct, setTheProduct] = useState({
    id: router.query?.id,
    name: "Sample Product",
    price: 19.99,
    description: "This is a sample product description.",
    image: "images/demo-product-images/demoImage.jpg",
  });

  useEffect(() => {
    if (router.query?.id !== undefined) {
      getProduct(router.query?.id);
    }
  }, [router]);

  function getProduct(id) {
    medicareApi
      .get(`/product/${id}`)
      .then((response) => {
        let product = response.data.product;
        setTheProduct(product);
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

  const handleAddToCart = () => {
    const itemInCart = cart.find((item) => item.id === theProduct.id);

    if (itemInCart) {
      // If the item is already in the cart, update its quantity
      itemInCart.quantity = quantity;
      alert("Item has already added to the cart!");
    } else {
      // If the item is not in the cart, add it with the specified quantity
      theProduct.quantity = quantity;
      addToCart(theProduct);
    }

    // Reset the quantity input
    // setQuantity(1);

    // Optionally, show a toast message to indicate success
    // toast.success('Item added to cart!', {
    //   duration: 3000,
    // });
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 rounded-lg shadow-lg bg-gray-100">
      <div className="flex gap-3">
        <div className="w-1/3">
          <img
            src={theProduct.image}
            alt={theProduct.name}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="w-2/3 p-6">
          <h1 className="text-3xl font-bold mb-4">{theProduct.name}</h1>
          <p className="text-gray-600 mb-4">{theProduct.description}</p>
          <p className="text-2xl font-bold">${theProduct.price.toFixed(2)}</p>
          <div className="">
            <label htmlFor="quantity" className="block mt-4 text-lg">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, e.target.value))}
              className="w-[8rem] h-10 p-2 border border-gray-500 mt-2"
            />
          </div>
          <div className="mt-3">
            <button
              onClick={handleAddToCart}
              className="bg-[#464e6e] text-white px-6 py-2 mt-4 hover:bg-[#353c57]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
