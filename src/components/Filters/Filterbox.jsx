"use client";

import { useSelections } from "ahooks";
import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import Link from "next/link";
import CityFilter from "./CityFilter";

const Filterbox = ({ name, data }) => {
  const { selected, isSelected, toggle } = useSelections(data);
  const { prev, set, initOpen } = useFilter();

  const [searchInput, setSearchInput] = useState("");
  const [target, setTarget] = useState("");
  const [isDispatch, setIsDispatch] = useState(false);
  const [flag, setFlag] = useState(0);
  // const [order, setOrder] = useState([]);
  const [metroCity, setMetroCity] = useState([]);
  const [tier1City, setTier1City] = useState([]);
  const [tier2City, setTier2City] = useState([]);
  const [tier3City, setTier3City] = useState([]);
  const [tier9City, setTier9City] = useState([]);

  /* TODO: */
  const [isOpen, setIsOpen] = useState(initOpen === name ? false : false);

  // const [isCityOpen, setIsCityOpen] = useState(
  //   initOpen === name ? false : false
  // );

  const [isData, setisData] = useState(data);

  useEffect(() => {
    if (isDispatch) {
      set({ ...prev, [target]: selected, count: prev["count"] + flag });
      setIsDispatch((prev) => !prev);
    }
  }, [isDispatch]);

  useEffect(() => {
    isData?.length > 0 &&
      isData?.map((curCity) => {
        if (curCity?.order == "0") {
          setMetroCity((prevState) => [...prevState, curCity]);
        } else if (curCity?.order == "1") {
          setTier1City((prevState) => [...prevState, curCity]);
        } else if (curCity?.order == "2") {
          setTier2City((prevState) => [...prevState, curCity]);
        } else if (curCity?.order == "3") {
          setTier3City((prevState) => [...prevState, curCity]);
        } else if (curCity?.order == "9") {
          setTier9City((prevState) => [...prevState, curCity]);
        }
      });
    // const userPrefsIdsSet = [...new Set(isData?.map((item) => item.order))];
    // if (userPrefsIdsSet) {
    //   setOrder(userPrefsIdsSet);
    // }
  }, []);

  const clearButton = () => {
    setSearchInput("");
    setisData(data);
    //   setHidden(false);
  };

  const searchResult = (e, name) => {
    const { value: val } = e.target;
    let result = data?.filter((curItem) =>
      curItem?.value?.toLowerCase().includes(val?.toLowerCase())
    );
    if (result.length > 0) {
      setisData(result);
    } else {
      setisData([{ value: `No ${name} Exist` }]);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {!!selected &&
          selected?.map((curElem, index) => (
            <div
              key={index}
              className="flex items-center rounded-md border border-gray-400 px-2"
            >
              <span className="pr-2 lowercase first-letter:uppercase">
                {curElem?.split(" ").splice(1).join(" ", ",")}
              </span>
              <Link
                href=""
                checked={isSelected(curElem)}
                data-checked={name}
                onChange={() => {}}
                onClick={(event) => {
                  const { checked } = event.target.dataset;
                  if (isSelected(curElem)) setFlag(-1);
                  else setFlag(1);
                  setTarget(checked);
                  setIsDispatch((prev) => !prev);
                  toggle(curElem);
                }}
                className="material-icons-outlined icon-16 rounded-full text-gray-400 hover:text-gray-800"
              >
                close
              </Link>
            </div>
          ))}
      </div>

      <h3
        onClick={() => setIsOpen((prev) => !prev)}
        className={
          isOpen
            ? "flex cursor-pointer items-center justify-between pb-2 text-sm font-bold text-[#6521AD]"
            : "flex cursor-pointer items-center justify-between pb-2 text-sm font-medium text-gray-600 hover:text-gray-800"
        }
      >
        {name?.slice(0, 1).toUpperCase()}
        {name?.slice(1)}
        <span
          className={
            isOpen
              ? "material-icons-outlined transition-all "
              : "material-icons-outlined -rotate-90 transition-all"
          }
        >
          expand_more
        </span>
      </h3>

      <div
        className={`scroll max-h-60 overflow-y-auto border-l border-[#6521AD] bg-[#f1f1f1]  pr-0  ${
          isOpen && "my-4 mt-0 pb-3 pl-4 pt-0 "
        } `}
      >
        <ul style={{ display: `${isOpen ? "block" : "none"}` }}>
          {metroCity?.length > 0 && (
            <CityFilter
              metroCity={metroCity}
              setMetroCity={setMetroCity}
              name={name}
              fName="Metro City"
              isSelected={isSelected}
              setFlag={setFlag}
              setTarget={setTarget}
              // isDispatch={setIsDispatch((prev) => !prev)}
              setIsDispatch={setIsDispatch}
              toggle={toggle}
            />
          )}
          {tier1City?.length > 0 && (
            <CityFilter
              metroCity={tier1City}
              setMetroCity={setTier1City}
              name={name}
              fName="Tier 1 City"
              isSelected={isSelected}
              setFlag={setFlag}
              setTarget={setTarget}
              // isDispatch={setIsDispatch((prev) => !prev)}
              setIsDispatch={setIsDispatch}
              toggle={toggle}
            />
          )}
          {tier2City?.length > 0 && (
            <CityFilter
              metroCity={tier2City}
              setMetroCity={setTier2City}
              name={name}
              fName="Tier 2 City"
              isSelected={isSelected}
              setFlag={setFlag}
              setTarget={setTarget}
              // isDispatch={setIsDispatch((prev) => !prev)}
              setIsDispatch={setIsDispatch}
              toggle={toggle}
            />
          )}
          {tier3City?.length > 0 && (
            <CityFilter
              metroCity={tier3City}
              setMetroCity={setTier3City}
              name={name}
              fName="Tier 3 City"
              isSelected={isSelected}
              setFlag={setFlag}
              setTarget={setTarget}
              // isDispatch={setIsDispatch((prev) => !prev)}
              setIsDispatch={setIsDispatch}
              toggle={toggle}
            />
          )}

          {tier9City?.length > 0 && (
            <CityFilter
              metroCity={tier9City}
              setMetroCity={setTier9City}
              name={name}
              fName="Tier 4 City"
              isSelected={isSelected}
              setFlag={setFlag}
              setTarget={setTarget}
              // isDispatch={setIsDispatch((prev) => !prev)}
              setIsDispatch={setIsDispatch}
              toggle={toggle}
            />
          )}

          {/* <div className="flex flex-col flex-wrap gap-y-0">
            {!hidden &&
              name === "city" &&
              order?.length > 0 &&
              order?.includes(0) && (
                <h3
                  onClick={() => setIsCityOpen((prev) => !prev)}
                  className="mb-0 mt-1 flex cursor-pointer items-center justify-between text-sm font-bold leading-none text-[#6521AD]"
                >
                  Metro
                  <span
                    className={
                      isCityOpen
                        ? "material-icons-outlined transition-all "
                        : "material-icons-outlined -rotate-90 transition-all"
                    }
                  >
                    expand_more
                  </span>
                </h3>
              )}
            <div className="flex flex-row flex-wrap gap-y-1">
              <ul style={{ display: `${isCityOpen ? "block" : "none"}` }}>
                {name === "city" &&
                  isData.map((curItem) => {
                    if (curItem.order === 0) {
                      return (
                        <>
                          <li
                            key={`${curItem?.id}-${curItem?.value}`}
                            className="flex w-full gap-x-2"
                          >
                            {curItem?.value === `No ${name} Exist` ? (
                              ""
                            ) : (
                              <input
                                type="checkbox"
                                checked={isSelected(
                                  curItem?.id + " " + curItem?.value
                                )}
                                id={curItem?.value}
                                data-checked={name}
                                onChange={() => {}}
                                onClick={(event) => {
                                  const { checked } = event.target.dataset;
                                  if (isSelected(curItem?.id)) setFlag(-1);
                                  else setFlag(1);
                                  setTarget(checked);
                                  setIsDispatch((prev) => !prev);
                                  toggle(curItem?.id + " " + curItem?.value);
                                  //newArr(id, value);
                                }}
                                className="peer/published  w-3 accent-[#FF3EA5] hover:accent-[#FF3EA5]"
                              />
                            )}
                            <label
                              htmlFor={curItem?.value}
                              className="text-md font-medium text-gray-400 "
                            >
                              {curItem?.value
                                ?.split(" ")
                                ?.map((word, index) => {
                                  if (index == 0) {
                                    if (
                                      word == "CSR" ||
                                      word == "BFSI" ||
                                      word == "B2B"
                                    ) {
                                      return word;
                                    } else {
                                      return (
                                        word?.charAt(0)?.toUpperCase() +
                                        word?.slice(1).toLowerCase()
                                      );
                                    }
                                  } else {
                                    return (
                                      " " +
                                      word?.charAt(0)?.toUpperCase() +
                                      word?.slice(1)?.toLowerCase()
                                    );
                                  }
                                })}
                            </label>
                          </li>
                        </>
                      );
                    }
                  })}
              </ul>
            </div>
          </div> */}

          {/* CITY DATA WILL NOT BIND ALL OTHER FILTER WILL BIND AT BOTTOM*/}
          {name !== "city" && (
            <div
              style={{ display: `${isOpen ? "block" : "none"}` }}
              className="my-3 mb-2 mr-3"
            >
              <div className=" flex items-center   rounded-md border border-gray-200 bg-zinc-50 pl-2 xl:w-full ">
                <span className="material-icons-outlined text-sm text-gray-600">
                  search
                </span>
                <input
                  type="text"
                  name="city"
                  onKeyUp={(e) => searchResult(e, name)}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e?.target?.value)}
                  className="w-full rounded-lg bg-zinc-50 px-3 py-2 text-sm text-gray-400 focus:outline-none"
                  placeholder={`Search ${
                    name?.charAt(0)?.toUpperCase() + name?.slice(1)
                  }`}
                />

                {searchInput?.length > 0 && (
                  <span
                    onClick={clearButton}
                    className="material-icons-outlined icon-14 cursor-pointer pr-2 text-xs uppercase text-gray-700 hover:text-gray-900 hover:underline"
                  >
                    close
                  </span>
                )}
              </div>
            </div>
          )}
          {name !== "city" &&
            isData.map(({ id, value }) => (
              <li key={`${id}-${value}`} className="flex w-full gap-x-2">
                {value === `No ${name} Exist` ? (
                  ""
                ) : (
                  <input
                    type="checkbox"
                    checked={isSelected(id + " " + value)}
                    id={value}
                    data-checked={name}
                    onChange={() => {}}
                    onClick={(event) => {
                      const { checked } = event.target.dataset;
                      if (isSelected(id)) setFlag(-1);
                      else setFlag(1);
                      setTarget(checked);
                      setIsDispatch((prev) => !prev);
                      toggle(id + " " + value);
                      //newArr(id, value);
                    }}
                    className="peer/published w-3 accent-[#FF3EA5] hover:accent-[#FF3EA5]"
                  />
                )}
                <label
                  htmlFor={value}
                  className="text-md font-medium text-gray-400 "
                >
                  {value?.split(" ")?.map((word, index) => {
                    if (index === 0) {
                      if (word === "CSR" || word === "BFSI" || word === "B2B") {
                        return word;
                      } else {
                        return (
                          word?.charAt(0)?.toUpperCase() +
                          word?.slice(1).toLowerCase()
                        );
                      }
                    } else {
                      return (
                        " " +
                        word?.charAt(0)?.toUpperCase() +
                        word?.slice(1)?.toLowerCase()
                      );
                    }
                  })}
                </label>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Filterbox;
