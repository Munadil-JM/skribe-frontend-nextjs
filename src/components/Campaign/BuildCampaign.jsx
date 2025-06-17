"use client";

import { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
import userService from "../../Services/user.service";
import { ADVANCESEARCH, CREATELIST } from "../../constants";
import { useRouter, useParams } from "next/navigation";
import { JOURNOBYFILTER } from "../../constants";
import { LISTCOUNT } from "../../constants";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";
// import { debug } from "util";

const BuildCampaign = ({
  open,
  onClose,
  selectedJournalists,
  filterValue,
  selectAllLabel,
  outletFilter,
  bureauFilter,
  columnist,
  international,
  beatFilter,
  Editor_Columnis_Bureau_Filter,
  //following data coming from GEO by City EG: Lucknow id 1664
  outletFilterbyGEO,
  cityFilterbyGEO,
  cityFilterbyJourno,
  typeSupp,
  supplement,
  isFilter,
  // GOOGLE SEARCH LIST FOR ALL JOURNO FROM AFTERLGOIN TO MAKE CAMPAIGN
  searchBy,
  searchValue,
  IdforAllJourno,

  //FOLLOWING FOR ADVANCE SEARCH page PASS AS KEY FOR ALL
  // JOURNALIST TO BUILD CAMPAIGN DIFF API
  advanceSearch,
  selectedType,
  sortBy,
}) => {
  const router = useRouter();
  const { id } = useParams();
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);

  const date = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    listName: "",
    journalistIds: [],
    vchListDescription: "",
  });

  const [errors, setErrors] = useState({
    listName: "",
    vchListDescription: "",
  });

  const [charCount, setCharCount] = useState(0);
  const maxCharLimit = 100; // Set your desired character limit here

  //select one by one journalist condition
  const [journalistCount, setjournalistCount] = useState([]);
  const [mediaCount, setMediaCount] = useState([]);
  const [languageCount, setLanguageCount] = useState([]);
  const [locationCount, setLocationCount] = useState([]);
  const [mediaTypes, setMediaTypes] = useState([]);

  const postData = { journalistIds: selectedJournalists };
  const getList = (url) => {
    userService.post(url, postData).then((result) => {
      if (result?.response?.status === "Ok") {
        setjournalistCount(result?.counts.jourCount);
        setMediaCount(result?.counts.mediaCount);
        setLanguageCount(result?.counts.languageCount);
        setLocationCount(result?.counts.locationCount);
        setMediaTypes(result?.counts.medias);
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "vchListDescription") {
      const inputValue = value;
      setFormData({ ...formData, [name]: value });
      setCharCount(inputValue?.length);
      setErrors({ ...errors, [name]: "" });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };
  // console.log(sortBy, "check sor by time");
  // console.log(searchBy, "check search bvla");
  const createList = (e) => {
    e.preventDefault();
    const { listName, vchListDescription } = formData;
    const newErrors = {
      listName: listName.trim() === "" ? "Name is required" : "",
      vchListDescription:
        vchListDescription.trim() === "" ? "Description is required" : "",
    };

    if (
      (filterValue?.count > 0 && selectAllLabel === "Unselect All") ||
      (filterValue?.count === 0 && selectAllLabel === "Unselect All")
    ) {
      let urlBuilder;
      if (id && bureauFilter === "bureau") {
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&OutletFilter=${id}&Editor_Columnis_Bureau_Filter=${bureauFilter}&`;
      } else if (id && Editor_Columnis_Bureau_Filter === "Anchor") {
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&OutletFilter=${id}&Editor_Columnis_Bureau_Filter=${Editor_Columnis_Bureau_Filter}&`;
      } else if (id && typeSupp === "supplement") {
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&supplement=${supplement}&`;
      } else if (id && Editor_Columnis_Bureau_Filter === "Producer") {
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&OutletFilter=${id}&Editor_Columnis_Bureau_Filter=${Editor_Columnis_Bureau_Filter}&`;
      } else if (id && Editor_Columnis_Bureau_Filter === "show") {
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&OutletId=${id}&`;
      } else if (id && Editor_Columnis_Bureau_Filter === "Editor") {
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&OutletFilter=${id}&Editor_Columnis_Bureau_Filter=${Editor_Columnis_Bureau_Filter}&`;
      } else if (id && columnist === "Columnis") {
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&OutletFilter=${id}&Editor_Columnis_Bureau_Filter=${columnist}&`;
      } else if (id && international === true) {
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&OutletFilter=${id}&IsInternational=${international}&`;
      } else if (beatFilter?.length > 0) {
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&BeatFilter=${beatFilter}&`;
      } else if (cityFilterbyGEO && outletFilterbyGEO.id) {
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&OutletFilter=${outletFilterbyGEO.id}&cityFilter=${cityFilterbyGEO}&`;
      } else if (cityFilterbyJourno) {
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&cityFilter=${cityFilterbyJourno}&`;
      } else if (id) {
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&OutletFilter=${id}&`;
      } else if (isFilter === "X") {
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&IsX=true&`;
      } else if (isFilter === "CRM") {
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&IsCrm=true&`;
      } else {
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&`;
      }

      let flag = false;
      for (let allKeys in filterValue) {
        if (filterValue[allKeys]?.length > 0) {
          let output = filterValue[allKeys].map(
            (curItem) => curItem.split(" ")[0]
          );
          if (filterValue[allKeys]?.length > 0 && !flag) {
            urlBuilder = `${urlBuilder}${allKeys}Filter=${output}`;
            flag = true;
          } else if (filterValue[allKeys]?.length > 0 && flag)
            urlBuilder = `${urlBuilder}&${allKeys}Filter=${output}`;
        }
      }

      if (newErrors.listName || newErrors.vchListDescription) {
        setErrors(newErrors);
        return;
      }

      userService
        .get(urlBuilder)
        .then((output) => {
          if (output?.status === "Created") {
            success(output?.message, "success");
            document.body.classList.remove("overflow-hidden");
            // router.push("/campaign-manager");
            router.push("/create-campaign");
          } else if (output?.status === "Already") {
            warning("List name already exist", "warning");
          } else if (output?.status === "Already") {
            warning(output?.message, "warning");
          }
        })

        .catch((error) => error(error.message, "error"));
    } else if (
      filterValue?.count === undefined &&
      selectAllLabel === "Unselect All"
    ) {
      if (newErrors.listName || newErrors.vchListDescription) {
        setErrors(newErrors);
        return;
      } else if (IdforAllJourno === "allJourno") {
        let urlBuilder;
        urlBuilder = `${JOURNOBYFILTER}?ListName=${listName}&VchListDescription=${vchListDescription}&SkribeMediaListId=${id}&Text=${searchValue}`;
        userService
          .get(urlBuilder)
          .then((output) => {
            if (output?.status === "Created") {
              success(output?.message, "success");
              document.body.classList.remove("overflow-hidden");
              router.push("/media-lists");
            } else if (output?.status === "Already") {
              warning("List name already exist", "warning");
            } else if (output?.status === "Already") {
              warning(output?.message, "warning");
            }
          })

          .catch((error) => error(error.message, "error"));
      } else if (
        filterValue?.count === undefined &&
        selectAllLabel === "Unselect All" &&
        advanceSearch === "advSearch" &&
        selectedType
      ) {
        let sortFilter = sortBy !== undefined && sortBy;
        let urlBuilder;
        urlBuilder = `${ADVANCESEARCH}?ListName=${listName}${sortFilter && `&sortBy=${sortBy}`}&type=${selectedType}&VchListDescription=${vchListDescription}&Text=${searchBy}`;

        userService
          .get(urlBuilder)
          .then((output) => {
            if (output?.status === "Created") {
              success(output?.message, "success");
              document.body.classList.remove("overflow-hidden");
              router.push("/create-campaign");
            } else if (output?.status === "Already") {
              warning("List name already exist", "warning");
            } else if (output?.status === "Already") {
              warning(output?.message, "warning");
            }
          })

          .catch((error) => error(error.message, "error"));
      }
    } else {
      if (newErrors.listName || newErrors.vchListDescription) {
        setErrors(newErrors);
        return;
      }

      userService
        .post(CREATELIST, {
          listName,
          vchListDescription,
          journalistIds: selectedJournalists,
        })
        .then((output) => {
          if (output?.status === "Created") {
            success("List created successfully", "success");
            document.body.classList.remove("overflow-hidden");
            router.push("/create-campaign");
          } else if (output?.status === "NotEnoughQuota") {
            warning(
              "You don't have Enough Quota to Pitch, Please talk to your Account Manager",
              "warning"
            );
          } else if (output?.status === "Already") {
            warning(output?.message, "warning");
          }
        })
        .catch((error) => error(error.message, "error"));
    }
  };

  useEffect(() => {
    if (selectedJournalists?.length > 0) {
      getList(`${LISTCOUNT}`);
    }
  }, [selectedJournalists]);

  if (!open) return null;

  return (
    <div>
      <div className="fixed inset-0 z-[999] bg-gray-700 opacity-70"></div>
      {((selectedJournalists?.length > 0 &&
        selectedJournalists?.length <= 500 &&
        selectAllLabel === "Select All") ||
        (selectedJournalists?.length > 0 &&
          selectAllLabel === "Unselect All")) && (
        <div className="fixed left-1/2 top-1/2 z-[1000] w-2/4 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-200">
            <h2 className="text-md font-medium text-gray-600">
              Build Campaign
            </h2>

            <button onClick={onClose}>
              <span className="material-icons-outlined rounded-full p-1  text-gray-800 hover:bg-gray-400 hover:text-gray-200">
                close
              </span>
            </button>
          </div>
          <form onSubmit={createList}>
            <div className="flex justify-end py-1">
              <span className="text-xs text-red-500">
                Campaign will be build, excluding ( In Transition, Left
                Journalism, Move Abroad, Deseased ) if there are any
              </span>
            </div>
            <div className="flex w-full">
              <div className="mx-2 my-1 w-3/6">
                <label className="block text-xs font-medium text-gray-500">
                  Date:
                </label>
                <input
                  type="date"
                  className="w-full rounded-md border border-gray-400 p-1 px-2 focus:outline-none text-sm  text-gray-500"
                  value={date}
                  disabled
                />
              </div>
              <div className="mx-2 my-1 w-3/6">
                <label className="block text-xs font-medium text-gray-500">
                  List Name:
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-400 p-1 px-2 focus:outline-none text-sm text-gray-500"
                  id="listName"
                  name="listName"
                  value={formData.listName}
                  onChange={handleInputChange}
                />
                <span className="text-red-500 text-xs">{errors.listName}</span>
              </div>
            </div>
            <div className="mx-2 my-1 relative">
              <label className="block text-xs font-medium text-gray-500">
                Description:
              </label>
              <textarea
                className="w-full resize-none rounded-md border border-gray-400  p-2 focus:outline-none text-sm text-gray-500"
                id="vchListDescription"
                name="vchListDescription"
                value={formData.vchListDescription}
                onChange={handleInputChange}
                maxLength={maxCharLimit}
              />
              <div className="flex justify-end absolute right-2 bottom-3">
                <span className="text-gray-300 text-[10px]">
                  Character Count: {charCount}/{maxCharLimit}
                </span>
              </div>
              <span className="text-red-500 text-xs absolute -bottom-2 left-0">
                {errors.vchListDescription}
              </span>
            </div>
            {/* {selectAllLabel === "Select All" ||
              (excludeJournalists?.length > 0 && ( */}
            {selectAllLabel === "Select All" && (
              <>
                <label className="ml-3 block text-sm font-medium text-gray-700">
                  Media Mix
                </label>
                <div className="flex">
                  <div className="mx-2 my-1 w-full">
                    <div className="flex">
                      <div className="m-1 flex h-20 w-1/2 flex-col items-center justify-center rounded-lg bg-slate-100 p-1">
                        {/* <div> */}
                        <p className="text-sm text-gray-600 text-center">
                          Journalist Count
                        </p>
                        <p className="text-center text-lg font-semibold text-[#EF724C]">
                          {journalistCount}
                        </p>
                        {/* </div> */}
                      </div>
                      <div className="m-1 flex h-20 w-1/2 flex-col items-center  justify-center rounded-lg bg-slate-100 p-1">
                        <p className="text-sm  text-gray-600 text-center">
                          Media Count
                        </p>
                        <p className="text-center text-lg font-semibold text-[#EF724C]">
                          {mediaCount}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="m-1 flex h-20 w-1/2 flex-col items-center justify-center rounded-lg bg-slate-100 p-1">
                        <p className="text-sm text-gray-600 text-center">
                          Language Count
                        </p>
                        <p className="text-center text-lg font-semibold text-[#EF724C]">
                          {languageCount}
                        </p>
                      </div>
                      <div className="m-1 flex h-20 w-1/2 flex-col items-center justify-center rounded-lg bg-slate-100 p-1">
                        <p className="text-sm text-gray-600 text-center">
                          Location Count
                        </p>
                        <p className="text-center text-lg font-semibold text-[#EF724C]">
                          {locationCount}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="m-1 h-44 rounded-lg bg-slate-100 p-5">
                      <ul className="max-h-40 overflow-y-auto">
                        {mediaTypes.map((medias) => (
                          <li
                            className="flex justify-between"
                            key={medias.value}
                          >
                            <p className="text-sm text-left">{medias.value}</p>
                            <span className="text-sm text-right">
                              {medias.count}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
            <button
              className="mt-2 w-fit cursor-pointer rounded-md bg-[#002b5b] px-3 py-2 text-xs font-normal text-white hover:bg-[#318fff] focus:outline-none"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/* <div className="absolute left-1/2 top-1/2 z-[51] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <p>You need to selection journalists to create a media list</p>
            <button onClick={onClose}>
              <span className="material-icons-outlined rounded-full p-1 text-gray-800 hover:bg-gray-400 hover:text-gray-200">
                close
              </span>
            </button>
          </div>
        </div> */}
      {selectedJournalists?.length > 1000 &&
        selectAllLabel === "Select All" && (
          <div className="w-1/ fixed left-1/2 top-1/2 z-[52] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <p>
                The selected journalist should have less then or equal 1000.
              </p>
              <button onClick={onClose}>
                <span className="material-icons-outlined rounded-full p-1 text-gray-200 hover:bg-gray-400 hover:text-gray-200">
                  close
                </span>
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default BuildCampaign;
