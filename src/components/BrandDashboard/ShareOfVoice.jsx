"use client";

import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const ShareOfVoice = ({ data = [], type = "donut", heading }) => {
  // Initial chart options
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const options = {
    chart: {
      width: 380,
      type: type, // Dynamically set chart type (donut by default)
      fontFamily: "'Poppins', sans-serif", // Ensure Poppins is applied to the chart
    },
    dataLabels: {
      enabled: false, // Disable default data labels
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: "bottom",
      offsetY: 0,
      height: "100%",
      fontFamily: "'Poppins', sans-serif", // Apply Poppins to legend
      color: "#99a6c4", // Updated font color
      fontSize: "11px", // Set font size for legend
      itemMargin: {
        vertical: 0, // Reduce vertical spacing between legend items
      },
      labels: {
        style: {
          lineHeight: "1", // Reduce line height of the legend labels
        },
        formatter: (seriesName, opts) => {
          const percentage = (
            (opts.w.globals.series[opts.seriesIndex] / totalCount) *
            100
          ).toFixed(1); // Calculate percentage
          return `${seriesName} - ${percentage}%`; // Return label with percentage
        },
      },
    },
    xaxis: {
      categories: labels, // Ensure labels appear on the x-axis
      title: {
        text: "Categories", // You can add a title for the x-axis
        style: {
          fontFamily: "'Poppins', sans-serif", // Apply Poppins to xaxis title
          fontSize: "11px", // Set font size for xaxis title
        },
      },
      fontFamily: "'Poppins', sans-serif", // Apply Poppins to xaxis
      color: "#99a6c4", // Updated font color
      labels: {
        style: {
          fontFamily: "'Poppins', sans-serif", // Apply Poppins to xaxis labels
          fontSize: "11px", // Set font size for x-axis labels
          lineHeight: "1", // Reduce line height of the x-axis labels
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    fontFamily: "'Poppins', sans-serif", // Apply Poppins to the entire chart
    color: "#99a6c4", // Updated font color for general chart styling
  };

  // Use effect to process incoming data
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const chartSeries = data.map((item) => item.count); // Use item.count (numeric data) for series
      const chartLabels = data.map((item) => item.name); // Use item.name for labels
      const total = chartSeries.reduce((acc, item) => acc + item, 0); // Calculate the total count

      setSeries(chartSeries);
      setLabels(chartLabels);
      setTotalCount(total); // Store the total count for percentage calculations
    }
  }, [data]);

  // Update labels to include the percentage next to the name
  const updatedLabels = labels.map((label, index) => {
    const percentage = ((series[index] / totalCount) * 100).toFixed(1); // Calculate percentage for each label
    return `${label} - ${percentage}%`; // Return the label with percentage
  });

  if (data[0]?.count === 0) {
    return <div className="text-gray-400 text-xs p-2">No data available</div>;
  }

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Ensure Poppins applied globally */}
      {heading && (
        <h2
          style={{
            fontFamily: "'Poppins', sans-serif", // Ensure Poppins is applied to heading
            color: "#99a6c4",
            fontSize: "11px", // Set font size for heading
            lineHeight: "1", // Reduce line height of the heading
          }}
        >
          {heading}
        </h2>
      )}
      <div style={{ width: "90%", margin: 0, padding: 0 }} id="chart">
        <ApexCharts
          options={{
            ...options,
            labels: type === "donut" ? updatedLabels : undefined, // Use updated labels with percentage
          }}
          series={series}
          type={type}
          width="100%"
        />
      </div>
    </div>
  );
};

export default ShareOfVoice;
