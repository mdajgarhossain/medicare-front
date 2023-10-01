import React, { useState } from 'react';
import { HomeIcon, CubeIcon, FolderIcon, TagIcon, UserIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Define an array of menu items
  const menuItems = [
    { icon: <HomeIcon className="w-6 h-6 mr-2" />, text: 'Home', link: '/' },
    { icon: <CubeIcon className="w-6 h-6 mr-2" />, text: 'Products', link: '/admin/products' },
    { icon: <FolderIcon className="w-6 h-6 mr-2" />, text: 'Categories', link: '/' },
    { icon: <TagIcon className="w-6 h-6 mr-2" />, text: 'Subcategories', link: '/' },
    { icon: <UserIcon className="w-6 h-6 mr-2" />, text: 'Users', link: '/' },
  ];

  return (
    <div
      className={`bg-[#242a44] text-white w-1/4 p-4 min-h-screen transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="flex justify-between items-center mb-4">
        <Link href="/admin" className="text-2xl font-bold">Dashboard</Link>
        <button onClick={toggleSidebar} className="lg:hidden">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="mb-2 border rounded-md p-2">
            <Link href={item.link} className="text-lg flex items-center" onClick={toggleSidebar}>
              {item.icon}
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
