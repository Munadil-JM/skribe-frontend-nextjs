import { useEffect, useState } from "react";
import Chart from "react-google-charts";

export const options = {
  title: "",
  width: "100%",
  height: "330px",
  bar: { groupWidth: "100%" },
  legend: {
    position: "bottom", // Set the legend position to bottom
    alignment: "center", // Optionally, center the legend items
    textStyle: {
      fontName: "Poppins", // Set the font for the legend
    },
    // Add custom spacing between legend items
    maxLines: 0.5, // Limit the number of lines (optional, if you want to limit the number of items in one line)
    itemSpacing: 3, // Adjust the spacing between legend items (in pixels)
  },
  chartArea: {
    backgroundColor: "#ffcccc", // Set the plot area background color here
    fontName: "Poppins", // Set the font for chart area
  },
  hAxis: {
    textStyle: {
      fontName: "Poppins", // Set font for horizontal axis
    },
  },
  vAxis: {
    textStyle: {
      fontName: "Poppins", // Set font for vertical axis
    },
  },
  tooltip: {
    textStyle: {
      fontName: "Poppins", // Set font for tooltips
    },
  },
  // Simulate gradient colors by using different shades of the same colors
  colors: [
    "#C792FF", // Light purple
    "#6521AD", // Dark purple
    "#8A42D6", // Medium purple
  ],
};

const PieChart = ({ sentData = [], type, heading }) => {
  const [graphD, setGraphD] = useState([]);

  useEffect(() => {
    const langGraph = [
      ["Category", "Value"], // Header row for PieChart
      ...Object.entries(sentData).map(([value, id]) => [
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
        id,
      ]),
    ];

    setGraphD(langGraph);
  }, [sentData]);

  if (sentData?.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="p-2">
      <Chart
        chartType={type}
        width="100%"
        height="250px"
        data={graphD}
        options={
          type === "BarChart"
            ? options
            : {
                ...options,
                // No 3D effect here, only the color customization for PieChart
                is3D: false, // Removed 3D effect
              }
        }
      />
    </div>
  );
};

export default PieChart;
