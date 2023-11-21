import { medicareApi } from "@/utils/http";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

const PaymentCancel = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query?.orderId !== undefined) {
      cancelOrder(router.query?.orderId);
    }
  }, [router]);

  /**
   * Cancel order.
   */
  function cancelOrder(id) {
    let formData = {
      orderStatus: "cancelled",
    };
    medicareApi
      .patch(`/order/${id}`, formData)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
        if (error.response?.data?.type === "ValidationException") {
          toast.error(error?.response?.errors[0]?.message, { duration: 2500 });
        }
      });
  }

  return (
    <>
      <section className="h-screen flex flex-col justify-center items-center">
        <div className="max-w-7xl m-auto px-4">
          <div className="flex flex-col justify-center items-center pb-[50px]">
            <figure>
              <img src="/images/payment-cancel.png" alt="" />
            </figure>
            <h4 className="text-[20px] leading-[28px] font-poppins mb-[6px] font-bold mt-[20px] text-[#201D1D] mb-[20px]">
              Your order is cancelled.
            </h4>
            <Link href="/">
              <button className="bg-[#5AA591] py-[12px] px-[30px] text-white shadow-[0_1px_20px_rgba(90,165,145,0.3)] rounded-[3px]">
                Go to Home
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentCancel;
