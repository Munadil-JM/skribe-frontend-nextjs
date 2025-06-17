import { Chart } from "react-google-charts";

export const options = {
  //   title: "Company Performance",
  hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "80%", height: "256px" },
};

export function AreaChart({ data }) {
  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="256px"
      data={data}
      options={options}
    />
  );
}
