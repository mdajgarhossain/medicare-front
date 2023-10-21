import '../styles/globals.css';
import { useRouter } from "next/router";
import Layout from "@/layouts/Layout.jsx"
import Dashboard from '@/components/dashboard/Dashboard';
import DashboardLayout from '@/layouts/DashboardLayout';

function RoutingComponent(props) {
  const router = props.router;
  // if (
  //   router.pathname == "/admin" || router.pathname == "/admin/products" || router.pathname == "/admin/products/add-product"
  // ) {
  //   // return <Fullpage className="fullPage">{props.children}</Fullpage>
  //   return <DashboardLayout>{props.children}</DashboardLayout>
  // } else {
  //   return (
  //     <>
  //       <Layout>{props.children}</Layout>
  //     </>
  //   );
  // }

  if (router.pathname.startsWith("/admin")) {
    return <DashboardLayout>{props.children}</DashboardLayout>;
  } else {
    return (
      <>
        <Layout>{props.children}</Layout>
      </>
    );
  }
  
}

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;

export default function App({ Component, pageProps: { ...pageProps } }) {
  const router = useRouter();

  return (
    <RoutingComponent router={router}>
      <Component {...pageProps} />
    </RoutingComponent>
  );
}
