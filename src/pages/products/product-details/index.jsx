import { useCart } from "@/context/CartContext";
import { medicareApi } from "@/utils/http";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DemoImage from "public/images/demo-product-images/demoImage.jpg";
import { useContactSellCart } from "@/context/ContactSellCartContext";
import { CurrencyBangladeshiIcon } from "@heroicons/react/outline";
import { CURRENCY_TAKA } from "@/utils/constants";
// import { CURRENCY_TAKA } from "@/utils/constants";

const ProductDetails = () => {
  const { cart, addToCart } = useCart();
  const { cart: contactSellCart, addToCart: addToContactSellCart } =
    useContactSellCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [theProduct, setTheProduct] = useState({});

  useEffect(() => {
    if (router.query?.id !== undefined) {
      getProduct(router.query?.id);
    }
  }, [router]);

  function getProduct(id) {
    medicareApi
      // .get(
      //   `/product/${id}?include=product.categories,product.subcategory,product.stocks,product.attachments`
      // )
      .get(
        `/product?include=product.category,product.subcategory,product.stocks,product.attachments&productId=${id}`
      )
      .then((response) => {
        let product = response.data.data[0];
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
    const itemInContactSellCart = contactSellCart.find(
      (item) => item.id === theProduct.id
    );

    if (itemInCart) {
      // If the item is already in the main cart, update its quantity
      itemInCart.quantity = quantity;
      toast.error("Product has already been added to the e-sell cart!", {
        duration: 3000,
      });
    } else if (itemInContactSellCart) {
      // If the item is already in the contact sell cart, update its quantity
      itemInContactSellCart.quantity = quantity;
      toast.error("Product has already been added to the contact sell cart!", {
        duration: 3000,
      });
    } else {
      // If the item is not in either cart, add it with the specified quantity
      theProduct.quantity = quantity;

      // Check the category and add to the appropriate cart
      if (theProduct?.category?.name === "E-sell") {
        addToCart(theProduct);
      } else {
        addToContactSellCart(theProduct);
      }
    }
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
    <div className="max-w-2xl mx-auto my-10 p-6 rounded-lg shadow-lg bg-gray-100">
      <div className="flex gap-3">
        <div className="w-1/2">
          <img
            src={getImage(
              process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
              theProduct?.attachments?.data[0]?.src
            )}
            alt={theProduct.name}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="w-2/3 p-6">
          <h1 className="text-3xl font-semibold mb-4">{theProduct.name}</h1>
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Description: </span>{" "}
            {theProduct.description ? theProduct.description : "N/A"}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Stock: </span>{" "}
            {theProduct?.stocks?.data[0]?.quantity ?? (
              <span className="text-red-500">No Stock</span>
            )}
          </p>
          {theProduct?.category?.name === "E-sell" && (
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Price: </span>
              <span className="font-inter mr-0.5">{CURRENCY_TAKA}</span>{theProduct?.stocks?.data[0]?.sellingPrice ?? "0"}
            </p>
          )}

          <p className="text-gray-600 mb-2">
            <span className="font-medium">Type: </span>
            {theProduct?.category?.name === "E-sell"
              ? "E-sell Product"
              : "Contact Sell Product"}
          </p>
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
              disabled={!theProduct?.stocks?.data.length ? true : false}
              className={`bg-[#464e6e] text-white px-6 py-2 mt-4 hover:bg-[#353c57] ${
                !theProduct?.stocks?.data.length ? "opacity-50" : ""
              }`}
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
