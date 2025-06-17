"use client";

import { useState } from "react";
import Link from "next/link";
// import { useSelector } from "react-redux";

import { useEffect } from "react";

const BeatTabs = ({ tabsData, nametoken }) => {
  const [activeTab, setActiveTab] = useState(0);
  // const token = useSelector((state) => state.auth.authToken);

  const beatLoad = (name, indexVal) => {
    setActiveTab(indexVal);
    nametoken(name);
  };

  useEffect(() => {
    if (tabsData.length > 0) {
      let val = encodeURIComponent(tabsData[0].beatName)
        .replace(/'/g, "%27")
        .replace(/"/g, "%22");
      nametoken(val);
    }
  }, [tabsData]);

  return (
    <>
      {tabsData.length > 0 &&
        tabsData.map((data, ind) => {
          if (data.status === true) {
            return (
              <li key={data.beatId}>
                <Link
                  href={""}
                  onClick={() => beatLoad(data.beatName, ind)}
                  className={
                    activeTab === ind
                      ? "flex bg-gray-600 bg-opacity-60 px-4 py-2 text-sm  text-gray-500"
                      : "flex bg-teal-50 bg-opacity-60 px-4 py-2 text-sm text-gray-500 hover:bg-gray-400 hover:text-white"
                  }
                >
                  {data.beatName}
                </Link>
              </li>
            );
          }
        })}
    </>
  );
};

export default BeatTabs;
