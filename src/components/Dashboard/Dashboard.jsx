import { Fragment, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import ShimmerArticle from "../Shimmers/ShimmerArticle";
import ArticleRecord from "./ArticleRecord";
import ArticleSearch from "./ArticleSearch";
import dashboard_article, { useDashboard } from "../utils/useDashboard";
import { v4 as uuidv4 } from "uuid";
import CRMJournalist from "./CRMJournalist";
import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";

const Dashboard = () => {
  // const [activeTab, setActiveTab] = useState();
  const [beatInput, setbeatInput] = useState("");
  const { isLoadingDashboard, dashboardData } = useDashboard();
  const [articleData, setArticleData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const { vchartjourno } = useContext(DashboardContext);
  let journoProfileId = vchartjourno.id;
  let photoPath = vchartjourno.path;
  let title = vchartjourno.title;
  let jname = vchartjourno.jname;

  const infiniteQuery = useInfiniteQuery(
    ["articles", journoProfileId],
    ({ pageParam = undefined }) =>
      dashboard_article({ pageParam, journoProfileId }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.totalPage === lastPage.currentPage) return undefined;
        return {
          token: lastPage.token,
          currentPage: lastPage.currentPage + 1,
        };
      },
    }
  );

  useScrollToBottom(
    document.getElementById("article-scrollbar"),
    () => {
      if (!infiniteQuery?.isFetchingNextPage) infiniteQuery?.fetchNextPage();
    },
    700
  );

  useEffect(() => {
    if (!isLoadingDashboard) {
      setArticleData(dashboardData);
      setFilterData(dashboardData);
    }
  }, [isLoadingDashboard]);

  //ACTIVE TAB FUNCTION CALL
  // const passFun = (id) => {
  //   setActiveTab(id);
  // };

  //SEARCH BAR CODE
  const beatSearch = (target) => {
    setbeatInput(target.value);
  };

  const filter = (searchText, allArticle) => {
    let filterData = allArticle.filter((curElem) =>
      curElem.Title.toLowerCase().includes(searchText.toLowerCase())
    );

    return filterData;
  };

  return (
    <>
      {/* <Predata /> */}
      <section
        className="container p-4 pt-8 xl:w-4/5"
        style={{ width: "100%" }}
      >
        <main className="container">
          <h3 className="pb-4 text-sm text-gray-400">
            <span className="text-gray-600">Header:</span> Lorem Ipsum is simply
            dummy text of the printing and typesetting industry
          </h3>
          <div className="flex gap-x-5">
            <fieldset className="rounded-2xl border  border-gray-200 bg-white px-6 py-4 xl:w-4/5">
              <legend className="px-3">Latest Articles</legend>
              <ArticleSearch
                query={beatSearch}
                getBeat={beatInput}
                filter={filter}
                setFilterData={setFilterData}
                allArticle={articleData}
              />
              <div
                className="max-h-[700px] overflow-y-auto"
                id="article-scrollbar"
              >
                {Boolean(infiniteQuery.data?.pages[0].data.length) ? (
                  !infiniteQuery.isLoading ? (
                    infiniteQuery.data.pages.map((page, index) => (
                      <Fragment key={index}>
                        {page.data.map((element) => (
                          <ArticleRecord
                            key={uuidv4()}
                            title={element.title}
                            article={element.articleSummary}
                            date={element.publishDate}
                            sentiment={1}
                            journoName={jname}
                            journoTitle={title}
                            ArticleId={element.articleId}
                            photoPath={photoPath}
                          />
                        ))}
                      </Fragment>
                    ))
                  ) : (
                    <ShimmerArticle />
                  )
                ) : (
                  <ShimmerArticle />
                )}
              </div>
              <div className="flex flex-col items-center p-2">
                <button className="flex items-center gap-x-2 text-sm text-orange-500">
                  {infiniteQuery?.isFetchingNextPage
                    ? "Fetching..."
                    : undefined}
                </button>
              </div>
            </fieldset>

            <aside className="rounded-2xl px-6 py-4">
              <CRMJournalist />
            </aside>
          </div>
        </main>
      </section>
    </>
  );
};

function useScrollToBottom(container, callback, offset = 0) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - offset
      ) {
        callbackRef.current();
      }
    };

    container?.addEventListener("scroll", handleScroll, { passive: true });
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [container, offset]);
}

export default Dashboard;
