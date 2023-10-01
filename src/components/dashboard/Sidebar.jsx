import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-[#242a44] text-white w-1/4 p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li>
          <a href="#" className="text-lg block mb-2">Home</a>
        </li>
        <li>
          <a href="#" className="text-lg block mb-2">Products</a>
        </li>
        <li>
          <a href="#" className="text-lg block mb-2">Categories</a>
        </li>
        <li>
          <a href="#" className="text-lg block mb-2">Subcategories</a>
        </li>
        <li>
          <a href="#" className="text-lg block mb-2">Users</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
