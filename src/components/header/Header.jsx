import SocialMediaLinks from "../common/SocialMediaIcons";
import DesktopNav from "./DesktopNav";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
// import MobileMenu from "./MobileMenu";
// import SocialIcons from "../SocialIcons/SocialIcons";
// import { BiUserCircle } from "react-icons/bi";
// import Logo from "../Logo/Logo";
// import { FaCartArrowDown } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { useContext } from "react";
// import { useSelector } from "react-redux";
// import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  // const state = useSelector((state) => state.cart);
  // console.log(state);
  // const [isOpen, setIsOpen] = useState(false);
  // const { user, logout } = useContext(AuthContext);

  // const showUserInfo = () => {
  //   setIsOpen(!isOpen);
  // };

  // const menu = [
  //   // Menu items
  // ];

  // const userInfo = [
  //   // User info items
  // ];

  // const handleLogout = () => {
  //   logout();
  // };

  const menu = [
    { id: 1, label: "Home", link: "/home" },
    { id: 2, label: "About Us", link: "/about-us" },
    { id: 3, label: "Products", link: "/products" },
    { id: 4, label: "Services", link: "/services" },
    { id: 5, label: "Contact", link: "/contact" },
];


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
                <h1 className="md:text-[40px] text-[18px] capitalize lg:-mb-3 lg:-mt-2">
                  Medicare International
                </h1>
                <p className="ml-2 md:text-[14px] text-[10px] lg:block font-normal capitalize text-[#81ecec]">
                  water treatment plant & medical equipment manufacturer & supplier
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
          </div>
          <div className="items-end justify-end hidden lg:flex">
            {/* <Link to={"my-carts"} className="relative w-10 h-8 mt-5">
              <FaCartArrowDown className="w-8 h-8 text-white" />
              <span className="absolute -top-3 right-0 w-5 h-5 text-[12px] justify-center items-center flex text-white rounded-full bg-[#EA2027]">
                {state?.length}
              </span>
            </Link> */}
            {/* {user?._id && (
              <BiUserCircle
                className="w-8 h-8 ml-1 text-white cursor-pointer"
                onClick={showUserInfo}
              />
            )} */}
            {/* {user?._id && (
              <div
                className={`${
                  isOpen ? "absolute" : "hidden"
                } text-white bg-red-500 w-52 p-4 top-32 flex flex-col gap-2`}
              >
                <img
                  src="https://source.unsplash.com/150x150/?portrait?3"
                  alt=""
                  className="mx-auto rounded-full w-28 h-28 dark:bg-gray-500 aspect-square"
                />
                <h2 className="text-xl font-semibold sm:text-2xl">
                  {user?.name}
                </h2>
                {userInfo.map((item, i) => (
                  <p className="px-2 py-1 bg-black" key={i}>
                    {item?.name}
                  </p>
                ))}
                <p className="px-2 py-1 bg-black" onClick={handleLogout}>
                  Log out
                </p>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
