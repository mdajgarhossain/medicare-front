import SingleBrand from "./SingleBrand";

const Brand = () => {
  const brands = [
    { id: 1, img: "images/brand/brand-1.jpg", title: "Brand 1" },
    { id: 3, img: "images/brand/brand-3.jpg", title: "Brand 3" },
    { id: 2, img: "images/brand/brand-2.jpg", title: "Brand 2" },
    { id: 4, img: "images/brand/brand-4.jpg", title: "Brand 4" },
    { id: 5, img: "images/brand/brand-5.jpg", title: "Brand 5" },
    { id: 6, img: "images/brand/brand-6.jpg", title: "Brand 6" },
    { id: 7, img: "images/brand/brand-7.jpg", title: "Brand 7" },
    { id: 8, img: "images/brand/brand-8.jpg", title: "Brand 8" },
    { id: 9, img: "images/brand/brand-9.jpg", title: "Brand 9" },
    { id: 10, img: "images/brand/brand-10.jpg", title: "Brand 10" },
    { id: 11, img: "images/brand/brand-11.jpg", title: "Brand 11" },
  ];

  return (
    <>
      <div className="py-6">
        <div className="pb-4">
          <div className="pb-4 text-center max-w-[600px] mx-auto">
            <h2 className="headline">Our Brands</h2>
          </div>
          <div className="grid grid-cols-4 bg-[#a67ba1] rounded-md px-3 md:px-5 md:grid-cols-6 gap-4 py-3 lg:flex items-center justify-center">
            {brands.map((brand) => (
              <SingleBrand brand={brand} key={brand.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Brand;
