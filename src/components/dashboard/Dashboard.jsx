import React, { useEffect, useState } from "react";
import Card from "./DashboardCard";
import {
  UserIcon,
  CubeIcon,
  ViewListIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/solid";
import { medicareApi } from "@/utils/http";

const Dashboard = () => {
  const [theDashboardData, setTheDashboardData] = useState(null);

  useEffect(() => {
    getDashboardData();
  }, []);

  function getDashboardData() {
    medicareApi
      .get("/dashboard")
      .then((response) => {
        setTheDashboardData(response.data);
      })
      .catch((error) => {});
  }

  // Calculate the total sales amount from the 'totalOrder' array
  const calculateTotalSalesAmount = () => {
    if (theDashboardData) {
      const totalOrder = theDashboardData.find((item) => item.type === "order");
      if (totalOrder && totalOrder.totalOrder) {
        return totalOrder.totalOrder.reduce(
          (total, order) => total + order.totalCost,
          0
        );
      }
    }
    return 0;
  };

  return (
    <div className="flex-1 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Total Users"
          value={
            theDashboardData?.find((item) => item.type === "user")?.total || 0
          }
          icon={<UserIcon className="w-6 h-6" />}
        />
        <Card
          title="Total Products"
          value={
            theDashboardData?.find((item) => item.type === "product")?.total ||
            0
          }
          icon={<CubeIcon className="w-6 h-6" />}
        />
        <Card
          title="Total Orders"
          value={
            theDashboardData?.find((item) => item.type === "order")?.total || 0
          }
          icon={<ViewListIcon className="w-6 h-6" />}
        />
        <Card
          title="Total Sales Amount"
          value={`$${calculateTotalSalesAmount()}`}
          icon={<CurrencyDollarIcon className="w-6 h-6" />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
