import { useState, useEffect, useRef } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/bundle";

// // import "swiper/swiper-element.css";
// import "swiper/swiper.css"; // For Swiper core styles
// // import "swiper/navigation.css";
import ProductCard from "./ProductCard";

SwiperCore.use([Navigation]);

const NewProducts = () => {
  const [products, setProduct] = useState([
    {
      id: 1,
      name: "Product 1",
      image: "images/demo-product-images/demoImage.jpg",
      detailsLink: "/product/1", // Replace with actual product details link
    },
    {
      id: 2,
      name: "Product 2",
      image: "images/demo-product-images/demoImage.jpg",
      detailsLink: "/product/2", // Replace with actual product details link
    },
    {
      id: 3,
      name: "Product 3",
      image: "images/demo-product-images/demoImage.jpg",
      detailsLink: "/product/3", // Replace with actual product details link
    },
    {
      id: 4,
      name: "Product 4",
      image: "images/demo-product-images/demoImage.jpg",
      detailsLink: "/product/3", // Replace with actual product details link
    },
    {
      id: 5,
      name: "Product 5",
      image: "images/demo-product-images/demoImage.jpg",
      detailsLink: "/product/3", // Replace with actual product details link
    },
    {
      id: 6,
      name: "Product 6",
      image: "images/demo-product-images/demoImage.jpg",
      detailsLink: "/product/3", // Replace with actual product details link
    },
    {
      id: 7,
      name: "Product 7",
      image: "images/demo-product-images/demoImage.jpg",
      detailsLink: "/product/3", // Replace with actual product details link
    },
    // Add more demo products as needed
  ]);
  console.log(products);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await axios.get(`/v1/product`);
  //       console.log(response)
  //       const slideArray = response.data.slice(0,11)
  //       setProduct(slideArray);
  //     } catch (error) {
  //       console.error("Error fetching product:", error);
  //     }
  //   };

  //   fetchProduct();
  // }, []);

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
    <div className="pt-4 px-3 md:px-5 lg:px-0">
      <div className="text-center max-w-[600px] mx-auto">
        <h2 className="my_h2">New Products</h2>
      </div>
      <div className="mt-4">
        <Swiper
          className="h-full sm:h-auto md:h-full lg:h-auto xl:h-full"
          ref={swiperRefDes}
        >
          <div className="swiper-wrapper">
            {/* show last added 10 products */}
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default NewProducts;
