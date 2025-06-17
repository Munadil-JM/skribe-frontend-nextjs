"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { STATICCOUNT } from "../../../constants";

const tableHeadings = [
  {
    id: 1,
    title: "",
  },
  {
    id: 2,
    title: "Journalist",
  },
  {
    id: 3,
    title: "Outlet Name",
  },
  {
    id: 4,
    title: "Media Type",
  },
  {
    id: 5,
    title: "Designation",
  },
  {
    id: 6,
    title: "City",
  },
];

const JournalistsTable = ({
  search,
  setSearch,
  applySearch,
  load,
  token,
  selectAllLabel,
  loadMore,
  selectedJournalistsLength,
  showJourno,
  byJournalist,
  handleSelectAll,
  totalJournalists,
  addInCRM,
  buildCampPopup,
  disabled,
  onCheckboxChange,
  selectedJournalists,
}) => {
  const tableRef = useRef(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const container = tableRef.current;

    if (!container) {
      return;
    }

    const handleScroll = () => {
      if (
        container.scrollHeight - container.scrollTop <=
          container.clientHeight + 50 &&
        !load &&
        !isFetchingRef.current &&
        token &&
        !disabled
      ) {
        isFetchingRef.current = true;
        loadMore();
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [loadMore, load, token]);

  useEffect(() => {
    if (!load) {
      isFetchingRef.current = false;
    }
  }, [load]);

  useEffect(() => {
    if (search?.trim().length === 0) {
      applySearch();
    }
  }, [search]);

  function toPascalCase(cityString) {
    return cityString
      ?.split(",")
      .map((city) => {
        city = city.trim(); // Remove extra spaces
        // Capitalize the first letter of each word
        return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
      })
      .join(", "); // Join cities with comma and space
  }
  return (
    <section className="container mx-auto px-5 pb-10">
      <div className="flex items-center gap-2 mb-3">
        {showJourno && (
          <div className="w-full">
            <div className="flex items-center flex-wrap gap-4 justify-between w-full">
              <div className="bg-[#E4E9EB] py-2 px-3 rounded-full flex items-center gap-7">
                <input
                  type="search"
                  value={search}
                  onChange={setSearch}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      applySearch();
                    }
                  }}
                  placeholder="Search by Journalist Name"
                  className="text-gray-700 bg-[#E4E9EB] outline-none text-sm"
                />

                <AiOutlineSearch
                  size={20}
                  className="text-[#40484B] cursor-pointer"
                  onClick={applySearch}
                />
              </div>

              {byJournalist?.length > 0 && (
                <div className="relative flex gap-x-3 items-center whitespace-nowrap">
                  <Link
                    className="flex items-center whitespace-nowrap rounded-[5px] border border-[#002b5b] px-3 py-1 text-xs text-[#002b5b]"
                    href=""
                    onClick={handleSelectAll}
                  >
                    {selectAllLabel}

                    {selectedJournalistsLength !== 0 && (
                      <div
                        id="selectCount"
                        className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-[#fac540] text-center align-middle text-xs font-bold text-[#002b5b]"
                      >
                        {selectAllLabel === "Unselect All" &&
                        totalJournalists <= STATICCOUNT
                          ? totalJournalists
                          : selectAllLabel === "Unselect All"
                            ? STATICCOUNT
                            : selectedJournalistsLength}
                      </div>
                    )}
                  </Link>

                  <input
                    type="button"
                    value="Add To CRM"
                    // disabled={selectedJournalists.length > 5 && true}
                    className="flex cursor-pointer items-center whitespace-nowrap rounded-[5px] border border-[#002b5b] px-3 py-1 text-xs text-[#002b5b]"
                    // href="/customcrm"
                    onClick={() => addInCRM()}
                  />

                  <div className="relative flex">
                    <Link
                      href="#"
                      onClick={() => buildCampPopup()}
                      className="relative flex items-center rounded-[5px] border border-[#002b5b] px-3 py-1 text-xs text-[#002b5b]"
                    >
                      Create List
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div
        className="rounded-lg border-[1.5px] border-[#EAECF0] overflow-x-auto h-[500px] overflow-y-scroll"
        ref={tableRef}
      >
        <table className="w-full overflow-visible">
          <thead className="bg-[#FCFCFD] border-b border-[#EAECF0] sticky top-0">
            <tr>
              {tableHeadings?.length > 0 &&
                tableHeadings?.map((heading) => {
                  return (
                    <th
                      key={heading.id}
                      className="text-left px-5 py-3 rounded-t-lg"
                    >
                      <span className="flex items-center gap-2 bg-[#FCFCFD] text-[#667085] text-sm font-normal">
                        {heading.title}
                      </span>
                    </th>
                  );
                })}
            </tr>
          </thead>

          <tbody>
            {byJournalist && byJournalist?.length > 0
              ? byJournalist?.map((item) => {
                  return (
                    <tr
                      key={item?.intJournalistId}
                      className="border-b last:border-none last:rounded-lg border-[#EAECF0]"
                    >
                      <td className="text-left px-5 sm:w-[20px] py-3 text-sm">
                        <input
                          type="checkbox"
                          name={item?.intJournalistId}
                          id={item?.intJournalistId}
                          className="peer/published h-4 w-4 accent-[#0070FF]"
                          value="abc"
                          disabled={disabled}
                          checked={selectedJournalists.includes(
                            item?.intJournalistId
                          )}
                          onChange={(e) =>
                            onCheckboxChange(e.target, item?.intJournalistId)
                          }
                        />
                      </td>

                      <td className="text-left px-5 sm:w-2/5 py-3 text-sm text-[#667085]">
                        <div className="flex gap-x-2 items-center">
                          <div className="flex items-center gap-x-2">
                            <Link
                              className="underline cursor-pointer underline-offset-4 hover:underline-offset-0 hover:no-underline"
                              href={`/journalist-profile/${item?.intJournalistId}`}
                              target="_blank"
                            >
                              {item?.vchJournalistName}
                            </Link>

                            {!!item?.crmStatus && (
                              <div className="px-1 text-center text-xs bg-green-600  font-medium text-white rounded-sm">
                                Added to CRM
                              </div>
                            )}
                          </div>

                          {item?.intShutShop === 64 && (
                            <div className="bg-red-600 px-2 text-xs uppercase text-white">
                              Left Journalism
                            </div>
                          )}

                          {item?.intShutShop === 65 && (
                            <div className="bg-green-500 px-2 text-xs uppercase text-white">
                              In transition
                            </div>
                          )}

                          {item?.intShutShop === 66 && (
                            <div className="bg-orange-500  px-2 text-xs uppercase text-white">
                              Moved Abroad
                            </div>
                          )}

                          {item?.intShutShop === 67 && (
                            <div className="bg-red-600  px-2 text-xs uppercase text-white">
                              RIP
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="text-left px-5 py-3 text-sm text-[#667085]">
                        {item?.vchOutletName}
                      </td>

                      <td className="text-left px-5 py-3 text-sm text-[#667085]">
                        {item?.vchMediaType}
                      </td>

                      <td className="text-left px-5 py-3 text-sm text-[#667085]">
                        {item?.vchJournoTitle || "N/A"}
                      </td>

                      <td className="text-left px-5 py-3 text-sm text-[#667085]">
                        {/* {item?.vchCity} */}
                        {toPascalCase(item?.vchCity)}
                      </td>
                    </tr>
                  );
                })
              : !load &&
                !isFetchingRef.current && (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center pt-5 text-gray-700 font-medium"
                    >
                      No Record Found
                    </td>
                  </tr>
                )}
          </tbody>
        </table>

        {/* {token && (
          <div className="flex items-center">
            {load ? (
              <span className="mx-auto my-5 rounded-md bg-gray-500 px-3 py-2 text-sm font-normal text-white  md:w-auto md:border-0">
                Loading...
              </span>
            ) : (
              <Link
                href="#"
                onClick={() => loadMore()}
                className="mx-auto my-5 rounded-md bg-[#002b5b] px-3 py-2 text-sm font-normal text-white  md:w-auto md:border-0"
              >
                Load more
              </Link>
            )}
          </div>
        )} */}

        {load && (
          <div className="text-center my-4 text-sm text-gray-500">
            Loading...
          </div>
        )}
      </div>
    </section>
  );
};

export default JournalistsTable;
