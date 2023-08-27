import React from "react";
import Head from "next/head";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
// import '@/styles/globals.css';
// import styles from '../styles/components/layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className="">
      <Head>
        <link rel="icon" href="/images/logo.jpeg" />
      </Head>

      <Header />
      <main className="">{children}</main>
      {/* <Footer /> */}
      <Footer />
    </div>
  );
};

export default Layout;
