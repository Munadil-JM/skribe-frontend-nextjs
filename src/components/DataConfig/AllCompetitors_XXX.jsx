import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { GETALLCOMPETITORS } from "../../constants";
import {
  useCompetitorAMutation,
  useCompetitorRMutation,
} from "../../custom-hooks/useCompetitorMutation";
import { ErrorAlert, SuccessAlert } from "../../Redux/Action/Settings";
import { useSelected } from "../utils/useAllGeo";
import userService from "../../Services/user.service";

const AllCompetitors = () => {
  const menuRef = useRef();
  //outside click disable autosuggestion

  const dispatch = useDispatch();
  const [suggestion, setSuggestion] = useState(false);
  const [compInput, setCompInput] = useState("");
  const [sortData, setSortData] = useState([]);
  const [postData, setPostData] = useState([]);

  const competitorAMutation = useCompetitorAMutation();
  const competitorRMutation = useCompetitorRMutation();
  const { isLoadingSelected, userCompetitorPref } = useSelected();

  const [isLoadingCompetitor, setIsLoadingCompetitor] = useState(true);
  const [competitorData, setCompetitorData] = useState([]);

  const getCompData = () => {
    userService.get(`${GETALLCOMPETITORS}`).then((result) => {
      let data = result?.data;
      setIsLoadingCompetitor(false);
      setCompetitorData(data);
    });
  };

  const suggestionInput = () => {
    let filterData = competitorData?.filter((curItem) =>
      curItem?.vchCompetitor?.toLowerCase()?.includes(compInput?.toLowerCase())
    );
    if (filterData?.length > 0) {
      setSortData(filterData);
      setSuggestion(true);
    } else {
      setSortData([
        {
          intCompetitorId: 0,
          vchCompetitor: "No Record Found, as given input!",
        },
      ]);
      setSuggestion(true);
    }
  };

  const getCompName = (id, data) => {
    setCompInput(data);
    let flag = true;
    for (let a = 0; a < postData.length; a++) {
      if (postData[a].vchCompetitor === data) {
        flag = false;
      }
    }
    if (flag) {
      setPostData([
        ...postData,
        {
          intCompetitorId: id,
          vchCompetitor: data,
        },
      ]);
      competitorAMutation(id);
      setSuggestion(false);
      setCompInput("");
      //dispatch(SuccessAlert("Added Successfully"));
    } else {
      setSuggestion(false);
      setCompInput("");
      dispatch(ErrorAlert("Already added in your list"));
    }
  };

  const RemoveComp = (compName) => {
    let values = postData.filter(
      (curItem) => curItem.vchCompetitor !== compName
    );
    setPostData(values);
    dispatch(SuccessAlert("Removed Successfully"));
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setSuggestion(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  useEffect(() => {
    getCompData();
  }, []);

  useEffect(() => {
    if (!isLoadingCompetitor && !isLoadingSelected) {
      let reqdata = [];

      userCompetitorPref?.forEach((element) => {
        competitorData?.forEach((ele) => {
          if (ele.intCompetitorId === element.intCompetitorId) {
            reqdata.push({
              intCompetitorId: ele.intCompetitorId,
              vchCompetitor: ele.vchCompetitor,
            });
          }
        });
      });

      setPostData(reqdata);
    }
  }, [isLoadingCompetitor, isLoadingSelected]);

  useEffect(() => {
    if (compInput) {
      suggestionInput();
    }
  }, [compInput]);

  useEffect(() => {
    if (compInput === "") {
      setSortData(competitorData);
    }
  }, [compInput]);

  return (
    <>
      <div className="flex flex-1">
        <section className="container max-w-5xl items-start rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <h2 className="flex-1 border-b border-gray-300 pb-4  text-sm">
            Please add your Competitors
          </h2>
          <div className="my-4 flex max-h-60 flex-col">
            <label className="mb-1 w-48 text-sm text-gray-600">
              Add Competitor
            </label>
            <div className="relative flex gap-x-2">
              <input
                type="text"
                name="compData"
                className="w-3/3 border border-gray-300 p-2 text-sm text-gray-400 focus:outline-none lg:w-1/3"
                placeholder="Ex: Tata Steel Corp."
                onChange={(e) => setCompInput(e.target.value)}
                //onBlur={() => setSuggestion(false)}
                value={compInput}
              />

              {/* SUGGESTION BOX START */}

              {suggestion && (
                <div
                  className="absolute top-9 max-h-44 w-full overflow-y-auto border  border-gray-300 bg-white text-sm lg:w-1/3"
                  ref={menuRef}
                >
                  <ul>
                    {sortData?.length > 0 &&
                      sortData?.map((curItem) => {
                        return (
                          <li
                            key={curItem.intCompetitorId}
                            className="text-sm lowercase text-gray-500 first-letter:uppercase"
                          >
                            <span
                              className="block p-1 pl-2 hover:bg-gray-200"
                              onClick={() => {
                                if (curItem.intCompetitorId !== 0) {
                                  getCompName(
                                    curItem.intCompetitorId,
                                    curItem.vchCompetitor
                                  );
                                }
                              }}
                            >
                              {curItem.vchCompetitor}
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}

              {/* <AutoSuggestion
                suggestion={suggestion}
                sortData={sortData}
                compName={getCompName}
              /> */}
              {/* <button
                type="submit"
                className="text-md bg-gray-500 px-5 text-white hover:bg-gray-600"
              >
                ADD
              </button> */}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {postData.map((curItem) => {
                return (
                  <span
                    key={curItem.competitorid}
                    className="flex items-center border border-gray-600 pl-2 text-sm capitalize text-gray-600"
                  >
                    {curItem.vchCompetitor}
                    <span
                      className="material-icons-outlined custom-text close-icon-size ml-2 cursor-pointer p-1 hover:bg-slate-600 hover:text-white"
                      onClick={() => {
                        RemoveComp(curItem.vchCompetitor);
                        competitorRMutation(curItem.intCompetitorId);
                      }}
                    >
                      close
                    </span>
                  </span>
                );
              })}
            </div>
            {/* <Link
              className="mt-4 w-fit rounded-md bg-orange-500 px-3 py-2 text-sm font-normal text-white hover:bg-orange-600  focus:outline-none"
              to=""
              onClick={
                () => postData.map((curItem) => console.log(curItem))
                // compMutation(postData.map((element) => element.intCompetitorId))
              }
            >
              Submit
            </Link> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default AllCompetitors;
