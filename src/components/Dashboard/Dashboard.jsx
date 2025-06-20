"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import TrendingJornalists from "./TrendingJornalists";
import BeatWatch from "./BeatWatch";
import Skribe365 from "./Skribe365";
import Favorites from "./Favorites";
import useMetadata from "../BeforeLoginPages/custom-hooks/useMetadata";

const Dashboard2 = () => {
  const [trackingId, setTrackingId] = useState();

  useMetadata(
    "Skribe - Dashboard",
    "Skribe - Dashboard",
    "https://app.goskribe.com/dashboard"
  );

  useEffect(() => {
    setTrackingId(generateUUID());
  }, []);

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  return (
    <>
      <div className="bg-[#F8F9FC] min-h-screen font-poppins">
        <div className="px-3 xl:px-8 pb-6 xl:w-11/12 w-12/12 xl:pl-8 section">
          {/* <p className="pt-4 mb-4 text-xl font-semibold text-[#333333] ">
            Dashboard
          </p> */}
          <div className="md:flex gap-4 lg:gap-x-8">
            <div className="flex flex-col gap-6 mt-3 md:flex md:w-4/12">
              <Skribe365 />
              <Favorites />
            </div>
            <div className="flex flex-col flex-wrap self-start gap-4 mt-3 md:w-8/12">
              <Header />
              <TrendingJornalists />
              <BeatWatch />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard2;
