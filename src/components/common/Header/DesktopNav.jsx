/**
 * DesktopNav Component
 *
 * This component renders a navigation menu for desktop screens.
 *
 * @param {Object} props - The component's properties.
 * @param {Array} props.menu - An array of menu items to display in the navigation.
 *
 * @returns {JSX.Element} - The rendered component.
 */

import Link from "next/link";

const DesktopNav = ({ menu }) => {
  return (
    <div className="hidden ml-2 lg:block">
      <ul className="flex items-center mt-2">
        {menu?.map((item) => (
          <li key={item?.id} className="relative">
            <Link
              className="text-[#f2b5ff] hover:bg-[#0a0a0a] hover:text-[#06eb12] rounded-[15px] py-1 px-2 mx-1 items-center uppercase text-[15px] font-medium"
              href={item?.link}
            >
              {item?.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DesktopNav;
