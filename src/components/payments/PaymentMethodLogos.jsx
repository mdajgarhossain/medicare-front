import React from "react";
import amexLogo from "../../../public/images/payment-method-logos/amex.png";
import masterCardLogo from "../../../public/images/payment-method-logos/master_card.png";
import payPalLogo from "../../../public/images/payment-method-logos/pay_pal.png";
import visaLogo from "../../../public/images/payment-method-logos/Visa.png";
import westernUnionLogo from "../../../public/images/payment-method-logos/western_union.png";

const PaymentMethodLogos = () => {
  const paymentOptions = [
    { id: 1, logo: amexLogo, title: "American Express" },
    { id: 2, logo: masterCardLogo, title: "MasterCard" },
    { id: 3, logo: payPalLogo, title: "PayPal" },
    { id: 4, logo: visaLogo, title: "Visa" },
    { id: 5, logo: westernUnionLogo, title: "Western Union" },
  ];

  return (
    <div className="flex items-center gap-2 px-5 lg:justify-left justify-left">
      {paymentOptions.map((brand) => (
        <div key={brand.id}>
          <img
            className="rounded-lg h-[40px] w-[60px]"
            src={brand.logo.src}
            alt={brand.title}
          />
        </div>
      ))}
    </div>
  );
};

export default PaymentMethodLogos;
