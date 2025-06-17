"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const GraphStats = ({
  langCount,
  cityCount,
  geoStatData,
  mediaType,
  totalResult,
  uniqueOutlet,
}) => {
  const isLoading =
    !langCount?.length ||
    !cityCount?.length ||
    !mediaType?.length ||
    !geoStatData;

  const [languagesChartData, setLanguagesChartData] = useState({
    series: [],
    options: {},
  });
  const [mediaDensityChartData, setMediaDensityChartData] = useState({
    series: [],
    options: {},
  });
  const [mediaTypeChartData, setMediaTypeChartData] = useState({
    series: [],
    options: {},
  });

  const stats = [
    {
      id: 1,
      title: "Total Media Outlets",
      value: uniqueOutlet || 0,
      imageSrc: "/assets/showmedia-outlets.webp",
    },
    {
      id: 2,
      title: "Total Languages",
      value: geoStatData?.lanCount || 0,
      imageSrc: "/assets/showmedia-languages.webp",
    },
    {
      id: 3,
      title: "Total Journalists",
      value: geoStatData?.jourCount || 0,
      imageSrc: "/assets/showmedia-journalists.webp",
    },
  ];

  useEffect(() => {
    if (langCount?.length > 0) {
      const langCountData = langCount?.map((item) => item.count);
      const langCountLabel = langCount?.map((item) => item.vchLanguageName);

      setLanguagesChartData({
        series: langCountData,
        options: {
          chart: {
            type: "donut",
            toolbar: {
              show: false,
            },
          },
          labels: langCountLabel,
          colors: ["#1678CF", "#003870", "#09579E", "#77C3FE", "#239DFF"],
          plotOptions: {
            pie: {
              donut: {
                size: "50%",
              },
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: 8,
            },
            dropShadow: {
              enabled: false,
            },
          },
          legend: {
            show: true,
            position: "right",
            fontSize: 10,
            offsetY: -10,
            markers: {
              shape: "square",
              offsetY: 0,
            },
            itemMargin: {
              vertical: 0,
            },
          },
        },
      });
    }

    if (cityCount?.length > 0) {
      const cityCountData = cityCount?.map((item) => item.count);
      const cityCountLabel = cityCount?.map(
        (item) =>
          item.vchLanguageName.charAt(0).toUpperCase() +
          item.vchLanguageName.slice(1).toLowerCase()
      );

      setMediaDensityChartData({
        series: [
          {
            name: "Count",
            data: cityCountData,
          },
        ],
        options: {
          chart: {
            type: "bar",
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: "50%",
              dataLabels: {
                position: "top", // Show on top of bars
              },
            },
          },
          dataLabels: {
            enabled: true,
            position: "bottom",
            offsetX: 10,
            offsetY: 0,
            formatter: function (val) {
              return val;
            },
            style: {
              fontSize: "10px",
              colors: ["#000"],
            },
            dropShadow: {
              enabled: false,
            },
          },
          yaxis: {
            tickAmount: 2,
            axisBorder: {
              show: true,
              color: "#000",
            },
          },
          xaxis: {
            type: "category",
            categories: cityCountLabel,
            labels: {
              show: true,
              rotate: 0,
              style: {
                fontSize: 8,
              },
            },
            axisBorder: {
              color: "#000",
            },
            axisTicks: {
              show: false,
            },
          },
          grid: {
            strokeDashArray: 4,
            yaxis: {
              lines: {
                show: true,
              },
            },
          },
          colors: ["#239DFFEE"],
          legend: {
            show: false,
          },
        },
      });
    }

    if (mediaType?.length > 0) {
      // const mediaId = mediaType?.map((item) => item.id);
      const media = mediaType?.map((item) => item.media);
      const mediaCount = mediaType?.map((item) => item.count);

      setMediaTypeChartData({
        series: mediaCount,
        options: {
          chart: {
            type: "donut",
            toolbar: {
              show: false,
            },
          },
          labels: media,
          colors: ["#1678CF", "#003870", "#09579E", "#77C3FE", "#239DFF"],
          plotOptions: {
            pie: {
              donut: {
                size: "50%",
              },
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: 8,
            },
            dropShadow: {
              enabled: false,
            },
          },
          legend: {
            show: true,
            position: "right",
            fontSize: 10,
            offsetY: -10,
            markers: {
              shape: "square",
              offsetY: 0,
            },
            itemMargin: {
              vertical: 0,
            },
          },
        },
      });
    }
  }, [langCount, cityCount, mediaType]);

  let selectedCities = JSON.parse(localStorage.getItem("cities"));

  return (
    <section className="bg-[#EDF5FF]">
      <div className="flex container mx-auto px-5 pt-5 items-center gap-x-1 text-sm">
        {selectedCities?.length === 1 ? "Selected City:" : "Selected Cities"}
        {selectedCities?.length > 0 &&
          selectedCities?.map((curItem, index) => {
            const city = curItem?.vchCity || "";
            const formattedCity =
              city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
            const isLast = index === selectedCities.length - 1;
            return (
              <div key={index} className="text-sm text-gray-700">
                {formattedCity}
                {!isLast && ","}
              </div>
            );
          })}
      </div>

      <div className="container mx-auto py-5 px-5">
        {isLoading ? (
          <div className="w-full text-center py-10">
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Stats Cards */}
            <section className="flex flex-col gap-2 col-span-1 justify-between">
              {stats.map((stat) => (
                <article
                  key={stat.id}
                  className="flex gap-2 items-center justify-between bg-white border border-black/20 rounded-md p-2"
                >
                  <div>
                    <span className="font-semibold">{stat.value}</span>
                    <h3 className="text-sm">{stat.title}</h3>
                  </div>
                  <img
                    src={stat.imageSrc}
                    alt={stat.title}
                    width={40}
                    height={40}
                  />
                </article>
              ))}
            </section>

            {/* Languages Chart */}
            <section className="bg-white border border-black/20 rounded-md p-2 col-span-1">
              <h3 className="font-semibold mb-2">Languages</h3>
              <ReactApexChart
                type="donut"
                height={170}
                series={languagesChartData.series}
                options={languagesChartData.options}
              />
            </section>

            {/* Media Density Chart */}
            <section className="bg-white border border-black/20 rounded-md p-2 col-span-1">
              <h3 className="font-semibold mb-2">Media Density</h3>
              <ReactApexChart
                type="bar"
                height={160}
                series={mediaDensityChartData.series}
                options={mediaDensityChartData.options}
              />
            </section>

            {/* Media Type Chart */}
            <section className="bg-white border border-black/20 rounded-md p-2 col-span-1">
              <h3 className="font-semibold mb-2">Media Type</h3>
              <ReactApexChart
                type="donut"
                height={170}
                series={mediaTypeChartData.series}
                options={mediaTypeChartData.options}
              />
            </section>
          </div>
        )}
      </div>
    </section>
  );
};

export default GraphStats;
