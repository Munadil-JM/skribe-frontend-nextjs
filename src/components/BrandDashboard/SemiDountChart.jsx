import { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

export const ApexChart = ({ data }) => {
  // Memoize counts and label based on the data prop
  const counts = useMemo(() => data?.map((curElem) => curElem.id), [data]);
  const label = useMemo(() => data?.map((curElem) => curElem.value), [data]);

  // Memoize options so they update only when the label changes
  const options = useMemo(
    () => ({
      chart: {
        type: "donut",
      },
      labels: label, // label from the state
      colors: ["#85B502", "#E53738", "#FFE32B"], // Custom colors
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10,
        },
      },
      grid: {
        padding: {
          bottom: -80,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    }),
    [label] // Recalculate only when label changes
  );

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={counts}
          type="donut"
          height={"500px"}
        />
      </div>
    </div>
  );
};
