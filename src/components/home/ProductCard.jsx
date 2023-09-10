const ProductCard = ({ product }) => {
  return (
    <>
      <div key={product.id} className="w-full p-2">
        <div className="h-full p-4 border rounded-lg shadow-lg border-cyan-600">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-40 mb-2 rounded-lg"
          />
          <h3 className="text-lg font-semibold mb-2 text-[#242A3A">{product.name}</h3>
          <a
            href={product.detailsLink}
            className="inline-block px-4 py-2 font-semibold text-white rounded bg-cyan-600 hover:bg-cyan-700"
          >
            View Details
          </a>
        </div>
      </div>
    </>
  );
};

export default ProductCard;