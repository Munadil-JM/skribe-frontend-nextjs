"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const LanguageChart = ({ data = [], type, heading }) => {
  const [mediaDensityChartData, setMediaDensityChartData] = useState({
    series: [],
    options: {},
  });

  useEffect(() => {
    if (data?.length > 0) {
      const cityCountData = data?.map((item) => item.id);
      const cityCountLabel = data?.map(
        (item) =>
          item?.value?.charAt(0).toUpperCase() +
          item?.value?.slice(1).toLowerCase()
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
            height: "100%", // You can dynamically set this if needed
          },
          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: "50%",
              dataLabels: {
                position: "top",
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
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
          xaxis: {
            type: "category",
            categories: cityCountLabel,
            labels: {
              show: true,
              rotate: 0,
              style: {
                fontSize: "10px",
              },
              minHeight: 20,
              maxHeight: 160,
              trim: false,
              offsetX: 0,
              offsetY: 0, // make sure it's not negative
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
            padding: {
              bottom: 20, // Increase to ensure bottom labels are visible
            },
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
  }, [data]);

  // If no data is available, render a message
  if (data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div id="chart">
      <ReactApexChart
        type="bar"
        height={225}
        series={mediaDensityChartData.series}
        options={mediaDensityChartData.options}
      />
    </div>
  );
};

export default LanguageChart;
