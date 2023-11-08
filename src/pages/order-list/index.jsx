import Pagination from "@/components/common/table/Pagination";
import TheMenu from "@/components/common/table/TheMenu";
import DeleteCategoryModal from "@/components/modal/DeleteCategoryModal";
import { getBaseParams } from "@/utils/base-params";
import cookies from "@/utils/cookies";
import { medicareApi } from "@/utils/http";
import {
  DeleteActiveIcon,
  DeleteInactiveIcon,
  EditActiveIcon,
  EditInactiveIcon,
} from "@/utils/icons";
import { Menu } from "@headlessui/react";
import { EyeIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

const OrderList = () => {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modals, setModals] = useState({
    deleteCategoryModal: false,
  });
  const [thePagination, setThePagination] = useState({
    current_page: 1,
    last_page: 2,
    from: 1,
    to: 10,
    total: 13,
    limit: 60,
  });
  const [thePage, setThePage] = useState(1);
  const [thePerPage, setThePerPage] = useState(60);
  const [veryFirstLoad, setVeryFirstLoad] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [allOrders, setAllOrders] = useState([]);

  // Table columns attributes.
  let columns = [
    { title: "Order By", slug: "orderBy", sorting: true },
    { title: "Payment Method", slug: "paymentMethod", sorting: true },
    { title: "Payment Status", slug: "paymentStatus", sorting: true },
  ];

  function handlePagination(data) {
    setVeryFirstLoad(false);
    setThePage(data.thePage);
    router.push({
      query: { ...query, page: data.thePage },
    });
  }

  function handlePerPage(data) {
    setThePerPage(data.value);
    router.push({
      query: { ...query, limit: data.value },
    });
  }

  /**
   * Pagination
   * Data fetch
   */

  useEffect(() => {
    if (veryFirstLoad) {
      let query = router.query;
      let orderBy = query.orderBy ? query.orderBy : "";
      let getPage = query?.page ? parseInt(query?.page) : thePage;
      let getPerPage = query?.limit ? parseInt(query?.limit) : thePerPage;
      setThePage(getPage);
      setThePerPage(getPerPage);
      fetchOrder(getPage, orderBy);
    } else {
      fetchOrder();
    }
  }, [router?.query]);

  function fetchOrder(page = thePage, orderBy) {
    setIsDataLoading(true);
    let params = getBaseParams(router, thePerPage, page);
    params.sortDirection = "desc";
    params.include = "o.orderBy,o.updatedBy,o.products";
    params.orderBy = orderBy;

    medicareApi
      .get("/order", {
        params: params,
      })
      .then((response) => {
        setAllOrders(response?.data?.data);
        setThePagination(response.data?.pagination);
        setIsDataLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsDataLoading(false);
      });
  }

  /**
   * Go to order details page
   */
  function goToDetailsPage(data) {
    router.push(`/order-list/order-details?id=${data.id}`);
  }

  return (
    <Fragment>
      <div className="h-screen max-w-[1200px] mx-auto mt-10 lg:pb-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl text-[#242a44] font-semibold leading-6 text-gray-900">
              Orders
            </h1>
            <p className="mt-2 text-lg text-[#242a44">A list of orders</p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-sm font-semibold"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {allOrders?.map((item, id) => (
                        <tr key={item.id}>
                          <td className="whitespace-normal px-3 py-4 text-sm text-gray-500 capitalize">
                            {item?.orderBy?.name ?? "-"}
                          </td>
                          <td className="whitespace-normal px-3 py-4 text-sm text-gray-500 capitalize">
                            {item?.paymentMethod ?? "-"}
                          </td>
                          <td className="whitespace-normal px-3 py-4 text-sm text-gray-500 capitalize">
                            {item?.paymentStatus ?? "-"}
                          </td>

                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                            <TheMenu
                              strategy={item.length < 3 ? "fixed" : "absolute"}
                            >
                              <Menu.Items className=" z-50 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 ">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          goToDetailsPage(item);
                                        }}
                                        className={`${
                                          active
                                            ? "bg-violet-500 text-white"
                                            : "text-gray-900"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        {active ? (
                                          <EyeIcon
                                            className="mr-2 h-5 w-5 text-violet-400"
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <EyeIcon
                                            className="mr-2 h-5 w-5 text-violet-400"
                                            aria-hidden="true"
                                          />
                                        )}
                                        View Details
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </TheMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
        {(thePagination && allOrders?.length && (
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

export default OrderList;
