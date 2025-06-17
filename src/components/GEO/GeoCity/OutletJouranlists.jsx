import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SearchRecord from "../../JournalistSearch/SearchRecord";
// import { useParams } from "react-router-dom";
import Link from "next/link";
import { PRECRM_POSTDATA, STATICCOUNT } from "../../../constants";
import userService from "../../../Services/user.service";
import BuildCampaign from "../../Campaign/BuildCampaign";
import { useNotification } from "../../ErrorAlert/ErrorContextNotification";

const OutletJouranlists = ({
  outletId,
  data,
  loading,
  open,
  onClose,
  handleScroll,
}) => {
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);
  const [selectedJournalists, setSelectedJournalists] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({ count: 0 });
  const [selectAllLabel, setSelectAllLabel] = useState("Select All");
  const [selectedJournalistsLength, setLength] = useState(0);
  const [postDataToCrm, setPostDataToCrm] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const { cityId } = useParams();

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
      selectedJournalists.length - 1 === data.length
        ? "Unselect All"
        : "Select All"
    );
  };

  useEffect(() => {
    if (selectAllLabel === "Unselect All" && !selectedJournalists.length) {
      setSelectAllLabel("Select All");
    }
  }, [data]);

  const handleSelectAll = () => {
    if (selectedJournalists.length === data.length) {
      setSelectedJournalists([]);
      setSelectAllLabel("Select All");
    } else {
      const allIds = data.map((journalist) => journalist.intJournalistId);
      setSelectedJournalists((prevSelectedJournalists) =>
        prevSelectedJournalists.length === allIds.length ? [] : allIds
      );

      setSelectAllLabel((prevLabel) =>
        prevLabel === "Select All" ? "Unselect All" : "Select All"
      );
    }
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

  const addInCRM = () => {
    if (selectedJournalists.length === 0) {
      warning("Please make a selection", "warning");
    } else if (selectedJournalists?.length > 5) {
      warning("you can not add to crm more than 5 Journalist", "warning");
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
              dataSubmit?.insertedCount + " new journalists added to CRM",
              "success"
            );
            for (let i = 0; i < postDataToCrm.length; i++) {
              for (let j = 0; j < data.length; j++) {
                if (
                  postDataToCrm[i] === data[j].intJournalistId &&
                  data[j].crmStatus === false
                ) {
                  data[j].crmStatus = true;
                }
              }
            }
          }
        })
        .catch((error) => error(error, "error"))
        .finally(() => {
          setPostDataToCrm([]);
          setSelectedJournalists([]);
        });
    }

    // setbyJournalist([data]);
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
    if (selectAllLabel === "Select All") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [selectAllLabel === "Select All"]);

  useEffect(() => {
    setLength(selectedJournalists.length);
  }, [selectedJournalists]);

  if (!open) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-50 bg-gray-700 opacity-70"></div>
      {/* <div className="fixed left-1/2 top-1/2 z-[55] w-2/4 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-2xl"> */}
      <section
        className={`fixed left-1/2 top-1/2 z-[50] w-2/4 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-2xl ${
          open && "abc "
        }`}
      >
        <button onClick={onClose} className="absolute -right-3 -top-4">
          <span className="material-icons-outlined rounded-full bg-white p-1 text-gray-800 hover:bg-gray-400 hover:text-gray-200">
            close
          </span>
        </button>
        <div className="relative flex items-center justify-between border-b border-gray-200">
          <h2 className="text-md mb-3 flex w-full items-center justify-between font-medium leading-5 text-gray-600">
            <span className="text-sm font-medium text-gray-600">
              {outletId.outletName} Results {outletId.totalResults}
            </span>

            <div className="relative flex gap-x-3">
              {data?.length > 0 && (
                <>
                  <button
                    className="flex items-center whitespace-nowrap rounded-[5px] border border-[#002b5b] px-3  py-0 text-xs text-[#002b5b]"
                    // to="/customcrm"
                    onClick={handleSelectAll}
                  >
                    {selectAllLabel}

                    {selectedJournalistsLength !== 0 && (
                      <div
                        id="selectCount"
                        className="absolute flex h-9 w-9 items-center justify-center rounded-2xl bg-[#fac540] text-center align-middle text-sm font-bold text-[#002b5b]"
                      >
                        {selectAllLabel === "Unselect All" &&
                        outletId.totalResults <= STATICCOUNT
                          ? outletId.totalResults
                          : selectAllLabel === "Unselect All"
                            ? STATICCOUNT
                            : selectedJournalistsLength}
                      </div>
                    )}
                  </button>

                  <input
                    type="button"
                    value="Add To CRM"
                    // disabled={selectedJournalists.length > 5 && true}
                    className="flex cursor-pointer items-center whitespace-nowrap rounded-[5px] border border-[#002b5b]  px-3 py-1 text-xs  text-[#002b5b]"
                    // href="/customcrm"
                    onClick={() => addInCRM()}
                  />
                  <div className="relative flex">
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
          </h2>
        </div>
        <div className=" mt-6 pr-3 overflow-scroll overflow-x-hidden h-[400px]">
          <div className="flex w-full pb-4  flex-wrap self-start [&>*:last-child]:flex-none [&>*:nth-child(n-2)]:flex-none">
            {data
              ? data?.length > 0
                ? data?.map((curItem) => (
                    <SearchRecord
                      key={curItem.intJournalistId}
                      data={curItem}
                      x={selectedFilters}
                      onCheckboxChange={getSelectedData}
                      //selectAllLabel
                      //isSelected={selectAllLabel == "Unselect All" && false}
                      disabled={selectAllLabel === "Unselect All" && true}
                      isSelected={selectedJournalists?.includes(
                        curItem?.intJournalistId
                      )}
                    />
                  ))
                : loading
                  ? "Loading..."
                  : "No Record Found"
              : "No Record Found"}
          </div>
          {outletId?.token && selectAllLabel === "Select All" && (
            <div className="flex pb-0">
              <span
                onClick={handleScroll}
                className="cursor-pointer mx-auto mb-5 rounded-md bg-[#002b5b] px-3 py-2 text-sm font-normal text-white  md:w-auto md:border-0"
              >
                Load more
              </span>
            </div>
          )}

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
              outletFilterbyGEO={outletId}
              // cityFilterbyGEO={cityId}
            />
          )}
        </div>
      </section>
    </>,
    document.getElementById("portal")
  );
};

export default OutletJouranlists;
