import { useEffect, useState } from "react";
import { GETALLSPOKES } from "../../constants";
import { useDispatch } from "react-redux";
import { ErrorAlert } from "../../Redux/Action/Settings";
import { useSelected } from "../utils/useAllGeo";
import {
  useSpokespersonAMutation,
  useSpokespersonRMutation,
} from "../../custom-hooks/useSpokepersonMutation";
import { useRef } from "react";
import userService from "../../Services/user.service";

const AllSpokesPerson = () => {
  const menuRef = useRef();
  const dispatch = useDispatch();
  const [suggestion, setSuggestion] = useState(false);
  const [compInput, setCompInput] = useState("");
  const [sortData, setSortData] = useState([]);
  const [postData, setPostData] = useState([]);

  const spokespersonAMutation = useSpokespersonAMutation();
  const spokespersonRMutation = useSpokespersonRMutation();

  const { isLoadingSelected, userSpokespersonPrefs } = useSelected();
  //const { isLoadingSpokesperson, spokespersonData } = useAllSpokesperson();
  const [isLoadingSpokesperson, setIsLoadingSpokesperson] = useState(true);
  const [spokespersonData, setSpokespersonData] = useState([]);

  const getCompData = () => {
    userService.get(`${GETALLSPOKES}`).then((result) => {
      let data = result?.data;
      setIsLoadingSpokesperson(false);
      setSpokespersonData(data);
    });
  };

  const outSideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setSuggestion(false);
    }
  };

  const suggestionInput = () => {
    let filterData = spokespersonData.filter((curItem) =>
      curItem?.spokespersonName
        ?.toLowerCase()
        ?.includes(compInput?.toLowerCase())
    );

    if (filterData.length > 0) {
      setSortData(filterData);
      setSuggestion(true);
    } else {
      setSortData([
        {
          spokespersonid: 0,
          spokespersonName: "No Record Found, as given input!",
        },
      ]);
      setSuggestion(true);
    }
  };

  const getCompName = (id, data) => {
    setCompInput(data);
    let flag = true;
    for (let a = 0; a < postData.length; a++) {
      if (postData[a].spokespersonName === data) {
        flag = false;
      }
    }
    if (flag) {
      setPostData([
        ...postData,
        {
          spokespersonid: id,
          spokespersonName: data,
        },
      ]);
      setSuggestion(false);
      setCompInput("");

      /* Complete */
      spokespersonAMutation(id);
    } else {
      dispatch(ErrorAlert("Already added in your list"));
      setSuggestion(false);
      setCompInput("");
    }
    setSuggestion(false);
  };

  const RemoveComp = (compName) => {
    let values = postData.filter(
      (curItem) => curItem.spokespersonName !== compName
    );
    setPostData(values);
  };

  useEffect(() => {
    getCompData();
  }, []);

  useEffect(() => {
    if (!isLoadingSpokesperson && !isLoadingSelected) {
      let reqdata = [];

      userSpokespersonPrefs.forEach((element) => {
        spokespersonData.forEach((ele) => {
          if (ele.spokespersonid === element.intSpokespersonId) {
            reqdata.push(ele);
          }
        });
      });

      setPostData(reqdata);
    }
  }, [isLoadingSelected, isLoadingSpokesperson]);

  useEffect(() => {
    window.addEventListener("click", outSideClick);
    return () => {
      document.removeEventListener("click", outSideClick);
    };
  }, []);

  useEffect(() => {
    if (compInput) {
      suggestionInput();
    }
  }, [compInput]);

  useEffect(() => {
    if (compInput === "") {
      setSortData(spokespersonData);
    }
  }, [compInput]);

  return (
    <div className="flex flex-1">
      <section className="container max-w-5xl items-start rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <h2 className="flex-1 border-b border-gray-300 pb-4  text-sm">
          Please add your Spokes Person
        </h2>
        <div className="my-4 flex max-h-60 flex-col">
          <label className="mb-1 w-48 text-sm text-gray-600">
            Add Spokes person
          </label>
          <div className="relative flex gap-x-2">
            <input
              type="text"
              name="compData"
              className="w-3/3 border border-gray-300 p-2 text-sm text-gray-400 focus:outline-none lg:w-1/3"
              placeholder="Ex: Narender Modi"
              onChange={(e) => setCompInput(e.target.value)}
              //onBlur={() => setSuggestion(false)}
              value={compInput}
            />
            {/* SUGGESTION BOX START */}
            {suggestion && (
              <div
                className="w-3/3 absolute top-9 max-h-44 w-full overflow-y-auto border  border-gray-300 bg-white text-sm lg:w-1/3"
                ref={menuRef}
              >
                <ul>
                  {sortData.map((curItem) => {
                    return (
                      <>
                        <li
                          key={curItem.spokespersonid}
                          className="text-sm lowercase text-gray-500 first-letter:uppercase"
                        >
                          <span
                            className="block p-1 pl-2 hover:bg-gray-200"
                            onClick={() => {
                              if (curItem.spokespersonid !== 0) {
                                getCompName(
                                  curItem.spokespersonid,
                                  curItem.spokespersonName
                                );
                              }
                            }}
                          >
                            {curItem.spokespersonName}
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
                  key={curItem.spokespersonid}
                  className="flex items-center border border-gray-600 pl-2 text-sm capitalize text-gray-600"
                >
                  {curItem.spokespersonName}
                  <span
                    className="material-icons-outlined custom-text close-icon-size ml-2 cursor-pointer p-1 hover:bg-slate-600 hover:text-white"
                    onClick={() => {
                      RemoveComp(curItem.spokespersonName);
                      spokespersonRMutation(curItem.spokespersonid);
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

export default AllSpokesPerson;
