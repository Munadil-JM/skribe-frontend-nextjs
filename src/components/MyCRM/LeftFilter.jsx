// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Link from "next/link";
// import axios from "axios";
// import { CRMAPI } from "../../constants";

//open={setIsOpen}
//openStatus={isOpen}
const LeftFilter = ({
  open,
  openStatus,
  view,
  crmCity,
  crmBeat,
  crmMediaType,
  crmOutlet,
  cityFilter,
  beatFilter,
  mediaFilter,
  outletFilter,
  searchByCity,
  searchByBeat,
  searchByMedia,
  searchByOutlet,
}) => {
  return (
    <fieldset
      className={
        view
          ? "rounded-xl border border-gray-300 bg-white px-3"
          : " sticky top-10 w-full self-start rounded-xl border border-gray-300 px-3"
      }
    >
      <legend className="px-3">Filters</legend>
      <div className="w-full p-3">
        <div>
          <h3
            onClick={() => {
              open((prevState) => ({
                ...prevState,
                city: !prevState.city,
              }));
            }}
            className={
              openStatus.city
                ? "flex cursor-pointer items-center justify-between pb-2 text-sm font-medium text-gray-800"
                : "flex cursor-pointer items-center justify-between pb-2 text-sm text-gray-400 hover:text-gray-500"
            }
          >
            City
            <span
              className={
                openStatus.city
                  ? "material-icons-outlined transition-all"
                  : "material-icons-outlined -rotate-90 transition-all"
              }
            >
              expand_more
            </span>
          </h3>
          {openStatus.city && (
            <>
              <div>
                <div className="flex items-center rounded-md border border-gray-200 bg-zinc-50 pl-2 xl:w-full ">
                  <span className="material-icons-outlined text-sm text-gray-300">
                    search
                  </span>
                  <input
                    type="text"
                    name="city"
                    onKeyUp={(e) => searchByCity(e.target.value)}
                    className="w-full rounded-lg bg-zinc-50 px-3 py-2 text-sm text-gray-400 focus:outline-none"
                    placeholder="Search City"
                  />
                </div>
              </div>
              <div className="scroll my-4 max-h-60 overflow-y-auto">
                <ul className="flex flex-row flex-wrap gap-y-2">
                  {crmCity &&
                    crmCity?.length > 0 &&
                    crmCity?.map((curItem, id) => {
                      return (
                        <li className="flex w-full gap-x-2" key={id}>
                          {crmCity[0].geoName !== "No City Exist" && (
                            <input
                              type="checkbox"
                              name="abc"
                              value={curItem.geoName}
                              id={curItem.intGeoId}
                              onChange={(e) => cityFilter(e)}
                              className="peer/published w-3 accent-orange-600"
                              key={id}
                            />
                          )}
                          <label
                            htmlFor={curItem.intGeoId}
                            className="text-sm lowercase  text-gray-400 first-letter:uppercase"
                          >
                            {curItem.geoName}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </>
          )}
        </div>

        <div>
          <h3
            onClick={() => {
              open((prevState) => ({
                ...prevState,
                beats: !prevState.beats,
              }));
            }}
            className={
              openStatus.beats
                ? "flex cursor-pointer items-center justify-between pb-2 text-sm font-medium text-gray-800"
                : "flex cursor-pointer items-center justify-between pb-2 text-sm text-gray-400 hover:text-gray-500"
            }
          >
            Beat
            <span
              className={
                openStatus.beats
                  ? "material-icons-outlined transition-all"
                  : "material-icons-outlined -rotate-90 transition-all"
              }
            >
              expand_more
            </span>
          </h3>
          {openStatus.beats && (
            <>
              <div>
                <div className="flex items-center rounded-md border border-gray-200 bg-zinc-50 pl-2 xl:w-full ">
                  <span className="material-icons-outlined text-sm text-gray-300">
                    search
                  </span>
                  <input
                    type="text"
                    name="city"
                    className="w-full rounded-lg bg-zinc-50 px-3 py-2 text-sm text-gray-400 focus:outline-none"
                    placeholder="Search Beat"
                    onKeyUp={(e) => searchByBeat(e.target.value)}
                  />
                </div>
              </div>
              <div className="scroll my-4 max-h-60 overflow-y-auto">
                <ul className="flex flex-row flex-wrap gap-y-2">
                  {crmBeat &&
                    crmBeat?.length > 0 &&
                    crmBeat?.map((curItem, index) => {
                      return (
                        <li className="flex w-full gap-x-2" key={index}>
                          {crmBeat[0].beatName !== "No Beat Exist" && (
                            <input
                              type="checkbox"
                              id={curItem.beatId}
                              value={curItem.beatName}
                              onChange={(e) => beatFilter(e)}
                              className="peer/published w-3 accent-orange-600"
                            />
                          )}
                          <label
                            htmlFor={curItem.beatId}
                            className="text-sm lowercase  text-gray-400 first-letter:uppercase"
                          >
                            {curItem.beatName}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </>
          )}
        </div>

        <div>
          <h3
            onClick={() => {
              open((prevState) => ({
                ...prevState,
                mediaTypes: !prevState.mediaTypes,
              }));
            }}
            className={
              openStatus.mediaTypes
                ? "flex cursor-pointer items-center justify-between pb-2 text-sm font-medium text-gray-800"
                : "flex cursor-pointer items-center justify-between pb-2 text-sm text-gray-400 hover:text-gray-500"
            }
          >
            Media Types
            <span
              className={
                openStatus.mediaTypes
                  ? "material-icons-outlined transition-all"
                  : "material-icons-outlined -rotate-90 transition-all"
              }
            >
              expand_more
            </span>
          </h3>
          {openStatus.mediaTypes && (
            <>
              <div>
                <div className="flex items-center rounded-md border border-gray-200 bg-zinc-50 pl-2 xl:w-full ">
                  <span className="material-icons-outlined text-sm text-gray-300">
                    search
                  </span>
                  <input
                    type="text"
                    name="city"
                    className="w-full rounded-lg bg-zinc-50 px-3 py-2 text-sm text-gray-400 focus:outline-none"
                    placeholder="Search Media Types"
                    onKeyUp={(e) => searchByMedia(e.target.value)}
                  />
                </div>
              </div>
              <div className="scroll my-4 max-h-60 overflow-y-auto">
                <ul className="flex flex-row flex-wrap gap-y-2">
                  {crmMediaType &&
                    crmMediaType?.length > 0 &&
                    crmMediaType?.map((curItem, index) => {
                      return (
                        <li className="flex w-full gap-x-2" key={index}>
                          {crmMediaType[0].mediaTypeName !==
                            "No Media Exist" && (
                            <input
                              type="checkbox"
                              value={curItem.mediaTypeName}
                              id={curItem.mediaTypeId}
                              onChange={(e) => mediaFilter(e)}
                              className="peer/published w-3 accent-orange-600"
                            />
                          )}
                          <label
                            htmlFor={curItem.mediaTypId}
                            className="text-sm lowercase  text-gray-400 first-letter:uppercase"
                          >
                            {curItem.mediaTypeName}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </>
          )}
        </div>

        <div>
          <h3
            onClick={() => {
              open((prevState) => ({
                ...prevState,
                outlet: !prevState.outlet,
              }));
            }}
            className={
              openStatus.outlet
                ? "flex cursor-pointer items-center justify-between pb-2 text-sm font-medium text-gray-800"
                : "flex cursor-pointer items-center justify-between pb-2 text-sm text-gray-400 hover:text-gray-500"
            }
          >
            Outlet
            <span
              className={
                openStatus.outlet
                  ? "material-icons-outlined transition-all"
                  : "material-icons-outlined -rotate-90 transition-all"
              }
            >
              expand_more
            </span>
          </h3>
          {openStatus.outlet && (
            <>
              <div>
                <div className="flex items-center rounded-md border border-gray-200 bg-zinc-50 pl-2 xl:w-full ">
                  <span className="material-icons-outlined text-sm text-gray-300">
                    search
                  </span>
                  <input
                    type="text"
                    name="city"
                    className="w-full rounded-lg bg-zinc-50 px-3 py-2 text-sm text-gray-400 focus:outline-none"
                    placeholder="Search Outlet"
                    onKeyUp={(e) => searchByOutlet(e.target.value)}
                  />
                </div>
              </div>
              <div className="scroll my-4 max-h-60 overflow-y-auto">
                <ul className="flex flex-row flex-wrap gap-y-2">
                  {crmOutlet &&
                    crmOutlet?.length > 0 &&
                    crmOutlet?.map((curItem, index) => {
                      return (
                        <li className="flex w-full gap-x-2" key={index}>
                          {crmOutlet[0].outletName !== "No Outlet Exist" && (
                            <input
                              type="checkbox"
                              name="abc"
                              value={curItem?.outletName}
                              id={curItem.outletId}
                              onChange={(e) => outletFilter(e)}
                              className="peer/published w-3 accent-orange-600"
                            />
                          )}
                          <label
                            htmlFor={curItem?.outletId}
                            className="text-sm lowercase  text-gray-400 first-letter:uppercase"
                          >
                            {curItem?.outletName}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </fieldset>
  );
};

export default LeftFilter;
