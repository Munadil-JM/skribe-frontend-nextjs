"use client";

import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const SentimentScore = ({ data = [], type, heading }) => {
  const [graphId, setGraphId] = useState([]);
  const [graphValue, setGraphValue] = useState([]);

  // Update the graphId and graphValue based on the data
  useEffect(() => {
    const id = data?.map((curItem) => curItem?.id);
    const value = data?.map(
      (curItem) =>
        curItem?.value?.charAt(0).toUpperCase() +
        curItem?.value?.slice(1).toLowerCase()
    );
    if (id?.length > 0) setGraphId(id);
    if (value?.length > 0) setGraphValue(value);
  }, [data]);

  const options = {
    series: graphId,
    chart: {
      height: 390,
      type: type,
      fontFamily: "'Poppins', 'Helvetica', 'sans-serif'", // Ensure Poppins is applied here
      foreColor: "#333", // Apply a base color to text (dark color for better visibility)
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
        barLabels: {
          enabled: true,
          useSeriesColors: true,
          offsetX: -8,
          fontSize: "12px", // Set the font size for bar labels
          fontWeight: "500",
          formatter: function (seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
          },
        },
      },
    },
    colors: ["#85b502", "#e6cc23", "#e53738"],
    labels: graphValue,
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return (
    <div
      id="chart"
      style={{
        fontFamily: "'Poppins', 'Helvetica', 'sans-serif'", // Apply font family here
        fontSize: "12px", // Apply font size for the entire chart container
        fontWeight: "500",
        width: "90%",
      }}
    >
      <ApexCharts
        options={options}
        series={options.series}
        type={type}
        width="100%"
      />
    </div>
  );
};

export default SentimentScore;
