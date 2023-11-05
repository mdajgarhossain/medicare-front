import Link from "next/link";

const SuccessfulPayment = () => {
  return (
    <>
      <section className="h-screen flex flex-col justify-center items-center">
        <div className="max-w-7xl m-auto px-4">
          <div className="flex flex-col justify-center items-center pb-[50px]">
            <figure>
              <img src="/images/payment-success.svg" alt="" />
            </figure>
            <h4 className="text-[20px] leading-[28px] font-poppins mb-[6px] font-bold mt-[20px] text-[#201D1D]">
              Your order is pending.
            </h4>
            <p className="mb-[25px] text-[14px] leading-[22px] text-[#515151] text-center">
              Thank you for placing order. We will get back to you soon.
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
