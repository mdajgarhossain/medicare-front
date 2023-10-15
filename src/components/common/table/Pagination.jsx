import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { Fragment, useEffect, useState } from "react";
import SearchSelect from "../SearchSelect";

function Pagination({
  page,
  thePerPage,
  pagination,
  refetchDataEmit,
  perPageEmit,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [perPageOptions, setPerPageOptions] = useState([
    { label: "10 / page", value: 10 },
    { label: "25 / page", value: 25 },
    { label: "50 / page", value: 50 },
    { label: "100 / page", value: 100 },
  ]);
  const [perPage, setPerPage] = useState();

  useEffect(() => {
    let index = perPageOptions.findIndex(
      (x) => x.value === parseInt(thePerPage)
    );
    setSelectedOption(perPageOptions[index]);
    if (index !== -1) {
      setPerPage(perPageOptions[index]);
    } else {
      setPerPage(perPageOptions[0]);
    }
  }, [thePerPage]);

  useEffect(() => {
    let theOptions = Array.from(
      { length: pagination?.last_page ?? 0 },
      (_, i) => ({ value: i + 1, label: `${i + 1}` })
    );
    let index = theOptions.findIndex((x) => x.value === parseInt(page));
    if (index !== -1) {
      setSelectedOption(theOptions[index]);
    }
    setOptions(theOptions);
  }, [pagination]);

  function pickPage(page, type = "default") {
    if (type === "next") {
      if (page !== pagination.last_page) {
        let thePage = page;
        thePage = thePage + 1;
        refetchDataEmit({ thePage: thePage });
      }
    } else if (type === "previous") {
      if (page > 1) {
        let thePage = page;
        thePage = thePage - 1;
        refetchDataEmit({ thePage: thePage });
      }
    } else {
      refetchDataEmit({ thePage: page });
    }
  }

  function pickPerPage(value) {
    setPerPage(value);
    perPageEmit(value);
  }

  function handleChange(selectedOption) {
    setSelectedOption(selectedOption);
    pickPage(selectedOption.value);
  }

  return (
    <Fragment>
      <nav
        className="flex flex-wrap justify-center items-center lg:justify-between mt-2 border-2 rounded bg-gray-100 px-4 py-3 sm:px-6"
        aria-label="Pagination"
      >
        <div>
          <SearchSelect
            options={perPageOptions}
            menuPlacement="top"
            isSearchable={false}
            onChange={(data) => pickPerPage(data)}
            value={JSON.stringify(perPage) !== "{}" ? perPage : false}
            getOptionValue={(item) => item.value}
            getOptionLabel={(item) => `${item.label}`}
            width={"130px"}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        </div>
        <div className=" sm:block flex flex-1 ml-10">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{pagination?.from}</span> to
            <span className="font-medium ml-1">{pagination?.to}</span> of{" "}
            <span className="font-medium">{pagination?.total}</span> results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <p className="mt-2 mr-2">page: </p>
          <div className="mr-2">
            <SearchSelect
              options={options}
              menuPlacement="top"
              onChange={(data) => handleChange(data)}
              value={
                JSON.stringify(selectedOption) !== "{}" ? selectedOption : false
              }
              getOptionValue={(item) => item.value}
              getOptionLabel={(item) => `${item.label}`}
              width={"120px"}
            />
          </div>
          <p
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 cursor-pointer "
            onClick={() => pickPage(page, "previous")}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </p>
          <p
            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 cursor-pointer"
            onClick={() => pickPage(page, "next")}
          >
            <ArrowRightIcon className="w-5 h-5" />
          </p>
        </div>
      </nav>
    </Fragment>
  );
}

export default Pagination;
