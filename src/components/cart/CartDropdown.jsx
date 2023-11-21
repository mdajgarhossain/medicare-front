import React from "react";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useContactSellCart } from "@/context/ContactSellCartContext";

const CartDropdown = () => {
  const { cart } = useCart();
  const { cart: contactSellCart } = useContactSellCart();

  return (
    <div className="flex flex-col absolute right-0 top-12 bg-white shadow-md rounded-lg w-48 py-2">
      <Link
        href="/contact-sell-cart"
        className="cursor-pointer p-2 hover:bg-gray-200 flex"
      >
        <FaCartArrowDown className="w-8 h-8 text-gray-800" />
        <span className="ml-2">{`Contact Sell: ${contactSellCart?.length}`}</span>
      </Link>
      <Link href="/cart" className="cursor-pointer p-2 hover:bg-gray-200 flex">
        <FaCartArrowDown className="w-8 h-8 text-gray-800" />
        <span className="ml-2">{`E-Sell: ${cart?.length}`}</span>
      </Link>
    </div>
  );
};

export default CartDropdown;
