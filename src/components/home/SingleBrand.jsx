const SingleBrand = ({ brand }) => {
  return (
    <>
      <div className="rounded">
        <figure className="relative group">
          <div className="overflow-hidden rounded-lg">
            <img className="h-20 rounded-lg" src={brand.img} alt="car" />
            <div className="absolute inset-0 flex items-start justify-end bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
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
