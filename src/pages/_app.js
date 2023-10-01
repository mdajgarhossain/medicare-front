import '../styles/globals.css';
import { useRouter } from "next/router";
import Layout from "@/layouts/Layout.jsx"
import Dashboard from '@/components/dashboard/Dashboard';

function RoutingComponent(props) {
  const router = props.router;
  if (
    router.pathname == "/admin"
  ) {
    // return <Fullpage className="fullPage">{props.children}</Fullpage>
    return <Dashboard />
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
