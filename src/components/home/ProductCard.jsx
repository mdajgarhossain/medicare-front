import Link from "next/link";
import DemoImage from "public/images/demo-product-images/demoImage.jpg";

const ProductCard = ({ product }) => {
  // Populate Image
  const getImage = (url, image) => {
    if (url && image) {
      return `${url}${image}`;
    } else {
      return DemoImage.src;
    }
  };

  return (
    <>
      <div key={product.id} className="w-full p-2">
        <div className="h-full p-4 border rounded-lg shadow-lg border-cyan-600">
          <img
            src={getImage(
              process.env.NEXT_PUBLIC_IMAGE_BASE_URL,
              product?.attachments?.data[0]?.src
            )}
            alt={product.name}
            className="object-cover w-full h-40 mb-2 rounded-lg"
          />
          <h3 className="text-lg font-medium mb-2 text-[#242A3A">
            {product.name}
          </h3>
          <Link
            href={`products/product-details?id=${product?.id}`}
            className="inline-block px-4 py-2 font-semibold text-white rounded bg-cyan-600 hover:bg-cyan-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
