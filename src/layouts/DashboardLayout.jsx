import React from "react";
import Head from "next/head";
import Sidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="">
      <Head>
        <link rel="icon" href="/images/logo.jpeg" />
      </Head>

      {/* <Header />
      <main className="h-screen">{children}</main>
      <Footer /> */}

      <div className="flex">
        <Sidebar />
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
