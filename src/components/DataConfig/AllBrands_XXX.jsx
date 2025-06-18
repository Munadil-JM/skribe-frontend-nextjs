import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GETALLBRANDS } from "../../constants";
import { ErrorAlert, SuccessAlert } from "../../Redux/Action/Settings";
import { useSelected } from "../utils/useAllGeo";
import {
  useBrandAMutation,
  useBrandRMutation,
} from "../../custom-hooks/useBrandMutation";
import { useRef } from "react";
import userService from "../../Services/user.service";
const AllBrands = () => {
  const dispatch = useDispatch();
  const menuRef = useRef();
  const [suggestion, setSuggestion] = useState(false);
  const [compInput, setCompInput] = useState("");
  const [sortData, setSortData] = useState([]);
  const [postData, setPostData] = useState([]);

  const brandAMutation = useBrandAMutation();
  const brandRMutation = useBrandRMutation();

  const { userBrandPrefs, isLoadingSelected } = useSelected();
  //const { brandData, isLoadingBrand } = useAllBrand();
  const [isLoadingBrand, setIsLoadingBrand] = useState(true);
  const [brandData, setBrandData] = useState([]);

  const outSideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setSuggestion(false);
    }
  };

  const suggestionInput = () => {
    let filterData = brandData.filter((curItem) =>
      curItem?.brandName?.toLowerCase()?.includes(compInput?.toLowerCase())
    );

    if (filterData.length > 0) {
      setSortData(filterData);
      setSuggestion(true);
    } else {
      setSortData([
        { brandid: 0, brandName: "No Record Found, as given input!" },
      ]);
      setSuggestion(true);
    }
  };

  const getCompName = (id, data) => {
    setCompInput(data);
    let flag = true;
    for (let a = 0; a < postData.length; a++) {
      if (postData[a].brandName === data) {
        flag = false;
      }
    }
    if (flag) {
      setPostData([
        ...postData,
        {
          brandid: id,
          brandName: data,
        },
      ]);
      setSuggestion(false);
      setCompInput("");

      /* Complete */
      brandAMutation(id);
    } else {
      dispatch(ErrorAlert("Already added in your list"));
      setSuggestion(false);
      setCompInput("");
    }
    setSuggestion(false);
  };

  const RemoveComp = (compName) => {
    let values = postData.filter((curItem) => curItem.brandName !== compName);
    setPostData(values);
    dispatch(SuccessAlert("Removed Successfully"));
  };

  useEffect(() => {
    getCompData();
  }, []);

  const getCompData = () => {
    userService.get(`${GETALLBRANDS}`).then((result) => {
      let data = result?.data;
      setIsLoadingBrand(false);
      setBrandData(data);
    });
  };

  useEffect(() => {
    if (!isLoadingBrand && !isLoadingSelected) {
      let reqdata = [];

      userBrandPrefs.forEach((element) => {
        brandData.forEach((ele) => {
          if (ele.brandid === element.intBrandId) {
            reqdata.push(ele);
          }
        });
      });

      setPostData(reqdata);
    }
  }, [isLoadingBrand, isLoadingSelected]);

  useEffect(() => {
    if (compInput) {
      suggestionInput();
    }
  }, [compInput]);

  useEffect(() => {
    if (compInput === "") {
      setSortData(brandData);
    }
  }, [compInput]);

  useEffect(() => {
    window.addEventListener("click", outSideClick);
    return () => {
      document.removeEventListener("click", outSideClick);
    };
  }, []);

  return (
    <div className="flex flex-1">
      <section className="container max-w-5xl items-start rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <h2 className="flex-1 border-b border-gray-300 pb-4  text-sm">
          Please add your Brand
        </h2>
        <div className="my-4 flex max-h-60 flex-col">
          <label className="mb-1 w-48 text-sm text-gray-600">Add Brand</label>
          <div className="relative flex gap-x-2">
            <input
              type="text"
              name="compData"
              className="w-3/3 border border-gray-300 p-2 text-sm text-gray-400 focus:outline-none lg:w-1/3"
              placeholder="Ex: Nike"
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
                  {sortData.map((curItem) => {
                    return (
                      <>
                        <li
                          key={curItem.brandid}
                          className="text-sm lowercase text-gray-500 first-letter:uppercase"
                        >
                          <span
                            className="block p-1 pl-2 hover:bg-gray-200"
                            onClick={() => {
                              if (curItem.brandid !== 0) {
                                getCompName(curItem.brandid, curItem.brandName);
                              }
                            }}
                          >
                            {curItem.brandName}
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
                  key={curItem.brandid}
                  className="flex items-center border border-gray-600 pl-2 text-sm capitalize text-gray-600"
                >
                  {curItem.brandName}
                  <span
                    className="material-icons-outlined custom-text close-icon-size ml-2 cursor-pointer p-1 hover:bg-slate-600 hover:text-white"
                    onClick={() => {
                      RemoveComp(curItem.brandName);
                      brandRMutation(curItem.brandid);
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

export default AllBrands;
