// import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
// import userService from "../../Services/user.service";
// import { JOURNALISTBRAND } from "../../constants";

const ColumnChart = ({ chartData, series }) => {
  // const [chartData, setChartData] = useState([]);
  // const [series, setSeries] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await userService.get(`${JOURNALISTBRAND}?Jid=${id}`);
  //       if (response.response.status === "Ok") {
  //         const data = response.data;
  //         const formattedData = Object.keys(data).map((key) => ({
  //           x: key.charAt(0).toUpperCase() + key.slice(1),
  //           y: data[key],
  //         }));
  //         console.log(formattedData, "check formatted data heres");
  //         setChartData(formattedData);
  //         setSeries([
  //           { name: "Brands & Organizations", data: Object.values(data) },
  //         ]);
  //       } else {
  //         console.error("Failed to fetch data:", response.message);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  const options = {
    chart: {
      type: "bar",
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: "Brands & Organizations",
      align: "left",
    },
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    xaxis: {
      categories: chartData?.length > 0 && chartData?.map((data) => data.x),
    },
  };

  return (
    <>
      {chartData?.length > 0 ? (
        <div className="p-4 border border-black/10 rounded-[10px] xl:w-1/2">
          {" "}
          <Chart
            options={options}
            series={series?.length > 0 && series}
            type="bar"
            height="300"
          />{" "}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ColumnChart;
