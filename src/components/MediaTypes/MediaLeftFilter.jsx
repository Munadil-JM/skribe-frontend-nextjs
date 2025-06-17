// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { CRMAPI } from "../../constants";
// import Filters from "../Filters/Filters";

const LeftFilter = ({
  // open,
  // openStatus,
  view,
  // leftFilter,
  // crmCity,
  // crmBeat,
  // crmMediaType,
  // crmOutlet,
  // cityFilter,
  // beatFilter,
  // mediaFilter,
  // outletFilter,
  // searchByCity,
  // searchByBeat,
  // searchByMedia,
  // searchByOutlet,
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
      <div className="w-full p-3">{/* <Filters /> */}</div>
    </fieldset>
  );
};

export default LeftFilter;
