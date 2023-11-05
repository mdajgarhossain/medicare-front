import cookies from "@utils/cookies";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SuccessfulPayment = () => {
  return (
    <>
      <section className="relative">
        {/* <figure className="absolute top-0 left-0 lg:inline-block hidden opacity-40">
          <img src="/images/review-style.svg" />
        </figure> */}
        <div className="max-w-7xl m-auto px-4">
          {/* <Link href="/">
            <figure className="pt-[50px] pb-[80px]">
              <img src="/images/secondary-logo.svg" />
            </figure>
          </Link> */}

          <div className="flex flex-col justify-center items-center pb-[50px]">
            <figure>
              <img src="/images/payment-success.svg" alt="" />
            </figure>
            <h4 className="text-[20px] leading-[28px] font-poppins mb-[6px] font-bold mt-[20px] text-[#201D1D]">
              Your payment is sucessful
            </h4>
            <p className="mb-[25px] text-[14px] leading-[22px] text-[#515151] text-center">
              Thank you for your payment.
            </p>
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

export default SuccessfulPayment;
