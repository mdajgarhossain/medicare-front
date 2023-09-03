const SingleBrand = ({ brand }) => {
  return (
    <>
      <div className="rounded">
        <figure className="relative group">
          <div className="rounded-lg overflow-hidden">
            <img className="rounded-lg h-20" src={brand.img} alt="car!" />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-end items-start">
              <button className="w-full bg-[#01B26F] text-center font-semibold p-2 text-xl">
                {brand.title}
              </button>
            </div>
          </div>
        </figure>
      </div>
    </>
  );
};

export default SingleBrand;
