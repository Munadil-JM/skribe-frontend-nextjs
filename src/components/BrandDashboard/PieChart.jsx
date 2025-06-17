"use client";

import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const PieChart = ({ data = [], type, heading }) => {
  const [chartConfig, setChartConfig] = useState(null);
  const [totalMentions, setTotalMentions] = useState("");

  useEffect(() => {
    setTotalMentions(data?.reduce((sum, cur) => sum + cur.id, 0));

    if (data.length > 0) {
      const seriesData = data.map((item) => ({
        x: item.value,
        y: item.id,
      }));

      setChartConfig({
        series: [{ data: seriesData }],
        chart: {
          type: "treemap",
          toolbar: { show: false },
        },
        title: {
          text: "",
          align: "center",
          style: {
            color: "#000",
            fontFamily: "Poppins",
          },
        },
        colors: [
          "#3B93A5",
          "#F7B844",
          "#ADD8C7",
          "#EC3C65",
          "#333333",
          "#C1F666",
          "#D43F97",
          "#1E5D8C",
          "#421243",
          "#7F94B0",
          "#EF6537",
          "#C0ADDB",
        ],
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
            dataLabels: {
              enabled: true,
              style: {
                colors: ["#000"],
                fontFamily: "Poppins",
                fontSize: "12px",
              },
            },
          },
        },
        xaxis: {
          labels: {
            style: {
              colors: "#000",
              fontFamily: "Poppins",
              fontSize: "12px",
            },
            formatter: (value) => value,
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#000",
              fontFamily: "Poppins",
              fontSize: "12px",
            },
            formatter: (value) => value,
          },
        },
        legend: { show: false },
        grid: { show: false },
        tooltip: {
          style: {
            fontSize: "12px",
            color: "#000",
            fontFamily: "Poppins",
          },
        },
      });
    }
  }, [data]);

  if (!chartConfig) return <div>No data available</div>;

  return (
    <>
      <style>
        {`
          * {
            font-family: 'Poppins', sans-serif;
          }
          svg.apexcharts-svg {
            width: 100% !important;
          }
        `}
      </style>
      <span
        style={{ fontFamily: "Poppins" }}
        className="absolute right-1 top-2 text-xs text-black/40 pr-2"
      >
        Total Mentions: {totalMentions}
      </span>
      <div
        style={{
          width: "100%",
          height: "100%", // Adjust this height as needed
        }}
      >
        <ApexCharts
          options={chartConfig}
          series={chartConfig.series}
          type="treemap"
          height="100%"
          width="100%"
        />
      </div>
    </>
  );
};

export default PieChart;
