"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GetTrackingInfo from "../Filters/GetTrackingInfo";

const InstaFilters = ({
  type,
  filterLoading,
  filters,
  selectedFilters,
  setSelectedFilters,
  trackingId,
}) => {
  const [active, setActive] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [allValue, setAllValue] = useState();
  const pathname = usePathname();
  const userId = JSON.parse(localStorage.getItem("userInfo"));
  let pathvalue = pathname.split("/").filter((part) => part !== "");
  let urlRead = pathvalue[0];
  useEffect(() => {
    setAllValue(filters);
  }, [filters]);

  const handleCheckboxChange = (e) => {
    const { id, value, checked } = e.target;

    if (checked) {
      GetTrackingInfo(type, id, urlRead, userId.id, trackingId);
    }

    // Update selectedFilters based on checkbox change
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      // Initialize the array if it doesn't exist
      if (!updatedFilters[type]) {
        updatedFilters[type] = [];
      }

      // Add or remove the value based on checkbox state
      if (checked && !updatedFilters[type].includes(value)) {
        updatedFilters[type].push(value); // Add value
      } else if (!checked) {
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== value
        ); // Remove value
      }

      // Remove the key if the array is empty
      if (updatedFilters[type].length === 0) {
        delete updatedFilters[type];
      }
      // Optionally, update count or any other properties
      updatedFilters.count = Object.keys(updatedFilters).reduce(
        (total, key) => {
          if (Array.isArray(updatedFilters[key])) {
            return total + updatedFilters[key].length;
          }
          return total;
        },
        0
      );

      return updatedFilters;
    });
  };

  const searchResult = (e, name) => {
    console.log(name);
    const { value: val } = e.target;

    let result = filters?.filter((curItem) =>
      curItem?.toLowerCase().includes(val?.toLowerCase())
    );
    if (result?.length > 0) {
      setAllValue(result);
    } else {
      setAllValue([{ value: `No ${name} Exist` }]);
    }
  };
  const clearButton = () => {
    setSearchInput("");
    setAllValue(filters);
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2"></div>
      <h3
        onClick={() => setActive(!active)}
        className="flex cursor-pointer items-center justify-between pb-2 text-sm font-medium text-gray-600 hover:text-gray-800"
      >
        {type}
        <span
          className={
            active
              ? "material-icons-outlined cursor-pointer transition-all"
              : "material-icons-outlined -rotate-90 cursor-pointer transition-all"
          }
        >
          expand_more
        </span>
      </h3>
      <div>
        <div
          className={`scroll max-h-60 overflow-y-auto border-l border-[#6521AD] bg-[#f1f1f1]  pr-0 ${
            active && "my-4 mt-0 pb-3 pl-4 pt-0 "
          }`}
        >
          <div
            style={{ display: `${active ? "block" : "none"}` }}
            className="my-3 mb-2 mr-3"
          >
            <div className=" flex items-center   rounded-md border border-gray-200 bg-zinc-50 pl-2 xl:w-full ">
              <span className="material-icons-outlined text-sm text-gray-600">
                search
              </span>
              <input
                type="text"
                onKeyUp={(e) => searchResult(e, type)}
                value={searchInput}
                onChange={(e) => setSearchInput(e?.target?.value)}
                className="w-full rounded-lg bg-zinc-50 px-3 py-2 text-sm text-gray-400 focus:outline-none"
                placeholder={`Search ${
                  type?.charAt(0)?.toUpperCase() + type?.slice(1)
                }`}
              />

              {searchInput?.length > 0 && (
                <span
                  onClick={clearButton}
                  className="material-icons-outlined icon-14 cursor-pointer pr-2 text-xs uppercase text-gray-700 hover:text-gray-900 hover:underline hover:no-underline"
                >
                  close
                </span>
              )}
            </div>
          </div>

          <ul
            className="space-y-1"
            style={{ display: `${active ? "block" : "none"}` }}
          >
            {allValue?.map((curItem, index) => (
              <li key={index}>
                {curItem.value === `No ${type} Exist` ? (
                  `No ${type} Exist`
                ) : (
                  <label className="text-sm text-gray-400 ">
                    <input
                      type="checkbox"
                      className="peer/published w-3 h-3 accent-[#FF3EA5] hover:accent-[#FF3EA5] mr-2"
                      id={index}
                      value={curItem}
                      checked={selectedFilters[type]?.includes(
                        curItem.toString()
                      )}
                      onChange={(e) => handleCheckboxChange(e)}
                    />{" "}
                    {curItem}
                  </label>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InstaFilters;
