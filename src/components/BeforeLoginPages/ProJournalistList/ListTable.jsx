"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import userService from "../../../Services/user.service";
import { GET_ALL_MEDIA_LIST } from "../../../constants";
import tokenService from "../../../Services/token.service";

const ListTable = () => {
  // const [roleType, setRoleType] = useState(tokenService.getLocalRole());
  const [roleType, setRoleType] = useState(null);

  useEffect(() => {
    const role = tokenService.getLocalRole();
    setRoleType(role);
  }, []);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState(search); // add this if not already declared
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [allList, setAllList] = useState([]);
  const [token, setToken] = useState([]);

  const [totalCount, setTotalCount] = useState(0);
  const articlesPerPage = 10; // Assuming 10 articles per page
  const totalPages = Math.ceil(totalCount / articlesPerPage);

  const handlePagination = (operation) => {
    setCurrentPage((prevPage) => {
      if (
        operation === "increment" &&
        currentPage * articlesPerPage < totalCount
      ) {
        return prevPage + 1;
      } else if (operation === "decrement" && prevPage > 1) {
        return prevPage - 1;
      }

      return prevPage;
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);
  let allMedia = GET_ALL_MEDIA_LIST;

  const mediaList = (url) => {
    setIsLoading(true);
    userService
      .get(url)
      .then((res) => {
        if (res?.response?.status === "Ok") {
          setAllList(res?.data);
          setToken(res?.nextpagetoken?.token);
          setTotalCount(res?.nextpagetoken?.totalResult);
        }
      })
      .catch((errors) => {
        console.log(errors, "check error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // useEffect(() => {
  //   let url = allMedia;
  //   if (currentPage > 1 && token) {
  //     url += `&token=${encodeURIComponent(token)}`;
  //     mediaList(url);
  //   } else {
  //     mediaList(url);
  //   }
  // }, [currentPage]);

  // Debounce effect for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    let viewList = `${allMedia}`;

    if (currentPage > 1 && token && debouncedSearch?.length >= 1) {
      viewList += `?pageSize=10&token=${encodeURIComponent(token)}&SearchFilter=${debouncedSearch}`;
      mediaList(viewList);
      return;
    } else if (currentPage > 1 && token) {
      viewList += `?pageSize=10&token=${encodeURIComponent(token)}`;
      mediaList(viewList);
      return;
    } else if (debouncedSearch?.length >= 1) {
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        viewList += `?pageSize=10&SearchFilter=${debouncedSearch}`;
        mediaList(viewList);
      }
      return;
    } else {
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        mediaList(viewList);
      }
      return;
    }
  }, [currentPage, debouncedSearch]);

  return (
    <section
      className={`container mx-auto p-5 sm:p-10 ${
        roleType?.includes("Freebies") ||
        roleType?.includes("Agency") ||
        roleType?.includes("Enterprise")
          ? "lg:p-20 lg:pt-4"
          : "lg:p-20 lg:pt-0"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex justify-between items-center w-full lg:w-[300px] my-6 bg-white py-1 px-2 border rounded-lg border-black/20">
          <input
            className="focus-within:ring-0 outline-0 w-[100%] text-sm text-gray-600"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name"
          />

          <img
            className="w-6 h-6"
            src="/assets/search-icon.png"
            alt="Search icon"
          />
        </div>
      </div>

      <table className="w-full responsive-table">
        <thead>
          <tr
            // className="text-left text-[#F1F1E6]"
            className={
              !(
                roleType?.includes("Freebies") ||
                roleType?.includes("Agency") ||
                roleType?.includes("Enterprise")
              )
                ? `bg-[#01438D] border border-[#EAECF0] sm:text-sm px-4 py-3 text-[#F1F1E6]`
                : `bg-[#cccccc] border border-[#EAECF0] sm:text-sm px-4 py-3 text-gray-900`
            }
          >
            <th>
              <span className="flex items-center p-3">Name</span>
            </th>

            <th>
              <span className="flex items-center p-3">Description</span>
            </th>

            <th className="w-[120px]">
              <span className="flex items-center p-3">Location</span>
            </th>

            <th className="w-[100px]">
              <span className="flex items-center p-3">Action</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td className="text-center p-4" colSpan="4">
                Loading...
              </td>
            </tr>
          ) : allList?.length > 0 ? (
            allList?.map((curItem, index) => {
              return (
                <tr key={index}>
                  <td
                    data-label="Name"
                    className="text-[#002B5B] font-[500] text-sm px-4 py-3 border border-[#EAECF0]"
                  >
                    {curItem.listName}
                  </td>

                  <td
                    data-label="Description"
                    className="text-[#667085] text-sm px-4 py-3 border border-[#EAECF0]"
                  >
                    {curItem.description}
                  </td>

                  <td
                    data-label="Location"
                    className="text-[#667085] text-sm px-4 py-3 border border-[#EAECF0]"
                  >
                    {curItem.location}
                  </td>

                  <td
                    data-label=""
                    className="text-[#0055FF] text-sm px-4 py-3 border border-[#EAECF0] "
                  >
                    <Link
                      className="underline decoration-[#0055FF]"
                      href={
                        !(
                          roleType?.includes("Freebies") ||
                          roleType?.includes("Agency") ||
                          roleType?.includes("Enterprise")
                        )
                          ? `/view-list/${curItem.listName}/${curItem.skribeMediaListId}`
                          : `/view-journalists/${curItem.listName}/${curItem.skribeMediaListId}`
                      }
                    >
                      View List
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-2">
                {!isLoading && allList?.length <= 0 && "No Record Found"}
              </td>
            </tr>
          )}
          {/* {ListItems.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          ).map((item) => {
            return (
              <tr key={item.id}>
                <td
                  data-label="Name"
                  className="text-[#002B5B] font-[500] text-sm px-4 py-3 border border-[#EAECF0]"
                >
                  {item.name}
                </td>

                <td
                  data-label="Description"
                  className="text-[#667085] text-sm px-4 py-3 border border-[#EAECF0]"
                >
                  {item.description}
                </td>

                <td
                  data-label="Location"
                  className="text-[#667085] text-sm px-4 py-3 border border-[#EAECF0]"
                >
                  {item.location}
                </td>

                <td
                  data-label=""
                  className="text-[#0055FF] text-sm px-4 py-3 border border-[#EAECF0]"
                >
                  <Link
                    className="underline decoration-[#0055FF]"
                    href={item.linkTo}
                  >
                    View List
                  </Link>
                </td>
              </tr>
            );
          })} */}
        </tbody>
      </table>

      <div className="flex items-center">
        {allList?.length > 0 && allList.length < totalCount && (
          <div className="flex items-center justify-center my-2 text-center text-[15px] gap-4">
            <Link
              href="#"
              className={`p-2 pt-2 pb-1 rounded-[5px] border-[#333333] items-center justify-center border-[1px] ${
                currentPage === 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              onClick={() => currentPage > 1 && handlePagination("decrement")}
            >
              <span className="icon-16 text-sm  text-[#333333] material-icons-outlined">
                arrow_back
              </span>
            </Link>
            <div className="font-[500]">{currentPage + "/" + totalPages}</div>

            {currentPage !== totalPages && (
              <Link
                href="#"
                className={`p-2 pt-2 pb-1 rounded-[5px] border-[#333333] items-center justify-center border-[1px] ${
                  allList.length > 9
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`}
                onClick={() =>
                  allList.length > 9 && handlePagination("increment")
                }
              >
                <span className="icon-16 text-sm  text-[#333333] material-icons-outlined">
                  arrow_forward
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
      {/* <div className="overflow-auto pt-5 px-2 flex items-center gap-2 sm:gap-3 sm:px-4"> */}
      {/* <button
          className="flex items-center gap-2 pr-1 text-[#002B5B] text-sm sm:text-base disabled:opacity-50"
          type="button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <HiArrowSmallLeft /> Previous
        </button>

        {Array.from(
          { length: Math.ceil(ListItems.length / itemsPerPage) },
          (_, i) => {
            return (
              <button
                key={i}
                className={`${currentPage === i + 1 ? "bg-[#01438D] text-[#F5F5F5]" : "text-[#01438D]"} text-sm sm:text-base px-4 py-2 rounded-lg`}
                type="button"
                onClick={() => setCurrentPage(i + 1)}
              >
                {`${i + 1}`}
              </button>
            );
          }
        )}

        <button
          className="flex items-center gap-2 text-[#002B5B] pl-1 text-sm sm:text-base disabled:opacity-50"
          type="button"
          disabled={currentPage === Math.ceil(ListItems.length / itemsPerPage)}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next <HiArrowSmallRight />
        </button> */}
      {/* </div> */}
    </section>
  );
};

export default ListTable;
