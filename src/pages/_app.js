import "../styles/globals.css";
import { useRouter } from "next/router";
import Layout from "@/layouts/Layout.jsx";
import Dashboard from "@/components/dashboard/Dashboard";
import DashboardLayout from "@/layouts/DashboardLayout";
import { CartProvider } from "@/context/CartContext";
import withAuth from "@/middleware/withAuth";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { useEffect } from "react";
import { ContactSellCartProvider } from "@/context/ContactSellCartContext";

function RoutingComponent(props) {
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 1;

  // Enforce Limit
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
  }, [toasts]);

  const router = props.router;

  if (router.pathname.startsWith("/admin")) {
    // Wrap the DashboardLayout with withAuth to protect the /admin route
    const ProtectedDashboardLayout = withAuth(DashboardLayout);

    return (
      <ProtectedDashboardLayout>{props.children}</ProtectedDashboardLayout>
    );
  } else {
    return (
      <>
        <Layout>{props.children}</Layout>
      </>
    );
  }
}

export default function App({ Component, pageProps: { ...pageProps } }) {
  const router = useRouter();

  return (
    <CartProvider>
      <ContactSellCartProvider>
        <RoutingComponent router={router}>
          <Component {...pageProps} />
        </RoutingComponent>
        <Toaster />
      </ContactSellCartProvider>
    </CartProvider>
  );
}
