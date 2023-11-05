import { useState, useEffect, useRef } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/bundle";
import ProductCard from "./ProductCard";
import { medicareApi } from "@/utils/http";

SwiperCore.use([Navigation]);

const NewProducts = () => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  /** Fetch products from api */
  const fetchProducts = () => {
    setIsDataLoading(true);
    let params = {
      limit: 10,
      sortDirection: "desc",
      include:
        "product.stocks,product.attachments,product.category,product.subcategory",
    };

    medicareApi
      .get(`/product`, {
        params: params,
      })
      .then((response) => {
        setProducts(response.data.data);
        setIsDataLoading(false);
      })
      .catch((error) => {
        setIsDataLoading(false);
      });
  };

  const swiperRefDes = useRef(null);

  useEffect(() => {
    const swiperInstance = new SwiperCore(".swiper", {
      slidesPerView: getSlidesPerView(),
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop: true,
      modules: [Autoplay, Navigation],
    });

    function getSlidesPerView() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1024) {
        return 4;
      } else if (screenWidth >= 768) {
        return 3;
      } else if (screenWidth >= 500) {
        return 2;
      } else {
        return 1;
      }
    }

    window.addEventListener("resize", handleResize);

    function handleResize() {
      const slidesPerView = getSlidesPerView();
      swiperInstance.params.slidesPerView = slidesPerView;
      swiperInstance.update();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="px-3 pt-4 md:px-5 lg:px-0">
      <div className="text-center max-w-[600px] mx-auto">
        <h2 className="headline text-[#5f27cd]">New Products</h2>
      </div>
      <div className="mt-4">
        <Swiper
          className="h-full sm:h-auto md:h-full lg:h-auto xl:h-full"
          ref={swiperRefDes}
        >
          {/* <div className="swiper-wrapper"> */}
          {isDataLoading ? (
            <div className="flex items-center justify-center h-96">
              <svg
                className="animate-spin h-16 w-16 text-gray-400"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm8 8a8 8 0 008-8h4a12 12 0 01-12 12v-4zm0-16a8 8 0 018 8H8a12 12 0 01-12-12v4z"
                />
              </svg>
            </div>
          ) : (
            <div className="swiper-wrapper">
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </div>
          )}
          {/* </div> */}
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default NewProducts;
