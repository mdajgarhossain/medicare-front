import React from 'react';

const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

export default DashboardCard;
