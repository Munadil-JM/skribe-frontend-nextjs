import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SuccessAlert } from "../../Redux/Action/Settings";
import { useSelected } from "../utils/useAllGeo";
import {
  useTopicAMutation,
  useTopicRMutation,
} from "../../custom-hooks/useTopicMutation";
import { useRef } from "react";
import { GETALLTOPICS } from "../../constants";
import userService from "../../Services/user.service";

const AllTopics = () => {
  const dispatch = useDispatch();
  const topicRef = useRef();
  const [suggestion, setSuggestion] = useState(false);
  const [compInput, setCompInput] = useState("");
  const [sortData, setSortData] = useState([]);
  const [postData, setPostData] = useState([]);

  const topicAMutation = useTopicAMutation();
  const topicRMutation = useTopicRMutation();

  const { userTopicPref, isLoadingSelected } = useSelected();
  //const { topicData, isLoadingTopic } = useAllTopic();

  const [isLoadingTopic, setisLoadingTopic] = useState(true);
  const [topicData, setTopicData] = useState([]);

  const getCompData = () => {
    userService.get(`${GETALLTOPICS}`).then((result) => {
      let data = result?.data;
      setisLoadingTopic(false);
      setTopicData(data);
    });
  };

  const suggestionInput = () => {
    let filterData = topicData.filter((curItem) =>
      curItem?.topicName?.toLowerCase()?.includes(compInput?.toLowerCase())
    );

    if (filterData.length > 0) {
      setSortData(filterData);
      setSuggestion(true);
    } else {
      setSortData([
        { topicid: 0, topicName: "No Record Found, as given input!" },
      ]);
      setSuggestion(true);
    }
  };

  const getCompName = (id, data) => {
    setCompInput(data);
    let flag = true;
    for (let a = 0; a < postData.length; a++) {
      if (postData[a].topicName === data) {
        flag = false;
      }
    }
    if (flag) {
      setPostData([
        ...postData,
        {
          topicid: id,
          topicName: data,
        },
      ]);

      /* COMPLETE: add mutation */
      topicAMutation(id);

      setSuggestion(false);
      setCompInput("");
    } else {
      setSuggestion(false);
      setCompInput("");
    }
    setSuggestion(false);
  };

  const RemoveComp = (compName) => {
    let values = postData.filter((curItem) => curItem.topicName !== compName);
    setPostData(values);
    dispatch(SuccessAlert("Removed Successfully"));
  };

  useEffect(() => {
    getCompData();
  }, []);

  useEffect(() => {
    if (!isLoadingTopic && !isLoadingSelected) {
      let reqdata = [];
      userTopicPref.forEach((element) => {
        topicData.forEach((ele) => {
          if (ele.topicid === element.intTopicId) {
            reqdata.push(ele);
          }
        });
      });

      setPostData(reqdata);
    }
  }, [isLoadingTopic, isLoadingSelected]);
  useEffect(() => {
    if (compInput) {
      suggestionInput();
    }
  }, [compInput]);

  useEffect(() => {
    if (compInput === "") {
      setSortData(topicData);
    }
  }, [compInput]);

  const outSideClick = (e) => {
    if (topicRef.current && !topicRef.current.contains(e.target)) {
      setSuggestion(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", outSideClick);
    return () => {
      document.removeEventListener("click", outSideClick);
    };
  });

  return (
    <div className="flex flex-1">
      <section className="container max-w-5xl items-start rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <h2 className="flex-1 border-b border-gray-300 pb-4  text-sm">
          Please add your Topics
        </h2>
        <div className="my-4 flex max-h-60 flex-col">
          <label className="mb-1 w-48 text-sm text-gray-600">Add Topic</label>
          <div className="relative flex gap-x-2">
            <input
              type="text"
              name="compData"
              className="w-3/3 border border-gray-300 p-2 text-sm text-gray-400 focus:outline-none lg:w-1/3"
              placeholder="Ex: Cyber Crime"
              onChange={(e) => setCompInput(e.target.value)}
              //onBlur={() => setSuggestion(false)}
              value={compInput}
            />
            {/* SUGGESTION BOX START */}
            {suggestion && (
              <div
                className="absolute top-9 max-h-44 w-full overflow-y-auto border  border-gray-300 bg-white text-sm lg:w-1/3"
                ref={topicRef}
              >
                <ul>
                  {sortData.map((curItem) => {
                    return (
                      <>
                        <li
                          key={curItem.topicid}
                          className="text-sm lowercase text-gray-500 first-letter:uppercase"
                        >
                          <span
                            className="block p-1 pl-2 hover:bg-gray-200"
                            onClick={() => {
                              if (curItem.topicid !== 0) {
                                getCompName(curItem.topicid, curItem.topicName);
                              }
                            }}
                          >
                            {curItem.topicName}
                          </span>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            )}
            {/* SUGGESTION BOX END */}
            {/* <button
          type="submit"
          // onClick={() => displayData()}
          className="text-md bg-gray-500 px-5 text-white hover:bg-gray-600"
        >
          ADD
        </button> */}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {postData.map((curItem) => {
              return (
                <span
                  key={curItem.topicid}
                  className="flex items-center border border-gray-600 pl-2 text-sm capitalize text-gray-600"
                >
                  {curItem.topicName}
                  <span
                    className="material-icons-outlined custom-text close-icon-size ml-2 cursor-pointer p-1 hover:bg-slate-600 hover:text-white"
                    onClick={() => {
                      RemoveComp(curItem.topicName);
                      topicRMutation(curItem.topicid);
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
            //   onClick={() => submitAllData()}
          >
            Submit
          </Link> */}
        </div>
      </section>
    </div>
  );
};

export default AllTopics;
