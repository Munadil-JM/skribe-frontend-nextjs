"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
// import noUser from "../../assets/noUser.png";
import {
  ADDCOMPETITOR,
  ADD_BRAND,
  ADD_SPOKESPERSON,
  DEACTIVATE_SPOKESPERSON,
} from "../../../constants";
import userService from "../../../Services/user.service";
import AddKeyword from "./AddKeyword";
import AddBrand from "./AddBrand";

const SetBrandPopup = ({
  open,
  onClose,
  brand,
  competitor,
  spokePerson,
  GetBrandData,
  message,
  setMessage,
}) => {
  //   const [brand, setBrand] = useState([]);
  //   const [competitor, setCompetitor] = useState([]);
  //   const [spokePerson, setSpokesPerson] = useState([]);
  //COMP NAME STATE
  const [compName, setCompName] = useState("");

  // State to track the current page (1 or 2)
  const [currentPage, setCurrentPage] = useState(1);

  //SHOW HIDE COMP KEYWORD
  // const [showComp, setShowComp] = useState(false);

  //ADD BRAND
  const addBrand = async () => {
    if (compName?.length <= 2) {
      setMessage({
        type: "brand",
        message: "Please enter minimum 3 letter to add Brand!",
      });
    } else {
      try {
        let url = `${ADD_BRAND}?BrandName=${encodeURIComponent(compName)}`;

        const [res1] = await Promise.all([userService.post(url)]);
        if (res1?.response?.status === "Ok") {
          setMessage({ type: "brand", message: "Brand added!" });
          setCompName("");
          GetBrandData();
        } else if (res1?.response?.status === "Already") {
          setCompName("");
          setMessage({
            type: "brand",
            message: "You can add a maximum of one brand",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };

  const addSpeaker = (event) => {
    if (event.key === "Enter") {
      addSpokes();
    }
  };

  //ADD SPOKESPERSON
  const addSpokes = async () => {
    if (compName?.length <= 2) {
      setMessage({
        type: "spoke",
        message: "Please enter minimum 3 letter to add Spokesperson!",
      });
    } else if (
      spokePerson
        ?.map((curItem) => curItem?.value?.toLowerCase())
        ?.includes(compName?.toLowerCase())
    ) {
      setMessage({
        type: "spoke",
        message: "The name is already in use. Please choose a different one.",
      });
    } else {
      try {
        let url = `${ADD_SPOKESPERSON}?Name=${encodeURIComponent(compName)}`;

        const [res1] = await Promise.all([userService.post(url)]);
        if (res1?.response?.status === "Ok") {
          setMessage({
            type: "spoke",
            message: "Spokesperson added!",
          });
          setCompName("");
          GetBrandData();
        } else if (res1?.response?.status === "Limit") {
          setCompName("");
          setMessage({
            type: "spoke",
            message: "You can add a maximum of three spokespersons",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };

  const handleComp = (event) => {
    if (event.key === "Enter") {
      addCompKeyword();
    }
  };

  //ADD BRAND KEYWORD API CALL
  const addCompKeyword = async () => {
    if (compName?.length <= 2) {
      setMessage({
        type: "compKeyword",
        message: "Please enter minimum 3 letter to add Keyword!",
      });
    } else if (
      competitor
        ?.map((curItem) => curItem?.value?.toLowerCase())
        ?.includes(compName?.toLowerCase())
    ) {
      setMessage({
        type: "compKeyword",
        message:
          "The competitor is already in use. Please choose a different one.",
      });
    } else {
      try {
        let url = `${ADDCOMPETITOR}?KeyWord=${encodeURIComponent(
          compName
        )}&BrandId=${brand[0]?.id}`;
        const [res1] = await Promise.all([userService.post(url)]);

        if (res1?.response?.status === "Ok") {
          setMessage({
            type: "compKeyword",
            message: "Competitor added!",
          });
          setCompName("");
          GetBrandData();
        } else if (res1?.response?.status === "Limit") {
          setCompName("");
          setMessage({
            type: "compKeyword",
            message: "You can add a maximum of five competitors",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };

  //DEACTIVATE SPOKES PERSON
  const deActiveSpokes = async (id) => {
    let url = `${DEACTIVATE_SPOKESPERSON}?SpokePersonId=${id}`;
    try {
      let [res] = await Promise.all([userService.post(url)]);
      if (res?.response?.status === "deactivated") {
        GetBrandData();
        setMessage({ type: "spoke", message: "Spokesperson removed!" });
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [open]);

  if (!open) return null;

  // Handler to move to the next page
  const handleNext = () => {
    if (currentPage < 3 && brand?.length > 0) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handler to move to the previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addBrand();
    }
  };

  return createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-700 opacity-70 z-50"></div>
      <div className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-2xl md:w-3/5 lg:w-3/5 xl:w-2/5 z-[55]">
        <div className="flex items-center justify-between border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-600">
            Setup Brand Configuration
            {/* <span className="text-gray-500 font-normal pl-2 text-md">
              (Date will be tracked from next day)
            </span> */}
          </h2>

          <button onClick={onClose}>
            <span className="material-icons-outlined cursor-pointer rounded-full p-1 text-gray-800 hover:bg-gray-400 hover:text-gray-200">
              close
            </span>
          </button>
        </div>

        {/* [FIRST SLIDER START] */}

        <div className="slider-container h-[410px]">
          {currentPage === 1 && (
            <>
              <h4 className="text-sm text-red-500 text-right">
                You can setup 1 Brand max.
              </h4>
              <h5 className="text-sm text-gray-700 font-medium mt-4">
                Once the brand is removed, all related data will be deleted.
              </h5>

              {brand?.length <= 0 && (
                <div className="lg:flex mt-3 gap-x-4 w-full flex-col">
                  <div className="w-6/12 pt-1">
                    <label className="block text-gray-800 md:text-left mb-1 md:mb-0 pr-4 text-sm">
                      Brand Name :
                    </label>
                  </div>
                  <div className="w-full lg:w-6/12 relative">
                    <span
                      onClick={() => addBrand()}
                      className="bg-[#002b5b] text-sm cursor-pointer absolute right-0 top-0 text-white px-3 h-10 rounded-tr-md rounded-br-md flex items-center"
                    >
                      Add
                    </span>
                    <input
                      type="text"
                      className="bg-white rounded w-full lg:w-12/12  py-2 px-4 h-10 border border-gray-400 text-gray-700 focus:outline-none focus:bg-white text-sm"
                      id="inline-full-name"
                      placeholder="You can setup 1 Brand max"
                      name="BrandName"
                      value={compName}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => setCompName(e.target.value)}
                      maxLength={30}
                    />
                  </div>
                  <p className="text-xs text-gray-500 pt-1">
                    Charactor limit: {`${compName?.length ?? 0}/30`}
                  </p>
                  {message.type === "brand" && <p>{message?.message}</p>}
                </div>
              )}
              {brand?.length > 0 && (
                <div className="lg:flex lg:items-center gap-x-4 w-full">
                  <div className="w-full lg:w-12/12 relative">
                    <div className="flex flex-col items-start gap-x-6 border-gray-400 p-4 pr-0 pt-0 pl-0 pb-4">
                      <div className="flex gap-x-3 flex-wrap w-full py-[41px]">
                        <AddBrand
                          data={brand}
                          fun={GetBrandData}
                          message={message}
                          setMessage={setMessage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {/* [/FIRST SLIDER END] */}

          {/* [SECOND SLIDER START] */}
          {currentPage === 2 && (
            <>
              <h4 className="text-sm text-red-500 text-right">
                You can add 5 Competitor max.
              </h4>

              {competitor?.length < 5 && (
                <div className="lg:flex mt-3 gap-x-4 w-full flex-col">
                  <div className="w-12/12 pt-1">
                    <label className="block text-gray-800 md:text-left mb-1 md:mb-0 pr-4 text-md">
                      Competitor:
                    </label>
                  </div>
                  <div className="w-6/12 relative">
                    <span
                      onClick={() => addCompKeyword()}
                      className="bg-[#002b5b] cursor-pointer absolute right-0 top-0 text-white px-3 h-10 rounded-tr-md rounded-br-md flex items-center text-md"
                    >
                      Add
                    </span>
                    <input
                      type="text"
                      className="bg-white rounded w-full lg:w-12/12 text-md font-medium py-2 px-4 h-10 border border-gray-400 text-gray-600 focus:outline-none focus:bg-white"
                      id="inline-full-name"
                      name="KeyWord"
                      value={compName}
                      placeholder="Enter competitor name"
                      maxLength={30}
                      onKeyDown={handleComp}
                      onChange={(e) => setCompName(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-gray-500 pt-1">
                    Charactor limit: {`${compName?.length ?? 0}/30`}
                  </p>
                  {message?.type === "compKeyword" && <p>{message?.message}</p>}
                </div>
              )}
              {competitor?.length > 0 && (
                <div className="lg:flex lg:items-center mt-3 gap-x-4 w-full">
                  <div className="w-full lg:w-12/12 relative">
                    <div className="flex flex-col items-start gap-x-6 border-gray-400 mt-4 p-4 pr-0 pt-0 pl-0 pb-4">
                      <div className="flex gap-x-3 flex-wrap max-h-60 overflow-scroll overflow-x-hidden w-full py-[41px]">
                        {competitor?.length > 0 &&
                          competitor?.map((curElem, index) => {
                            return (
                              <>
                                <AddKeyword
                                  data={curElem}
                                  key={index}
                                  fun={GetBrandData}
                                  message={message}
                                  setMessage={setMessage}
                                />
                              </>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* [/SECOND SLIDER END] */}

          {/* [THIRD SLIDER START] */}
          {currentPage === 3 && (
            <>
              <h4 className="text-sm text-red-500 text-right">
                You can add 3 Spokesperson max.
              </h4>

              <div className="lg:flex mt-3 gap-x-4 w-full flex-col">
                <div className="w-12/12 pt-1 mb-4">
                  <label className="block text-gray-800 md:text-left md:mb-0 pr-4 text-md leading-4">
                    Spokesperson:
                  </label>
                  <span className="text-sm text-gray-500">
                    Add at least one Spoke to complete your Configuration.
                  </span>
                </div>
                <div className="w-6/12 relative">
                  {spokePerson?.length <= 2 && (
                    <span
                      onClick={addSpokes}
                      className="bg-[#002b5b] cursor-pointer absolute right-0 top-0 text-white px-3 h-10 rounded-tr-md rounded-br-md flex items-center text-md"
                    >
                      Add
                    </span>
                  )}
                  <input
                    type="text"
                    className="bg-white rounded w-full lg:w-12/12 text-md py-2 px-4 h-10 border border-gray-400 text-gray-700 focus:outline-none focus:bg-white"
                    id="inline-full-name"
                    name="KeyWord"
                    value={compName}
                    disabled={spokePerson?.length > 2}
                    placeholder="Enter Spokesperson Name"
                    onKeyDown={addSpeaker}
                    onChange={(e) => setCompName(e.target.value)}
                    maxLength={25}
                  />
                  <p className="text-xs text-gray-500 pt-1">
                    Charactor limit: {`${compName?.length ?? 0}/25`}
                  </p>
                </div>

                {message?.type === "spoke" && <p>{message?.message}</p>}
              </div>

              {spokePerson?.length > 2 && (
                <>
                  <h4 className="text-lg font-medium text-gray-600 mt-3">
                    Spokes Person
                  </h4>
                </>
              )}
              {spokePerson?.length > 0 && (
                <div className="lg:flex lg:items-center mt-2 gap-x-4 w-full">
                  <div className="w-full lg:w-12/12 relative">
                    <div className="flex flex-col items-start gap-x-6 border-gray-400 p-4 pr-0 pt-0 pl-0 pb-4">
                      <ul className="flex  gap-x-2 gap-y-2  flex-wrap">
                        {spokePerson?.length > 0 &&
                          spokePerson?.map((curItem) => {
                            return (
                              <>
                                <li className="border text-sm font-medium bg-white border-gray-400 text-gray-600 px-2 py-1 rounded-md flex items-center">
                                  {curItem?.value?.slice(0, 1)?.toUpperCase()}
                                  {curItem?.value?.slice(1)?.toLowerCase()}
                                  <span
                                    onClick={() => deActiveSpokes(curItem?.id)}
                                    className="cursor-pointer material-icons-outlined bg-gray-500 icon-10 p-1 text-white rounded-full ml-2"
                                  >
                                    close
                                  </span>
                                </li>
                              </>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* [/THIRD SLIDER END] */}
        </div>
        {/*[/Navigation buttons start] */}
        <div className="navigation flex justify-center gap-x-4 ">
          {currentPage > 1 ? (
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="bg-gray-600 px-3 py-3 text-white cursor-pointer rounded-md font-medium text-xl flex-grow flex-shrink-0 basis-2/4"
            >
              Previous
            </button>
          ) : (
            ""
          )}

          {currentPage === 1 && (
            <button
              onClick={handleNext}
              disabled={brand?.length <= 0 || brand[0]?.keyword?.length <= 0}
              className={`${
                brand?.length <= 0 || brand[0]?.keyword?.length <= 0
                  ? "bg-gray-400 px-3 py-3 text-white rounded-md  font-medium text-xl  flex-grow flex-shrink-0 basis-2/4"
                  : "bg-[#002b5b] px-3 py-3 text-white rounded-md font-medium text-xl  flex-grow flex-shrink-0 basis-2/4"
              }  `}
            >
              Next
            </button>
          )}

          {currentPage === 2 && (
            <button
              onClick={handleNext}
              disabled={competitor?.every(
                (curItem) => curItem?.keyword?.length <= 0
              )}
              className={`${
                competitor?.every((curItem) => curItem?.keyword?.length <= 0)
                  ? "bg-gray-400 px-3 py-3 text-white rounded-md  font-medium text-xl  flex-grow flex-shrink-0 basis-2/4"
                  : "bg-[#002b5b] px-3 py-3 text-white rounded-md  font-medium text-xl  flex-grow flex-shrink-0 basis-2/4"
              }  `}
            >
              Next
            </button>
          )}

          {currentPage === 3 && (
            <button
              onClick={() => onClose()}
              disabled={spokePerson?.length <= 0 && currentPage === 3}
              className={`${
                spokePerson?.length <= 0
                  ? "text-center bg-gray-400 uppercase  text-white px-3 py-3 rounded-md  font-medium text-lg flex-grow flex-shrink-0 basis-2/4"
                  : "text-center bg-[#002b5b] uppercase cursor-pointer text-white px-3 py-3 rounded-md  font-medium text-lg flex-grow flex-shrink-0 basis-2/4"
              }`}
            >
              Save
            </button>
          )}
        </div>
        {/*[/Navigation buttons end] */}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default SetBrandPopup;
