import React from 'react';
import Sidebar from './Sidebar';
import Card from './DashboardCard';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title="Total Users" value="100" />
          <Card title="Total Products" value="250" />
          <Card title="Total Orders" value="50" />
          <Card title="Total Sales Amount" value="$10,000" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
