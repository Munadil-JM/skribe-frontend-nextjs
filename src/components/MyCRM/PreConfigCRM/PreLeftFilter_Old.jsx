// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Link from "next/link";
// import axios from "axios";

const PreLeftFilter = ({
  open,
  openStatus,
  view,
  cityData,
  beatData,
  mediaData,
  outletData,

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
                  {cityData &&
                    cityData?.length > 0 &&
                    cityData?.map((curItem, id) => {
                      return (
                        <>
                          <li className="flex w-full gap-x-2" key={id}>
                            <input
                              type="checkbox"
                              name={curItem.geoName}
                              value={curItem.geoName}
                              id={curItem.intGeoId}
                              hidden={
                                cityData[0].geoName === "No City Exist"
                                  ? true
                                  : false
                              }
                              //   checked={curItem.status}
                              className="peer/published w-3 accent-orange-600"
                              key={id}
                            />
                            <label
                              htmlFor={curItem.intGeoId}
                              className="text-sm lowercase  text-gray-400 first-letter:uppercase"
                            >
                              {curItem.geoName}
                            </label>
                          </li>
                        </>
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
                  {beatData &&
                    beatData?.length > 0 &&
                    beatData?.map((curItem, index) => {
                      return (
                        <>
                          <li className="flex w-full gap-x-2" key={index}>
                            <input
                              type="checkbox"
                              id={curItem.intBeatId}
                              name={curItem.vchBeat}
                              value={curItem.vchBeat}
                              hidden={
                                beatData[0].vchBeat === "No Beat Exist"
                                  ? true
                                  : false
                              }
                              className="peer/published w-3 accent-orange-600"
                            />
                            <label
                              htmlFor={curItem.intBeatId}
                              className="text-sm lowercase  text-gray-400 first-letter:uppercase"
                            >
                              {curItem.vchBeat}
                            </label>
                          </li>
                        </>
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
                    onKeyUp={(e) => searchByMedia(e.target.value)}
                    className="w-full rounded-lg bg-zinc-50 px-3 py-2 text-sm text-gray-400 focus:outline-none"
                    placeholder="Search Media Types"
                  />
                </div>
              </div>
              <div className="scroll my-4 max-h-60 overflow-y-auto">
                <ul className="flex flex-row flex-wrap gap-y-2">
                  {mediaData &&
                    mediaData?.length > 0 &&
                    mediaData?.map((curItem, index) => {
                      return (
                        <>
                          <li className="flex w-full gap-x-2" key={index}>
                            <input
                              type="checkbox"
                              id={curItem?.mediaTypeId}
                              name={curItem?.mediaTypeName}
                              value={curItem?.mediaTypeName}
                              hidden={
                                mediaData[0].mediaTypeName === "No Media Exist"
                                  ? true
                                  : false
                              }
                              className="peer/published w-3 accent-orange-600"
                            />
                            <label
                              htmlFor={curItem?.mediaTypeId}
                              className="text-sm lowercase  text-gray-400 first-letter:uppercase"
                            >
                              {curItem?.mediaTypeName}
                            </label>
                          </li>
                        </>
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
                    onKeyUp={(e) => searchByOutlet(e.target.value)}
                    className="w-full rounded-lg bg-zinc-50 px-3 py-2 text-sm text-gray-400 focus:outline-none"
                    placeholder="Search Outlet"
                  />
                </div>
              </div>
              <div className="scroll my-4 max-h-60 overflow-y-auto">
                <ul className="flex flex-row flex-wrap gap-y-2">
                  {outletData &&
                    outletData?.length > 0 &&
                    outletData?.map((curItem, index) => {
                      return (
                        <>
                          <li className="flex w-full gap-x-2" key={index}>
                            <input
                              type="checkbox"
                              id={curItem?.outletId}
                              name={curItem?.outletName}
                              value={curItem?.outletName}
                              hidden={
                                outletData[0].outletName === "No Outlet Exist"
                                  ? true
                                  : false
                              }
                              className="peer/published w-3 accent-orange-600"
                            />
                            <label
                              htmlFor={curItem?.outletId}
                              className="text-sm lowercase  text-gray-400 first-letter:uppercase"
                            >
                              {curItem?.outletName}
                            </label>
                          </li>
                        </>
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

export default PreLeftFilter;
