import React from "react";
import NewProducts from "@/components/home/NewProducts"
import Application from "@/components/home/Application";
import Brand from "@/components/brand/Brand";

function Home() {
  return (
    <div className="bg-[#bdc3c7]">
      <div className="max-w-[1200px] mx-auto">
        <NewProducts />
        <Application />
        <Brand />
      </div>
    </div>
  );
}

export default Home;

