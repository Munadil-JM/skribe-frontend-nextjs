"use client";

// import { useRequest } from "ahooks";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "../../../Services/Spinner";
import { PRECRM_POSTDATA, OUTLETSUPPLEMENT } from "../../../constants";
import { useSearchContext } from "../../../context/MainSearchContext";
import BuildCampaign from "../../Campaign/BuildCampaign";
// import { getFilter } from "../../utils/Filtercb";
import { useLeftJournoSearch } from "../../utils/UrlBuilder";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
// import userService from "../../../Services/user.service";
import SupplementRecord from "./SupplementRecord";
// import ServerError from "../../../Services/ServerError";

const outletCategory = [
  {
    id: 0,
    tabName: "All",
    url: "journalist-by-outlet",
    categoryType: [1, 2, 5, 6, 13, 14, 16, 20, 22],
  },
  {
    id: 1,
    tabName: "Editor",
    url: "OutletEditor",
    categoryType: [1, 2, 5, 6, 13, 16, 18, 20, 22],
  },
  {
    id: 2,
    tabName: "Bureau Chief",
    url: "BureauChief",
    categoryType: [1, 2, 5, 13, 22],
  },
  {
    id: 3,
    tabName: "Columnist",
    url: "Columnist",
    categoryType: [1, 2, 5, 13, 22],
  },
  {
    id: 4,
    tabName: "Supplements",
    url: "Supplements",
    categoryType: [1, 2, 5, 13],
  },
  {
    id: 5,
    tabName: "International",
    url: "International",
    categoryType: [1, 5, 13, 22],
  },
  {
    id: 6,
    tabName: "Anchor",
    url: "journalistByAnchor",
    categoryType: [14],
  },
  {
    id: 7,
    tabName: "Producers",
    url: "journalistByProducers",
    categoryType: [14],
  },
  {
    id: 8,
    tabName: "Shows",
    url: "journalistByShows",
    categoryType: [14],
  },
];

const Supplements = ({ outletId, id, name }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [filterData, setFilterData] = useState({ count: 0 });
  const [searchByText, setSearchByText] = useState("");
  const [searchDeps, setSearchDeps] = useState(0);
  // const [crmRecord, setcrmRecord] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [journalistResult, setJournalistResult] = useState([]);
  const [custom, setCustom] = useState({});
  const [selectAllLabel, setSelectAllLabel] = useState("Select All");
  const [selectedJournalistsLength, setLength] = useState(0);
  const [active, setActive] = useState("Supplements");
  const url = `${OUTLETSUPPLEMENT}`;
  const { sVal } = useSearchContext();
  const [selectedJournalists, setSelectedJournalists] = useState([]);

  // const { data, loading, error } = useRequest(async () =>
  //   getFilter(`${url}?OutletId=${id}&IsFilter=true&`)
  // );

  const { isdata, loading, loadMore, loadingMore, noMore } =
    useLeftJournoSearch(
      filterData,
      filterData["count"],
      url + `?OutletId=${id}&IsFilter=true&`,
      searchDeps
    );
  // const [postDataToCrm, setPostDataToCrm] = useState([]);

  useInfiniteScroll(loadMore);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleSearch = (event) => {
    setSearchByText(event.target.value);
    setSearchDeps(event.target.value.length);
  };

  const optimizedSearchRecords = useCallback(debounce(handleSearch), []);
  // const [shimmer, setShimmer] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!sVal || typeof sVal == undefined) {
      setSearchDeps(0);
      setSearchByText("");
    } else {
      setSearchDeps(sVal.length);
      setSearchByText(sVal);
    }
  }, [sVal]);

  useEffect(() => {
    setJournalistResult(isdata?.list);
    //setNoRecord(false);
  }, [isdata?.list]);

  useEffect(() => {
    setLength(selectedJournalists.length);
  }, [selectedJournalists]);

  useEffect(() => {
    if (selectAllLabel === "Unselect All" && !selectedJournalists.length) {
      setSelectAllLabel("Select All");
    }
  }, [journalistResult]);

  return (
    <div>
      <div className="section w-11/12 p-6 pb-6 pl-8 pr-0 pt-2">
        <section className="flex gap-x-8">
          <aside className="mt-[12px] flex hidden w-4/12 flex-col gap-6 md:flex md:w-7/12 lg:w-1/3">
            <div className="relative flex items-center justify-between">
              <span
                onClick={() => goBack()}
                className=" flex w-28 cursor-pointer items-center text-sm font-normal text-gray-500 hover:border-gray-400 hover:text-gray-800"
              >
                <span className="material-icons-outlined icon-16">
                  arrow_back_ios_new
                </span>
                Go Back
              </span>
            </div>
          </aside>
          <article className="mt-3 flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex flex-col">
              <ul className="flex items-center gap-x-1 pb-4 text-xs text-gray-400">
                <li className="flex items-center">
                  <Link href="/media-types" className="hover:text-gray-700">
                    MediaTypes
                  </Link>
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>
                <li className="flex items-center">
                  {outletId === "1" && (
                    <>
                      <Link
                        href={`/mediaTypeOutlet/1/National`}
                        className="hover:text-gray-700"
                      >
                        National
                      </Link>
                      <span className="material-icons-outlined b-font text-gray-400">
                        navigate_next
                      </span>
                    </>
                  )}
                </li>
                <li className="flex items-center">
                  {outletId === "2" && (
                    <>
                      <Link
                        href={`/mediaTypeOutlet/2/Regional`}
                        className="hover:text-gray-700"
                      >
                        Regional
                      </Link>
                      <span className="material-icons-outlined b-font text-gray-400">
                        navigate_next
                      </span>
                    </>
                  )}
                </li>
                <li className="flex items-center">
                  {name}
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>
                <li className="flex items-center">
                  Supplements
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>
                <li className="flex items-center">Results {isdata?.total}</li>
              </ul>
              <ul className="flex gap-x-2 text-sm text-gray-500">
                <li className="font-medium">Sort By:</li>
                {outletCategory?.length > 0 &&
                  outletCategory?.map((curNav, index) => {
                    if (curNav?.categoryType?.includes(Number(outletId))) {
                      return (
                        <li key={index}>
                          <Link
                            href={`/${curNav?.url}/${outletId}/${id}/${name}`}
                            className={`cursor-pointer px-2 pb-1 text-gray-400 hover:border-b-2 hover:border-[#8260b6] ${
                              active === curNav?.tabName
                                ? "border-b-2 border-[#8260b6] text-gray-600 font-medium"
                                : ""
                            } `}
                            onClick={() => setActive(curNav?.tabName)}
                          >
                            {curNav?.tabName}
                          </Link>
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
            {/* {loading && <ShimmerCrmTile />} */}
            <div className="flex w-full flex-wrap  self-start [&>*:last-child]:flex-none [&>*:nth-child(n-2)]:flex-none">
              {journalistResult && journalistResult?.length > 0
                ? journalistResult?.map((curItem) => (
                    <SupplementRecord
                      key={curItem.intSupplementId}
                      data={curItem}
                      x={filterData}
                    />
                  ))
                : loading
                  ? "Loading..."
                  : "No Record Found"}

              {/* {journalistResult?.length > 0 && <ShimmerCrmTile />} */}
            </div>
            <div className="mt-2 flex justify-center">
              {loadingMore && (
                <p className="whitespace-nowrap px-4  py-1 text-gray-400">
                  Loading journalists...
                </p>
              )}
            </div>
          </article>
        </section>

        {loading && (
          <div>
            <div className="opegue-4 absolute inset-0 z-50  max-h-screen bg-gray-600">
              <div className="lft50 absolute">
                <Spinner status={true} />
              </div>
            </div>
          </div>
        )}

        {isOpen && (
          <BuildCampaign
            open={isOpen}
            onClose={() => setIsOpen(false)}
            selectedJournalists={selectedJournalists}
          />
        )}
      </div>
    </div>
  );
};

export default Supplements;
