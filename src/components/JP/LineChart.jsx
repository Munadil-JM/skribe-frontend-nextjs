"use client";

import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import userService from "../../Services/user.service";
import { JOURFREQCOUNT } from "../../constants";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";

const LineChart = ({ id, show, roleType, loading }) => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.get(`${JOURFREQCOUNT}?Jid=${id}`);
        if (response.response.status === "Ok") {
          const buckets = response.data.aggregations.articles_per_week.buckets;

          const sortedBuckets = buckets.sort((a, b) => a.key - b.key);

          const dates = sortedBuckets.map((bucket) => {
            const date = new Date(bucket.key);
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
          });

          const counts = sortedBuckets.map((bucket) => bucket.doc_count);

          setCategories(dates);
          setSeries([{ name: "Article Count", data: counts }]);
        } else {
          console.error("Failed to fetch data:", response.response.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const options = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Frequency",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: categories,
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Article Count",
      },
    },
  };
  return (
    <>
      {roleType?.includes("Freebies") && categories?.length > 0 ? (
        <>
          <div className="relative border border-gray-200 mx-2 mt-6 rounded-[10px] md:mx-10">
            <div className="blur-sm ">
              {Array.from({ length: 2 }).map((_, index) => (
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
                onClick={() => show}
                className="cursor-pointer flex justify-center px-10 self-center gap-x-2 mx-4 bg-[#6521AD] py-2 rounded-lg text-center text-white text-md"
              >
                Updgrade to View
              </Link>
            </div>
          </div>
        </>
      ) : categories.length > 0 ? (
        <div className="mx-2 mt-6 rounded-[10px] border border-black/10 md:mx-10">
          <Chart options={options} series={series} type="line" height="300" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default LineChart;
