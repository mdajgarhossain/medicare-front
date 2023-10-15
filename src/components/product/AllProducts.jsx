import DeleteStudentModal from "@components/admin/student/DeleteStudentModal";
import EditStudentModal from "@components/admin/student/EditStudentModal";
import SearchInput from "@components/common/SearchInput";
import SearchSelect from "@components/global/SearchSelect";
import TheMenu from "@components/global/TheMenu";
import Pagination from "@components/global/table/Pagination";
import { Menu } from "@headlessui/react";
import { DocumentTextIcon, EyeIcon } from "@heroicons/react/24/outline";
import { getBaseParams } from "@utils/base-params";
import cookies from "@utils/cookies";
import { gqa } from "@utils/http";
import {
  DeleteActiveIcon,
  DeleteInactiveIcon,
  EditActiveIcon,
  EditInactiveIcon,
} from "@utils/icons";
import FriendHoc from "@utils/nextjs-friend";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
const Students = () => {
  const router = useRouter();
  const { query } = router;
  const [plansData, setPlansData] = useState < any > null;
  const [selectedStudentInfo, setSelectedStudentInfo] = useState < any > null;
  const [modals, setModals] = useState({
    editStudentModal: false,
    deleteStudentModal: false,
  });
  const [veryFirstLoad, setVeryFirstLoad] = useState(true);
  const [thePagination, setThePagination] = useState(null);
  const [thePage, setThePage] = useState(1);
  const [thePerPage, setThePerPage] = useState(10);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [statusOptions] = useState([
    { label: "Booked", value: "booked" },
    { label: "Completed", value: "completed" },
    { label: "Canceled", value: "canceled" },
  ]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const adminInfo = cookies.get("admin_user");
  // Table columns attributes.
  let columns = [
    { title: "Name", slug: "name", sorting: true },
    { title: "Email", slug: "email", sorting: true },
    { title: "Schedules Date", slug: "schedules", sorting: true },
    { title: "Schedules Time", slug: "schedulesTime", sorting: true },
    { title: "Meeting Link", slug: "meetingLink", sorting: true },
    { title: "Phone", slug: "phone", sorting: true },
    { title: "Timezone", slug: "timezone", sorting: true },
    // { title: "Address", slug: "address", sorting: true }, TODO After backend integration
  ];

  useEffect(() => {
    if (veryFirstLoad) {
      let query = router.query;
      let getPage = query?.page ? parseInt(query?.page) : thePage;
      let getPerPage = query?.per_page ? parseInt(query?.per_page) : thePerPage;
      setThePage(getPage);
      setThePerPage(getPerPage);
      fetchPlansData(getPage);
    } else {
      fetchPlansData();
    }
  }, [router?.query, selectedStatus]);

  // Use useEffect to trigger API call whenever the searchInput changes.
  useEffect(() => {
    let delayTimer;

    delayTimer = setTimeout(() => {
      fetchPlansData();
    }, 500);

    return () => clearTimeout(delayTimer);
  }, [searchInput]);

  /**
   * Handle pagination data.
   *
   * @param {object} data
   * @returns {void}
   */
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
      query: { ...query, per_page: data.value },
    });
  }

  function fetchPlansData(page = thePage) {
    setIsDataLoading(true);
    let params = getBaseParams(router, thePerPage, page);
    if (adminInfo?.type === "teacher") {
      params.teacher_id = adminInfo?.id;
    }
    if (searchInput) {
      params.query = searchInput;
    }

    params.status = selectedStatus;

    gqa
      .get(
        `/admin/${
          adminInfo?.type === "teacher" ? "teacher-wise-student" : "students"
        }`,
        {
          params: params,
        }
      )
      .then((response) => {
        setPlansData(response?.data?.students);
        setThePagination(response.data?.pagination);
        setIsDataLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsDataLoading(false);
      });
  }

  if (adminInfo?.type !== "teacher") {
    columns = columns.filter(
      (column) =>
        column.slug !== "schedules" &&
        column.slug !== "schedulesTime" &&
        column.slug !== "meetingLink"
    );
  }

  /**
   * Modal close emit
   * Common for all typeof modal.
   *
   * @returns {void}
   */
  function modalCloseEmit(data) {
    setModals((prevState) => ({
      ...prevState,
      [data.modalName]: false,
    }));
  }

  /**
   * Display Student edit modal.
   *
   * @param {object} data  - Student data.
   * @returns {void}
   */
  function editStudentModalOpen(data) {
    setSelectedStudentInfo(data);
    setModals((prevState) => ({
      ...prevState,
      editStudentModal: true,
    }));
  }

  /**
   * Display Student delte modal.
   *
   * @param {object} data  - Student data.
   * @returns {void}
   */
  function deleteStudentModalOpen(data) {
    setSelectedStudentInfo(data);
    setModals((prevState) => ({
      ...prevState,
      deleteStudentModal: true,
    }));
  }

  function goToDetailsPage(data) {
    router.push({
      pathname: `/admin/students/${data.id}/student-details`,
    });
  }

  function goToProfileDetailsPage(data) {
    router.push({
      pathname: "/admin/students/profile-details/",
      query: {
        id: data?.id,
      },
    });
  }

  return (
    <Fragment>
      {modals?.editStudentModal && (
        <EditStudentModal
          modalName="editStudentModal"
          modalStatus={modals?.editStudentModal}
          modalClose={modalCloseEmit}
          selectedStudentInfo={selectedStudentInfo}
          refetchDataEmit={() => fetchPlansData()}
        />
      )}
      {modals?.deleteStudentModal && (
        <DeleteStudentModal
          modalName="deleteStudentModal"
          modalStatus={modals?.deleteStudentModal}
          modalClose={modalCloseEmit}
          selectedStudentInfo={selectedStudentInfo}
          refetchDataEmit={() => fetchPlansData()}
        />
      )}

      <div className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-lg font-semibold leading-6 text-gray-900">
              Students
            </h1>
            <p className="mt-2 text-sm text-gray-700">A list of students</p>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-6 gap-6 items-end">
          {adminInfo?.type === "teacher" && (
            <div className=" w-full">
              <label className="block mb-2 font-medium leading-6 text-gray-900 text-lg">
                Select Status
              </label>
              <SearchSelect
                options={statusOptions}
                value={selectedStatus}
                onChange={(option) => {
                  setSelectedStatus(option?.value);
                }}
                insidePadding="2px 0"
                placeholder={
                  selectedStatus?.length ? selectedStatus : "Select status"
                }
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => `${option.label}`}
              />
            </div>
          )}
          <SearchInput
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Search by name, phone, email"
          />
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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
                        {/* {adminInfo?.type == "super_admin" ? (
                          <th>Action</th>
                        ) : (
                          ""
                        )} */}

                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {plansData?.length ? (
                        plansData?.map((plan, id) => (
                          <tr key={plan.id}>
                            <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">
                              {plan?.name}
                            </td>
                            <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">
                              {plan?.email ?? "-"}
                            </td>
                            {adminInfo?.type === "teacher" && (
                              <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">
                                {plan?.schedules.map((schedule) => (
                                  <p className="pb-2" key={schedule.id}>
                                    {schedule?.date}
                                  </p>
                                ))}
                              </td>
                            )}
                            {adminInfo?.type === "teacher" && (
                              <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">
                                {plan?.schedules.map((schedule) => (
                                  <p className="pb-2" key={schedule.id}>
                                    {schedule?.start_time.replace(/^0+/, "")} -{" "}
                                    {schedule?.end_time.replace(/^0+/, "")}
                                  </p>
                                ))}
                              </td>
                            )}
                            {adminInfo?.type === "teacher" && (
                              <td className="whitespace-normal px-3 py-4 text-sm text-gray-500"> 
                                {plan?.schedules.map((schedule) => (
                                  <a
                                    href={`${schedule?.zoom?.start_url}`}
                                    target="_blank"
                                    className="pb-2 grid text-primary"
                                    key={schedule.id}
                                  >
                                    Join Meeting
                                  </a>
                                ))}
                              </td>
                            )}
                            <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">
                              {plan?.phone_number ?? "-"}
                            </td>
                            <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">
                              {plan?.timezone ?? "-"}
                            </td>

                            {/* TODO After backend integration */}
                            {/* <td className="whitespace-normal px-3 py-4 text-sm text-gray-500">
                              <div>{plan?.address ?? "-"}</div>
                            </td> */}
                            {adminInfo?.type == "super_admin" ? (
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                                <TheMenu
                                  strategy={
                                    plan.length < 3 ? "fixed" : "absolute"
                                  }
                                >
                                  <Menu.Items className="z-50 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-1 py-1 ">
                                      <Menu.Item>
                                        {({ active }) => (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              editStudentModalOpen(plan);
                                            }}
                                            className={`${
                                              active
                                                ? "bg-violet-500 text-white"
                                                : "text-gray-900"
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                          >
                                            {active ? (
                                              <EditActiveIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            ) : (
                                              <EditInactiveIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            )}
                                            Edit
                                          </button>
                                        )}
                                      </Menu.Item>
                                    </div>
                                    <div className="px-1 py-1 ">
                                      <Menu.Item>
                                        {({ active }) => (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              goToDetailsPage(plan);
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
                                            View details
                                          </button>
                                        )}
                                      </Menu.Item>
                                    </div>
                                    <div className="px-1 py-1">
                                      <Menu.Item>
                                        {({ active }) => (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              deleteStudentModalOpen(plan);
                                            }}
                                            className={`${
                                              active
                                                ? "bg-violet-500 text-white"
                                                : "text-gray-900"
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                          >
                                            {active ? (
                                              <DeleteActiveIcon
                                                className="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true"
                                              />
                                            ) : (
                                              <DeleteInactiveIcon
                                                className="mr-2 h-5 w-5 text-violet-400"
                                                aria-hidden="true"
                                              />
                                            )}
                                            Delete
                                          </button>
                                        )}
                                      </Menu.Item>
                                    </div>
                                  </Menu.Items>
                                </TheMenu>
                              </td>
                            ) : (
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                                <TheMenu
                                  strategy={
                                    plan.length < 3 ? "fixed" : "absolute"
                                  }
                                >
                                  <Menu.Items className="z-50 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            goToProfileDetailsPage(plan);
                                          }}
                                          className={`${
                                            active
                                              ? "bg-violet-500 text-white"
                                              : "text-gray-900"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                          {active ? (
                                            <DocumentTextIcon
                                              className="mr-2 h-5 w-5 text-violet-400"
                                              aria-hidden="true"
                                            />
                                          ) : (
                                            <DocumentTextIcon
                                              className="mr-2 h-5 w-5 text-violet-400"
                                              aria-hidden="true"
                                            />
                                          )}
                                          View Profile
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </Menu.Items>
                                </TheMenu>
                              </td>
                            )}
                          </tr>
                        ))
                      ) : (
                        <tr className="text-center p-6 row-span-full">
                          <td className="p-6" colSpan={12}>
                            No Data Available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
        {(thePagination && plansData?.length && (
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

export default Students;
