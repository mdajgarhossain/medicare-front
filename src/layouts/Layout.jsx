import React from 'react';
import Header from '../components/common/Header/Header';
import Head from 'next/head';
// import '@/styles/globals.css';
// import Footer from './Footer';
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
    </div>
  );
};

export default Layout;
