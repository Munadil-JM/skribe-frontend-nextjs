import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import ShimmerArticle from "../Shimmers/ShimmerArticle";
import BeatRecord from "./BeatRecord";
//import BeatNav from "./BeatNav";
// import { get_Articles_ByBeat } from "../../Redux/Action/Settings";
import BeatSearch from "./BeatSearch";

import BeatTabs from "./BeatTabs";

import useBeatWatchArticle from "../utils/useBeatWatchArticle";
import { useAllBeat } from "../utils/useAllBeat";
import { useSelected } from "../utils/useAllGeo";
import useNavBeatWatch from "../utils/useNavBeatWatch";

const BeatWatch = () => {
  const { selectedBeat } = useSelected();
  const { mediaBeat, isLoadingBeat } = useAllBeat();

  const selectedTabs = useNavBeatWatch(selectedBeat, mediaBeat);

  const [activeBeat, setActiveBeat] = useState();
  const { isError, isLoading, data } = useBeatWatchArticle(activeBeat);

  const [beatInput, setbeatInput] = useState("");

  const [articleData, setArticleData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const articlesOnLoad = (name) => {
    setActiveBeat(name);
  };

  //SEARCH BAR CODE
  const beatSearch = (target) => {
    setbeatInput(target.value);
  };

  //alert(searhData);

  const filter = (searchText, allArticle) => {
    let filterData = allArticle.filter(
      (curElem) =>
        curElem.Title.toLowerCase().includes(searchText.toLowerCase())
      //||
      //curElem.journoName.toLowerCase().includes(searchText.toLowerCase())
    );
    return filterData;
  };

  useEffect(() => {
    setActiveBeat(selectedTabs[0]?.beatName);
  }, [selectedTabs]);
  //useEffect display data from redux store
  useEffect(() => {
    setArticleData(data);
    setFilterData(data);
  }, [isLoading, data]);

  //SEARCH USEEFFECT
  useEffect(() => {
    const timer = setTimeout(() => {
      filter(beatInput, articleData);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [beatInput]);

  return (
    <section className="container p-4 pt-8 xl:w-4/5">
      <h2 className="text-lg font-medium text-gray-600">Beat Watch</h2>

      <nav aria-label="Beat Watch Navigation">
        <ul className="flex flex-wrap gap-x-3 gap-y-2 pb-6 pt-8">
          <BeatTabs
            tabsData={selectedTabs}
            //currentTab={activeTab}
            // active={passFun}
            nametoken={articlesOnLoad}
          />
        </ul>
      </nav>
      <main className="container rounded-2xl border border-gray-200 bg-white px-6 py-4">
        {!isLoading && data.length > 0 && (
          <BeatSearch
            query={beatSearch}
            getBeat={beatInput}
            filter={filter}
            setFilterData={setFilterData}
            allArticle={articleData}
          />
        )}
        <div className="max-h-[700px] overflow-y-auto">
          {isLoading && <ShimmerArticle />}
          {!isLoading &&
            !data.length &&
            "No Record Found. Please try again later"}
          {filterData.length > 0 &&
            filterData.map((curItem, index) => (
              <BeatRecord
                key={index}
                {...curItem}
                const
                journoName={"Chitranjan Kumar"}
                journoTitle={"Freelancer"}
              />
            ))}
        </div>
      </main>
    </section>
  );
};

export default BeatWatch;
