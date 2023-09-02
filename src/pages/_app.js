import '../styles/globals.css';
import { useRouter } from "next/router";
import Layout from "@/layouts/Layout.jsx"

function RoutingComponent(props) {
  const router = props.router;
  if (
    router.pathname == "/login" ||
    router.pathname == "/reset-password" ||
    router.pathname == "/landing-page-two" ||
    router.pathname == "/landing-page"
  ) {
    // return <Fullpage className="fullPage">{props.children}</Fullpage>
    return
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
