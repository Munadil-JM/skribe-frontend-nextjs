"use client";

import { useState, useEffect } from "react";
//import LeftFilter from "./MediaLeftFilter";
import useAllMediaType from "../utils/useAllMediaType";
//import ShimmerCrmTile from "../Shimmers/ShimmerCrmTile";
import MediaSearchRecord from "./MediaSearchRecord";
//import { FilterProvider } from "../Filters/FilterContext";
// import Lf from "../Filters/Lf";
// import { getFilter } from "../utils/Filtercb";
import Spinner from "../../Services/Spinner";
import { useSearchContext } from "../../context/MainSearchContext";

const MediaTypes = () => {
  // const [searchFilter, setSearchFilter] = useState([]);
  const [MediaResult, setMediaResult] = useState([]);
  //const [filterData, setFilterData] = useState({});
  // const { nationalSearch } = useSearchContext();

  const { journoRecord, isLoading } = useAllMediaType();

  // const [shimmer, setShimmer] = useState(false);
  useEffect(() => {
    // setSearchFilter(allFilter);
    setMediaResult(journoRecord);
    // setShimmer(true);
  }, [journoRecord]);

  useEffect(() => {
    // let filterMediaType = journoRecord?.filter((curItem) =>
    //   curItem.mediaName.toLowerCase().includes(nationalSearch?.toLowerCase())
    // );
    if (journoRecord?.length > 0) {
      setMediaResult(journoRecord);
    } else {
      setMediaResult([{ noResult: "No Results Found." }]);
    }
  }, []);

  return (
    <div>
      <div className="section w-11/12 p-6 py-6 pl-8 pr-0">
        <section className="flex gap-x-8">
          <aside className="mt-[12px] flex w-4/12 flex-col gap-6 md:flex md:w-7/12 lg:w-1/3">
            <div className="relative flex items-center justify-between">
              <span className=" flex w-28 cursor-pointer items-center text-sm font-normal text-gray-500 hover:border-gray-400 hover:text-gray-800">
                <span className="material-icons-outlined icon-16">
                  arrow_back_ios_new
                </span>
                Go Back
              </span>
            </div>
          </aside>
          <article className="mt-[12px] flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex flex-col">
              <ul className="flex items-center gap-x-1 text-xs text-gray-400">
                <li className="flex items-center">
                  Home
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>

                <li className="flex items-center">MediaTypes</li>
              </ul>
            </div>
          </article>
        </section>
      </div>
      <div className="section w-11/12  pb-6 pl-8 pr-0">
        <section className="flex gap-x-8">
          <article className="flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex w-full flex-wrap self-start">
              {/* {isLoading && <ShimmerCrmTile />} */}
              {/* {!MediaResult?.length && !isLoading && "No Record Found"} */}
              {MediaResult?.length > 0
                ? MediaResult?.map((curItem, ind) => (
                    <MediaSearchRecord key={ind} data={curItem} />
                  ))
                : !isLoading && "No Record Found"}
            </div>
            {/* <div>{!shimmer && "Loading..."}</div> */}
          </article>
        </section>
      </div>

      {isLoading && (
        <div>
          <div className="opegue-4 absolute inset-0 z-50  max-h-screen bg-gray-600">
            <div className="lft50 absolute">
              <Spinner status={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaTypes;
