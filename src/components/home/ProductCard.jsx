const ProductCard = ({ product }) => {
  return (
    // <>
    //   {/* new product card */}
    //   <div className="card rounded-2xl mx-1 border hover:shadow-xl">
    //     {/* new product card figure */}
    //     <figure className="relative group">
    //       <div className="w-full rounded-2xl">
    //         <img
    //           src={product?.image}
    //           alt="car!"
    //           className="w-full rounded-2xl"
    //         />
    //       </div>
    //       <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 bg-blue-500 flex justify-end items-start p-2">
    //         {/* Your overlay content */}
    //         {/* Example icons */}
    //         <div className="icon bg-opacity-0 group-hover:bg-opacity-100">
    //           <i className="text-white">Icon 1</i>
    //         </div>
    //         <div className="icon bg-opacity-0 group-hover:bg-opacity-100">
    //           <i className="text-white">Icon 2</i>
    //         </div>
    //       </div>
    //     </figure>
    //   </div>
    // </>

    <>
      <div key={product.id} className="w-full p-2">
        <div className="border border-cyan-600 rounded-lg shadow-lg p-4 h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded-lg mb-2"
          />
          <h3 className="text-lg font-semibold mb-2 text-[#242A3A">{product.name}</h3>
          <a
            href={product.detailsLink}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded inline-block"
          >
            View Details
          </a>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
