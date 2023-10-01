import { FaCaretRight } from "react-icons/fa";
import Link from "next/link";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import PaymentMethodLogos from "../payments/PaymentMethodLogos";

const Footer = () => {
  // Define footer navigation items
  const footerNavigation = [
    { id: 1, label: "Home", link: "/" },
    { id: 2, label: "About Us", link: "about-us" },
    { id: 3, label: "Product", link: "products" },
    { id: 4, label: "Service", link: "service" },
    { id: 5, label: "Contact", link: "contact" },
  ];

  return (
    <>
      <footer className="bg-[#242A44] px-3 lg:px-5">
        <div className="mx-auto pt-8 pb-4 max-w-[1200px]">
          <div className="justify-between lg:flex">
            
            {/* Footer Navigation */}
            <div className="max-w-[450px] mx-auto lg:mx-0">
              <nav className="mb-4">
                <ul className="flex justify-between gap-1 lg:block lg:gap-0">
                  {footerNavigation.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center -my-[1px] text-white"
                    >
                      <FaCaretRight className="lg:mr-5" />
                      <Link href={item.link}>
                        <span className="lg:text-[16px] text-[14px]">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Contact Information */}
            <div>
              <div className="lg:mx-auto text-[14px] my-4 lg:my-0 lg:max-w-[500px]">
                <div className="text-white">
                  <p className={`text-center lg:text-start text-white`}>
                    Level 9, The Office 4, One Central, <br /> World Trade Center,
                    Dubai - UAE.
                  </p>
                </div>

                <div
                  className={`justify-center lg:justify-start flex items-center text-white`}
                >
                  <FiMail className="mr-2 text-[#69ECEC]" />
                  <p className="text-[#69ECEC]">sharmin.rakibul@gmail.com</p>
                </div>

                <div className="flex items-center justify-center text-white lg:justify-start">
                  <FiPhoneCall className="mr-2 text-[#69ECEC] " />
                  <p>
                    +971566258802 <span className="text-[#69ECEC]">||</span>{" "}
                    +971561758023
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="flex-col lg:flex">
              <PaymentMethodLogos />
            </div>
          </div>
          <p className="text-white text-center text-[14px] mt-4 lg:mt-0">
            © All rights reserved by Sharmin Jahan Lucky
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
