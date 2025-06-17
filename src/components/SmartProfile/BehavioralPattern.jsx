"use client";

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ColoumnChart from "./ColoumnChart";
import LineChart from "./LineChart";
import userService from "../../Services/user.service";
import {
  JOURNALISTBRAND,
  // JOURNALISTSPOKESPERSON,
  // JOURNALISTTOPICS,
} from "../../constants";
import tokenService from "../../Services/token.service";
import Link from "next/link";
import { usePopup } from "../Header/CreatePopup";

const BehavioralPattern = ({ id }) => {
  const [spokespersonData, setSpokespersonData] = useState([]);
  const [topicsData, setTopicsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [chartData, setChartData] = useState([]);
  const [series, setSeries] = useState([]);
  const { showPopup } = usePopup();
  let roleType = tokenService.getLocalRole();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.get(`${JOURNALISTBRAND}?Jid=${id}`);
        // const response2 = await userService.get(
        //   `${JOURNALISTTOPICS}?Jid=${id}`
        // );
        setSpokespersonData(response?.spokePerson || []);
        setTopicsData(response?.topics || []);

        const formattedData = response?.brand?.map((key) => ({
          x: key?.name?.charAt(0).toUpperCase() + key?.name?.slice(1),
          y: key?.count,
        }));

        setChartData(formattedData); // instead of response?.brand
        setSeries([
          {
            name: "Brands & Organizations",
            data: response?.brand?.map((numb) => numb.count),
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await userService.get(
  //         `${JOURNALISTSPOKESPERSON}?Jid=${id}`
  //       );
  //       const response2 = await userService.get(
  //         `${JOURNALISTTOPICS}?Jid=${id}`
  //       );
  //       setSpokespersonData(response?.data || []);
  //       setTopicsData(response2?.data || []);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  const hasNoData =
    !loading && spokespersonData.length === 0 && topicsData.length === 0;
  return (
    <>
      <div className="flex flex-col mx-2 md:mx-10 xl:flex-row gap-y-4 xl:gap-4 xl:mt-0">
        {loading ? (
          <div className="p-4 border border-black/10 rounded-[10px] xl:w-1/2">
            <Skeleton height={300} />
          </div>
        ) : !loading &&
          roleType?.includes("Freebies") &&
          chartData?.length > 0 ? (
          <>
            <div className="relative w-1/2 border border-gray-200 rounded-[10px]">
              <div className="blur-sm ">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="m-4">
                    <Skeleton width={300} height={20} className="mb-2" />
                    <Skeleton width="80%" height={15} className="mb-2" />
                    <Skeleton width="90%" height={15} className="mb-2" />
                  </div>
                ))}
              </div>
              <div className="absolute flex flex-col left-1/2 w-full top-1/2 px-10 -translate-x-1/2 -translate-y-1/2">
                <h2 className="text-lg font-semibold pb-2 text-center">
                  Unlock More with Premium
                </h2>
                <p className="text-center pb-2 text-balance">
                  Upgrade to a paid plan to view the latest media movements
                </p>
                <Link
                  href="#"
                  onClick={() => showPopup()}
                  className="cursor-pointer flex px-10 self-center gap-x-2 mx-4 bg-[#6521AD] py-2 rounded-lg text-center text-white text-md"
                >
                  Updgrade to View
                </Link>
              </div>
            </div>
          </>
        ) : (
          <ColoumnChart id={id} chartData={chartData} series={series} />
        )}

        {loading ? (
          <div className="p-8 border border-black/10 rounded-[10px] xl:w-1/2">
            <Skeleton height={300} />
          </div>
        ) : !loading &&
          roleType?.includes("Freebies") &&
          (spokespersonData.length > 0 || topicsData.length > 0) ? (
          <>
            <div className="relative w-1/2 border border-gray-200 rounded-[10px]">
              <div className="blur-sm ">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="m-4">
                    <Skeleton width={300} height={20} className="mb-2" />
                    <Skeleton width="80%" height={15} className="mb-2" />
                    <Skeleton width="90%" height={15} className="mb-2" />
                  </div>
                ))}
              </div>
              <div className="absolute flex flex-col left-1/2 w-full top-1/2 px-10 -translate-x-1/2 -translate-y-1/2">
                <h2 className="text-lg font-semibold pb-2 text-center">
                  Unlock More with Premium
                </h2>
                <p className="text-center pb-2 text-balance">
                  Upgrade to a paid plan to view the latest media movements
                </p>
                <Link
                  href="#"
                  onClick={() => showPopup()}
                  className="cursor-pointer flex justify-center px-10 self-center gap-x-2 mx-4 bg-[#6521AD] py-2 rounded-lg text-center text-white text-md"
                >
                  Updgrade to View
                </Link>
              </div>
            </div>
          </>
        ) : (!loading && spokespersonData.length > 0) ||
          topicsData.length > 0 ? (
          <div className="border border-black/10 rounded-[10px] px-4 py-2 xl:w-1/2">
            <div className="mt-2 ml-4 mr-4">
              <div className="text-[14px] font-medium text-[#333333] flex">
                {spokespersonData.length > 0 ? (
                  <div className="w-1/2">Quoted Spokespeople</div>
                ) : (
                  spokespersonData?.map((item, index) => (
                    <div
                      key={index}
                      className="text-[12px] font-[400] text-customGray64 mt-4"
                    >
                      {item.name}
                    </div>
                  ))
                )}
                {topicsData.length > 0 && <div className="w-1/2">Topics</div>}
              </div>
              <div className="flex h-[300px] overflow-scroll overflow-x-hidden">
                <div className="w-1/2">
                  {loading ? (
                    <Skeleton count={10} height={40} />
                  ) : spokespersonData.length > 0 ? (
                    spokespersonData.map((item, index) => (
                      <div
                        key={index}
                        className="text-[12px] font-[400] text-customGray64 mt-4"
                      >
                        {item.name}
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
                <div className="w-1/2 pl-[5px]">
                  {loading ? (
                    <Skeleton count={10} height={40} />
                  ) : topicsData.length > 0 ? (
                    topicsData.map((item, index) => (
                      <div
                        key={index}
                        className="text-[12px] font-[400] text-customGray64 mt-4"
                      >
                        {item.name}
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {hasNoData && <></>}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        {loading ? (
          <div className="mx-2 mt-6 rounded-[10px] border border-black/10 md:mx-10 ">
            <Skeleton height={300} />
          </div>
        ) : (
          <LineChart
            id={id}
            show={showPopup}
            roleType={roleType}
            loading={roleType}
          />
        )}
      </div>
    </>
  );
};

export default BehavioralPattern;
