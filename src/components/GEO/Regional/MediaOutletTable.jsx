import { useEffect, useState, useRef } from "react";
import OutletJouranlists from "../GeoCity/OutletJouranlists";
import userService from "../../../Services/user.service";
import { GETALLJOURNO } from "../../../constants";
import Link from "next/link";
// import { debug } from "util";
import { AiOutlineSearch } from "react-icons/ai";

const tableHeadings = [
  {
    id: 1,
    title: "Rank",
  },
  {
    id: 2,
    title: "Outlet Name",
  },
  {
    id: 3,
    title: "Media Type",
  },
  {
    id: 4,
    title: "Circulation",
  },
  {
    id: 5,
    title: "City",
  },
  {
    id: 6,
    title: "Editions",
  },
  {
    id: 7,
    title: "Action",
  },
];

const MediaOutletTable = ({
  search,
  setSearch,
  applySearch,
  data,
  load,
  token,
  loadMore,
  selectedCities,
  sortBy,
  trackingId,
  selectedFilters,
  setSelectedFilters,
  mediaFilter,
  languageFilter,
  outletFilter,
}) => {
  const [byJournalist, setbyJournalist] = useState([]);
  const [getToken, setGetToken] = useState("");
  const [totalResults, setTotalResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [outletId, setOutletId] = useState({});

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
        token
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

  //outlet journalist loading
  const [open, setOpen] = useState(false);

  let getJour = `${GETALLJOURNO}`;

  const outletJournalist = async (id, Name, token = null) => {
    getJour = `${getJour}?OutletFilter=${id}&IsFilter=false&CityFilter=${selectedCities}`;
    if (token) {
      getJour = `${getJour}&${token}`;
    }

    setLoading(true);

    try {
      const url4 = getJour;

      const [response4] = await Promise.all([userService.get(url4)]);
      if (response4?.response?.status === "Ok") {
        setbyJournalist((old) => [...old, ...response4?.data]);
        setGetToken(response4?.nextpagetoken?.token);
        setTotalResults(response4?.nextpagetoken?.totalResult);
        setOutletId({
          id,
          outletName: Name,
          totalResults: response4?.nextpagetoken?.totalResult,
          token: response4?.nextpagetoken?.token,
        });
        setOpen(true);
      }
    } catch (error) {
      console.log(error, "check error");
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (getToken) {
      let token = "token=" + encodeURIComponent(getToken);
      outletJournalist(outletId.id, outletId.outletName, token);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  const closePopup = () => {
    setOpen(false);
    setbyJournalist([]);
  };

  useEffect(() => {
    if (search?.trim().length === 0) {
      applySearch();
    }
  }, [search]);

  return (
    <>
      {open && (
        <OutletJouranlists
          outletId={outletId}
          loading={loading}
          data={byJournalist}
          open={open}
          onClose={closePopup}
          handleScroll={handleScroll}
          setbyJournalist={setbyJournalist}
        />
      )}

      <section className="container mx-auto px-5 pb-10">
        <div className="bg-[#E4E9EB] w-fit mb-3 py-2 px-3 rounded-full flex items-center gap-7">
          <input
            type="search"
            value={search}
            onChange={setSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applySearch();
              }
            }}
            placeholder="Search by Outlet Name"
            className="text-gray-700 bg-[#E4E9EB] outline-none text-sm"
          />

          <AiOutlineSearch
            size={20}
            className="text-[#40484B] cursor-pointer"
            onClick={applySearch}
          />
        </div>

        <div
          className="rounded-lg border-[1.5px] border-[#EAECF0] overflow-y-scroll h-[450px] overflow-x-auto"
          ref={tableRef}
        >
          <table className="w-full">
            <thead className="bg-[#FCFCFD] border-b border-[#EAECF0] sticky top-0">
              <tr>
                {tableHeadings?.length > 0 &&
                  tableHeadings?.map((heading) => {
                    return (
                      <th
                        key={heading.id}
                        className="text-left px-5 py-3 rounded-t-lg"
                      >
                        <div className="flex ">
                          <span className="flex items-center gap-2 bg-[#FCFCFD] text-[#667085] text-sm font-normal">
                            {heading.title}
                          </span>
                          {heading?.title === "Circulation" && (
                            <span
                              className="text-black material-icons-outlined cursor-pointer"
                              onClick={() => sortBy()}
                            >
                              unfold_more
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
              </tr>
            </thead>

            <tbody>
              {data && data?.length > 0
                ? data?.map((curItem) => {
                    return (
                      <tr
                        key={curItem?.serialNo}
                        className="border-b last:border-none last:rounded-lg border-[#EAECF0]"
                      >
                        <td className="text-left px-5 sm:w-[20px] py-3 text-sm">
                          {curItem?.serialNo}
                        </td>

                        <td className="text-left px-5 sm:w-1/5 py-3 text-sm text-[#002B5B] decoration-[#002B5B]">
                          <Link
                            className="underline cursor-pointer underline-offset-4 hover:underline-offset-0 hover:no-underline"
                            href="#"
                            onClick={() =>
                              outletJournalist(
                                curItem.bintOutletId,
                                curItem.vchOutletName
                              )
                            }
                          >
                            {curItem?.vchOutletName}
                          </Link>
                        </td>

                        <td className="text-left px-5 py-3 text-sm text-[#667085]">
                          {curItem?.vchMedia}
                        </td>

                        <td className="text-left px-5 py-3 text-sm text-[#667085]">
                          {curItem?.bintCirculationFig || "N/A"}
                        </td>
                        <td className="text-left px-5 py-3 text-sm text-[#667085]">
                          {curItem?.placeOfPublication
                            ?.charAt(0)
                            ?.toUpperCase() +
                            curItem?.placeOfPublication
                              ?.slice(1)
                              ?.toLowerCase() || "N/A"}
                        </td>

                        <td className="text-left px-5 py-3 text-sm text-[#667085]">
                          {curItem?.edition || 0}
                        </td>

                        <td className="sm:px-5">
                          <button
                            type="button"
                            className="px-3 cursor-pointer py-2 text-center text-xs rounded-md bg-[#003870] text-white"
                            onClick={() =>
                              outletJournalist(
                                curItem.bintOutletId,
                                curItem.vchOutletName
                              )
                            }
                          >
                            Preview
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : !load &&
                  !isFetchingRef.current && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center font-medium text-gray-700 pt-5"
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
    </>
  );
};

export default MediaOutletTable;
