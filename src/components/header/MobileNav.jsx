import { useState } from "react";
import Link from "next/link";
import { XIcon } from "@heroicons/react/solid";
import SocialMediaLinks from "../common/SocialMediaIcons";

const MobileNav = ({ menu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mobile selection">
      <div className="block lg:hidden ">
        <div
          onClick={toggleMenu}
          className={`w-8 h-6 flex flex-col justify-between items-center mdl:hidden text-4xl text-[#64ffda] cursor-pointer overflow-hidden group ${
            isOpen ? "open" : ""
          }`}
        >
          <span className="w-full h-[5px] bg-[#ffcc1d] inline-flex"></span>
          <span className="w-full h-[5px] bg-[#64ffda] inline-flex"></span>
          <span className="w-full h-[5px] bg-[#ffcc1d] inline-flex"></span>
        </div>
        <div
          className={`bg-[#F8EFBA] z-0 w-full custom-scroll top-0 right-0 max-h-screen absolute p-2 overflow-y-auto transition-opacity ease-in-out duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-1 md:px-5">
            <div className="min-h-[25vh] md:min-h-[15vh]">
              <div className="lg:hidden">
                <div className="flex justify-between">
                  <ul className="items-center mt-2">
                    <div className="sticky z-50 flex items-center justify-center w-5 h-5 bg-red-500 rounded-full cursor-pointer md:w-6 md:h-6 top-2">
                      <XIcon
                        className="text-sm text-white duration-200"
                        onClick={toggleMenu}
                      />
                    </div>
                    {menu?.map((item) => (
                      <li key={item?.id} className="flex">
                        <Link
                          className="text-[#000] rounded-[15px] py-[2.3px] md:py-[1.3px] items-center uppercase text-[15px]"
                          href={item?.link}
                        >
                          {item?.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <SocialMediaLinks />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
