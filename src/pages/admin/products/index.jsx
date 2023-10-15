import Pagination from "@/components/common/table/Pagination";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

const AllProducts = () => {
  const router = useRouter();
  const [thePagination, setThePagination] = useState({
    current_page: 1,
    last_page: 2,
    from: 1,
    to: 10,
    total: 13,
    per_page: 10,
  });
  const [thePage, setThePage] = useState(1);
  const [thePerPage, setThePerPage] = useState(10);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      image: "images/new-products/product-1.jpeg",
      detailsLink: "/product/1", // Replace with actual product details link
    },
    {
      id: 2,
      name: "Product 2",
      image: "images/new-products/product-2.jpeg",
      detailsLink: "/product/2", // Replace with actual product details link
    },
    {
      id: 3,
      name: "Product 3",
      image: "images/new-products/product-3.jpeg",
      detailsLink: "/product/3", // Replace with actual product details link
    },
    {
      id: 4,
      name: "Product 4",
      image: "images/new-products/product-4.jpeg",
      detailsLink: "/product/3", // Replace with actual product details link
    },
    {
      id: 5,
      name: "Product 5",
      image: "images/new-products/product-5.jpeg",
      detailsLink: "/product/3", // Replace with actual product details link
    },
    {
      id: 6,
      name: "Product 6",
      image: "images/new-products/product-6.jpeg",
      detailsLink: "/product/3", // Replace with actual product details link
    },
  ]);

  // Table columns attributes.
  let columns = [
    { title: "ID", slug: "id", sorting: true },
    { title: "Name", slug: "name", sorting: true },
    { title: "Category", slug: "category", sorting: true },
  ];

  function handlePagination(data) {
    setThePage(data.thePage);
    router.push({
      query: { ...query, page: data.thePage },
    });
  }

  function handlePerPage(data) {
    setThePerPage(data.value);
    router.push({
      query: { ...query, per_page: data.value },
    });
  }

  return (
    <Fragment>
      <div className="px-4 sm:px-6 lg:px-8 mt-14">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl text-[#242a44] font-semibold leading-6 text-gray-900">
              Products
            </h1>
            <p className="mt-2 text-lg text-[#242a44">A list of products</p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-[#464e6e] px-3 py-2 text-center text-md font-semibold text-white shadow-sm hover:bg-[#464e6e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => router.push("products/add-product")}
            >
              + Add Product
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className=" min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      {columns?.map((column) => (
                        <th
                          key={column?.slug}
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          {column?.title}
                        </th>
                      ))}
                      {/* <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-sm font-semibold"
                        >
                          Action
                        </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {products?.map((item, id) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {item.id}
                        </td>
                        <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">
                          {item.name}
                        </td>
                        <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">
                          {item.category ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {(thePagination && products?.length && (
          <Pagination
            page={thePage}
            thePerPage={thePerPage}
            pagination={thePagination}
            perPageEmit={(data) => handlePerPage(data)}
            refetchDataEmit={(data) => handlePagination(data)}
          />
        )) ||
          ""}
      </div>
    </Fragment>
  );
};

export default AllProducts;
