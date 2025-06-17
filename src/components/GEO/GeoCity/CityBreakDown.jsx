import { useEffect, useState } from "react";
import Chart from "react-google-charts";

export const options = {
  title: "",
  width: "100%",
  height: 300,
  bar: { groupWidth: "95%" },
  legend: { position: "none" },
};

const CityBreakDown = ({ data, type, heading }) => {
  const [graphD, setGraphD] = useState([]);
  useEffect(() => {
    let langGraph = data?.map((curItem) => [
      curItem?.vchLanguageName,
      curItem?.count,
    ]);
    let arrayToAdd = ["Language", "Count"];
    if (langGraph) {
      langGraph.unshift(arrayToAdd);
    }
    setGraphD(langGraph);
  }, [data]);

  return (
    <>
      {/* [CHART FOR LANGUAGE AND MEDIA DENSITY BREAKDOWN START] */}
      <fieldset className="relative w-12/12 md:w-12/12 lg:w-4/12 xl:w-4/12 border border-gray-200 bg-gray-50 rounded-md p-6">
        <span className="absolute left-3 -top-3 px-3 bg-white">{heading}</span>

        <Chart
          chartType={type}
          width="100%"
          height="300px"
          data={graphD}
          options={type === "BarChart" ? options : ""}
        />
      </fieldset>
      {/* [/CHART FOR LANGUAGE AND MEDIA DENSITY BREAKDOWN END] */}
    </>
  );
};

export default CityBreakDown;
