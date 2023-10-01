import React from 'react';

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

export default DashboardCard;
