import Dashboard from "@/components/dashboard/Dashboard";
import withAuth from "@/middleware/withAuth";
import React from "react";

function Index() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Dashboard />
    </div>
  );
}

export default withAuth(Index);
