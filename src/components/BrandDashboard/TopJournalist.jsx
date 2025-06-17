"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import JournalistTable from "./JournalistTable";
import { BYBRANDTOPJOURNO, PRECRM_POSTDATA } from "../../constants";
import userService from "../../Services/user.service";

import { useNotification } from "../ErrorAlert/ErrorContextNotification";
import BuildCampaign from "../Campaign/BuildCampaign";

const TopJournalist = ({ startDate, endDate, render }) => {
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const [postDataToCrm, setPostDataToCrm] = useState([]);

  const [journalistByBrand, setJournalistByBrand] = useState([]);
  const [journalistByCompetitor, setJournalistByCompetitor] = useState([]);
  const [selectedJournalists, setSelectedJournalists] = useState([]);
  const [selectAllLabel, setSelectAllLabel] = useState("Select All");

  const BrandCompApi = async () => {
    setLoader(true);
    try {
      const url1 = `${BYBRANDTOPJOURNO}?Brand_Competitor=Brand&StartDate=${startDate}&EndDate=${endDate}`;
      const url2 = `${BYBRANDTOPJOURNO}?Brand_Competitor=Competitor&StartDate=${startDate}&EndDate=${endDate}`;
      const [res1, res2] = await Promise.all([
        userService.post(url1),
        userService.post(url2),
      ]);

      if (res1?.response?.status === "Ok") {
        setJournalistByBrand(res1?.journalistCounts);
      }
      if (res2?.response?.status === "Ok") {
        setJournalistByCompetitor(res2?.journalistCounts);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    BrandCompApi();
  }, [startDate, endDate, render]);

  const addInCRM = () => {
    if (selectedJournalists.length === 0) {
      warning("Please make a selection", "warning");
    } else if (selectedJournalists?.length > 5) {
      warning("you can not add to crm more than 5 Journalist", "warnig");
    } else {
      let { id } = JSON.parse(localStorage.getItem("userInfo"));
      const postData = {
        clientId: 0,
        userId: id,
        jourId: selectedJournalists,
      };
      userService
        .post(PRECRM_POSTDATA, postData)
        .then((dataSubmit) => {
          if (dataSubmit?.response?.status === "ReachedLimit") {
            warning(dataSubmit?.response?.message, "warning");
          }
          if (dataSubmit?.response?.status === "Ok") {
            success(
              dataSubmit?.insertedCount + " new journalists added to CRM ",
              "success"
            );
            for (let i = 0; i < postDataToCrm.length; i++) {
              for (let j = 0; j < journalistByBrand.length; j++) {
                if (
                  postDataToCrm[i] === journalistByBrand[j].journalistId &&
                  journalistByBrand[j].crm === false
                ) {
                  journalistByBrand[j].crm = true;
                }
              }
            }

            for (let i = 0; i < postDataToCrm.length; i++) {
              for (let j = 0; j < journalistByCompetitor.length; j++) {
                if (
                  postDataToCrm[i] === journalistByCompetitor[j].journalistId &&
                  journalistByCompetitor[j].crm === false
                ) {
                  journalistByCompetitor[j].crm = true;
                }
              }
            }
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setPostDataToCrm([]);
          setSelectedJournalists([]);
        });
    }
    setJournalistByBrand([...journalistByBrand]);
  };

  const getSelectedData = (target, journoId) => {
    handleSelect(journoId);

    AddToCrm(target.checked, journoId);
  };

  const handleSelect = (journalistId) => {
    setSelectedJournalists((prevSelectedJournalists) => {
      if (prevSelectedJournalists.includes(journalistId)) {
        return prevSelectedJournalists.filter(
          (selectedId) => selectedId !== journalistId
        );
      } else {
        return [...prevSelectedJournalists, journalistId];
      }
    });
    setSelectAllLabel((prevLabel) =>
      selectedJournalists.length - 1 === journalistByBrand.length
        ? "Unselect All"
        : "Select All"
    );
  };

  const AddToCrm = (target, intJournalistId) => {
    const postData = postDataToCrm;
    if (target) {
      postData.push(intJournalistId);
      setPostDataToCrm([...postData]);
    } else {
      let unSelectData = postDataToCrm.filter(
        (curId) => curId !== intJournalistId
      );
      setPostDataToCrm([...unSelectData]);
    }
  };

  const buildCampPopup = () => {
    if (selectedJournalists.length === 0) {
      warning(
        "You need to select journalists to create a media list",
        "warning"
      );
    } else if (selectedJournalists.length > 0) {
      setIsOpen(true);
      document.body.classList.add("overflow-hidden");
    }
  };

  useEffect(() => {
    if (loader) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [loader]);

  return (
    <>
      <div className="flex justify-between w-full gap-6 sm:flex-col lg:flex-row flex-col">
        <div className="w-full lg:w-1/2">
          <p className="text-gray-700 lg:text-md font-medium">
            Top Journalists (Brand):
          </p>
          <p className="text-gray-500 lg:text-xs">
            Top journalists that mentioned the brand
          </p>
          <div className="mt-4 w-full border border-black/10 rounded-[12px] ">
            <div className="bg-[#F7F7F7] text-[14px] font-[400] justify-between flex py-4 rounded-t-[12px]">
              <div className="flex items-center justify-center w-1/2">
                Journalists
              </div>
              <div className="flex items-center justify-center w-1/2 pl-[20px]">
                Mentions
              </div>
            </div>
            <div className="h-[550px] overflow-scroll overflow-x-hidden">
              {loader ? (
                <p className="p-3">Loading...</p>
              ) : journalistByBrand?.length > 0 ? (
                journalistByBrand?.map((curItem, index) => (
                  <JournalistTable
                    data={curItem}
                    key={index}
                    loading={loader}
                    x={selectedFilters}
                    onCheckboxChange={getSelectedData}
                    disabled={selectAllLabel === "Unselect All" && true}
                    isSelected={selectedJournalists?.includes(
                      curItem?.journalistId
                    )}
                  />
                ))
              ) : (
                <p className="text-gray-400 text-md p-3">No Record Found</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 ">
          <div className="flex justify-between flex-col md:flex-row w-full">
            <div className="lg:w-[55%] w-full xl:w-full pr-2">
              <p className="text-gray-700 lg:text-md font-medium">
                Top Journalists (Competition):
              </p>
              <p className="text-gray-500 lg:text-xs  lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis">
                Top journalists that mentioned the competition
              </p>
            </div>
            <div className="flex items-center flex-grow">
              <div className="flex flex-wrap justify-end pr-0 bg-white">
                <div className="relative flex gap-x-3 items-start xl:pt-0">
                  {(journalistByBrand?.length > 0 ||
                    journalistByCompetitor?.length > 0) && (
                    <>
                      <input
                        type="button"
                        value="Add To CRM"
                        // disabled={selectedJournalists.length > 5 && true}
                        className="flex cursor-pointer items-center whitespace-nowrap rounded-[5px] border border-[#002b5b]  px-3 py-1 text-xs  text-[#002b5b]"
                        // href="/customcrm"
                        onClick={() => addInCRM()}
                      />

                      <div className="relative flex items-start text-nowrap">
                        <Link
                          href="#"
                          onClick={() => buildCampPopup()}
                          className="relative flex items-center rounded-[5px] border border-[#002b5b]  px-3  py-1 text-xs  text-[#002b5b]"
                        >
                          Create List
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 w-full border border-black/10 rounded-[12px]">
            <div className="bg-[#F7F7F7] text-[14px] font-[400] justify-between flex py-4 rounded-t-[12px]">
              <div className="flex items-center justify-center w-1/2">
                Journalists
              </div>
              <div className="flex items-center justify-center w-1/2 pl-[10px]">
                Mentions
              </div>
            </div>
            <div className="h-[550px] overflow-scroll overflow-x-hidden">
              {loader ? (
                <p className="p-3">Loading...</p>
              ) : journalistByCompetitor?.length > 0 ? (
                journalistByCompetitor?.map((curItem, index) => (
                  <JournalistTable
                    data={curItem}
                    key={index}
                    loading={loader}
                    x={selectedFilters}
                    onCheckboxChange={getSelectedData}
                    // disabled={selectAllLabel === "Unselect All" && true}
                    isSelected={selectedJournalists?.includes(
                      curItem?.journalistId
                    )}
                  />
                ))
              ) : (
                <p className="text-gray-400 text-md p-3">No Record Found</p>
              )}
            </div>
          </div>
        </div>

        {isOpen && (
          <BuildCampaign
            selectAllLabel={selectAllLabel}
            open={isOpen}
            filterValue={selectedFilters}
            onClose={() => {
              setIsOpen(false);
              document.body.classList.remove("overflow-hidden");
            }}
            selectedJournalists={selectedJournalists}
          />
        )}
      </div>
    </>
  );
};

export default TopJournalist;
