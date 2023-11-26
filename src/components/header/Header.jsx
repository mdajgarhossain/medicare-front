import Link from "next/link";
import SocialMediaLinks from "../common/SocialMediaIcons";
import DesktopNav from "./DesktopNav";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { FaCartArrowDown } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import cookies from "@/utils/cookies";
import { ChevronDownIcon, UserIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContactSellCart } from "@/context/ContactSellCartContext";
import CartDropdown from "../cart/CartDropdown";

const Header = () => {
  const { cart } = useCart();
  const { cart: contactSellCart } = useContactSellCart();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);

  useEffect(() => {
    const authUser = cookies.get("user_info");
    if (authUser?.id) {
      setLoggedInUser(authUser);
    } else {
      setLoggedInUser(null);
    }
  }, []);

  const menu = [
    // Conditionally add "Dashboard" menu item if logged in user is an admin
    loggedInUser?.type === "admin"
      ? { id: 1, label: "Dashboard", link: "/admin" }
      : null,
    { id: 2, label: "Home", link: "/" },
    { id: 3, label: "About Us", link: "/about-us" },
    { id: 4, label: "Products", link: "/products" },
    { id: 5, label: "Service", link: "/service" },
    { id: 6, label: "Contact", link: "/contact" },
  ].filter(Boolean); // Filter out any null elements

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleCartDropdown = () => {
    setCartDropdownOpen(!cartDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar-section sticky top-0 z-50 bg-[#242a44] px-3 md:px-5">
      <div className="py-3 max-w-[1200px] mx-auto">
        <div className="flex justify-between">
          <div className="flex items-center justify-between">
            <div className="w-24 lg:w-28">
              <Logo />
            </div>
            <div className="text-black">
              <div className="ml-1 text-white lg:text-center text-start lg:-ml-4">
                <h1 className="md:text-[40px] text-[18px] capitalize lg:-mb-3 lg:-mt-2 text-left ml-4">
                  Medicare International
                </h1>
                <p className="ml-2 md:text-[14px] text-[10px] lg:block font-normal capitalize text-[#81ecec] text-left ml-4">
                  water treatment plant & medical equipment manufacturer &
                  supplier
                </p>
                <div className="flex -ml-1 flex-nowrap">
                  <DesktopNav menu={menu} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center transition-transform duration-1000 ease-in">
            <MobileNav menu={menu} />
          </div>
          <div className="hidden lg:block">
            <SocialMediaLinks />

            {/* Cart */}
            <div
              className={`items-end ${
                loggedInUser?.id ? "justify-between" : "justify-end"
              } hidden lg:flex`}
            >
              {loggedInUser && (
                <div className="relative" onClick={toggleDropdown}>
                  <div className="flex gap-2 items-center cursor-pointer">
                    <UserIcon className="w-8 h-8 ml-1 text-white" />
                    <h2 className="capitalize text-xl text-white font-semibold sm:text-2xl hover:underline hover:cursor-pointer">
                      {loggedInUser?.name.split(" ")[0]}
                    </h2>
                    <ChevronDownIcon className="w-6 h-6 text-white" />
                  </div>
                  {dropdownOpen && (
                    <div className="absolute right-0 top-12 bg-white shadow-md rounded-lg w-48 py-2">
                      {loggedInUser?.type === "admin" && (
                        <div
                          className="cursor-pointer p-2 hover:bg-gray-200"
                          onClick={() => router.push("/admin")}
                        >
                          Dashboard
                        </div>
                      )}
                      <div
                        className="cursor-pointer p-2 hover:bg-gray-200"
                        onClick={() => router.push("/profile")}
                      >
                        Profile
                      </div>
                      <div
                        className="cursor-pointer p-2 hover:bg-gray-200"
                        onClick={() =>
                          router.push(`/order-list?orderBy=${loggedInUser?.id}`)
                        }
                      >
                        Order List
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* <Link
                href="/contact-sell-cart"
                className="relative w-10 h-8 mt-6"
              >
                <FaCartArrowDown className="w-8 h-8 text-white" />
                <span className="absolute -top-3 right-0 w-5 h-5 text-[12px] justify-center items-center flex text-white rounded-full bg-[#EA2027]">
                  {contactSellCart?.length}
                </span>
              </Link>
              <Link href="/cart" className="relative w-10 h-8 mt-6">
                <FaCartArrowDown className="w-8 h-8 text-white" />
                <span className="absolute -top-3 right-0 w-5 h-5 text-[12px] justify-center items-center flex text-white rounded-full bg-[#EA2027]">
                  {cart?.length}
                </span>
              </Link> */}
              {/* Cart Dropdown */}
              <div
                className="relative flex gap-2 items-center cursor-pointer mt-6"
                onClick={toggleCartDropdown}
              >
                <span className="relative w-9 h-8 mt-6">
                  <FaCartArrowDown className="w-8 h-8 text-white cursor-pointer " />
                  <span className="absolute -top-3 right-0 w-5 h-5 text-[12px] justify-center items-center flex text-white rounded-full bg-[#EA2027]">
                    {cart?.length + contactSellCart?.length}
                  </span>
                </span>
                <span className="text-white text-xl mt-6">Cart</span>
                {cartDropdownOpen && <CartDropdown />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
