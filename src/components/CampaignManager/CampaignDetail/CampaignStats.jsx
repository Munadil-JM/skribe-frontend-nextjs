// import SentimentChart from "./SentimentChart";
import Link from "next/link";

const CampaignStats = ({ data, graphData }) => {
  const createdDate = (date) => {
    const dateObj = new Date(date);
    const dates = dateObj.getDate();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${dates}/${month}/${year}`;
  };
  return (
    <>
      <div className="w-full flex gap-3 mb-3">
        <div className="w-9/12 bg-gray-100 rounded-lg p-6">
          <div className="flex justify-between">
            <div className="flex flex-col ">
              <h2 className="text-2xl font-medium text-gray-700">
                {data?.campaign?.vchCampaignName}
              </h2>
              <div className="flex">
                <span className="text-gray-500 pr-1 text-xs">Created by</span>
                <span className="text-gray-800 pr-2 font-medium text-xs">
                  {data?.campaign?.createdBy}
                </span>{" "}
                <span className="font-medium text-xs text-gray-500">
                  {/* {createdDate(data?.campaignCreatedDate)} */}
                  {createdDate(data?.campaign?.dtCampsentdate)}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-500 pt-2 text-sm">
            {data?.campaign?.vchCampaignDesc}
          </p>
          <p className="text-purple-700 pt-2 text-xs font-medium">
            <Link href={`/list-tracking/${data?.campaign?.bgintcampid}`}>
              Track List
            </Link>
          </p>
        </div>
        <div className="w-3/12">
          <ul className="flex flex-col gap-y-3 h-full">
            <li className="bg-gray-100 p-3 text-center flex rounded-lg flex-auto items-center justify-between">
              <span className="text-sm text-left text-wrap text-gray-500">
                Open Rate
              </span>
              <span className="font-semibold text-lg text-purple-700">
                {!!data?.openRate ? data?.openRate + "%" : "0"}
              </span>
            </li>

            <li className="bg-gray-100 p-3 text-center flex rounded-lg flex-auto items-center justify-between">
              <span className="text-sm text-left text-wrap text-gray-500">
                Journalist Targeted
              </span>
              <span className="font-semibold text-lg text-purple-700">
                {!!data?.targatedJournCount ? data?.targatedJournCount : 0}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full flex-col flex gap-3 lg:flex-row ">
        <div className="w-full lg:w-3/12 xl:w-3/12 pb-2 xl:pb-0 bg-gray-100 rounded-lg p-2 pt-6">
          <ul className="flex gap-y-2 flex-col">
            <li className="flex justify-between bg-white w-full p-3 rounded-md">
              <span className="text-sm text-gray-600">Online mentions</span>
              <span className="text-purple-700 text-md font-semibold">
                {" "}
                {graphData?.totalArticleCount ?? 0}
              </span>
            </li>
            <li className="flex justify-between bg-white w-full p-3 rounded-md">
              <span className="text-sm text-gray-600">Online Publish Rate</span>
              <span className="text-purple-700 text-md font-semibold">
                {!!graphData?.publishRate ? graphData?.publishRate + "%" : 0}
              </span>
            </li>
            <li className="flex justify-between bg-white w-full p-3 rounded-md">
              <span className="text-sm text-gray-600">
                Potential Offline Coverage
              </span>
              <span className="text-purple-700 text-md font-medium flex items-center gap-x-2 self-start">
                <span className="material-icons-outlined icon-30">
                  trending_up
                </span>
                <span className="text-left font-bold text-xl lg:text-lg">
                  {graphData?.potentialCoverage ?? 0}
                </span>
              </span>
            </li>
          </ul>
        </div>
        {/* {!!graphData && Object.keys(graphData).length > 0 && (
          <div className="w-full lg:w-4/12 xl:w-4/12 pb-2 xl:pb-0 bg-gray-100 rounded-lg">
            <SentimentChart
              sentData={graphData?.sentiments}
              type="PieChart"
              heading="City"
            />

            <h2 className="text-gray-500 font-normal text-center text-balance text-xl leading-6 lg:leading-7">
              {" "}
              Sentiment of coverage <br />
              since campaign
            </h2>
          </div>
        )} */}
        <div
          className={`${
            !!graphData && Object.keys(graphData).length > 0
              ? "lg:w-9/12 xl:w-9/12 lg:p-2 xl:p-4"
              : "w-full"
          } bg-gray-100 rounded-lg p-2`}
        >
          <table
            cellPadding="5"
            cellSpacing=""
            width="100%"
            className="border-separate border-spacing-y-2 lg:border-spacing-y-2"
          >
            <thead>
              <tr className="bg-white">
                <th>&nbsp;</th>
                {data?.uniqueOpenData?.map((curItem, index) => {
                  return (
                    <th
                      key={index}
                      className="text-md text-gray-500 font-medium"
                    >
                      {!!curItem?.days ? curItem?.days + " days" : 0}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="text-sm text-gray-500 font-medium">Open</td>
                {data?.uniqueOpenData?.map((curItem, index) => {
                  return (
                    <td
                      key={index}
                      className="text-center  font-bold text-xl text-purple-700"
                    >
                      {curItem?.uniqueOpens || 0}
                    </td>
                  );
                })}
              </tr>
              <tr className="bg-white">
                <td className="text-sm text-gray-500 font-medium">Open Rate</td>
                {data?.uniqueOpenData?.map((curItem, index) => {
                  return (
                    <td
                      key={index}
                      className="text-center  font-bold text-xl text-purple-700"
                    >
                      {!!curItem?.percentage
                        ? curItem?.percentage + "%"
                        : 0 + "%"}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <ul className="flex gap-x-4">
            {/* <li className="flex flex-col flex-grow bg-white text-center p-3  gap-y-3 rounded-lg">
              <div className=" text-purple-800  flex justify-between space-x-2">
                <div className="text-left text-xs text-gray-500 leading-4">
                  Potential Offline
                  <br /> Coverage
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="material-icons-outlined icon-30">
                    trending_up
                  </span>
                  <span className="text-left font-bold text-2xl">
                    {graphData?.potentialCoverage || 0}
                  </span>
                </div>
              </div>
            </li> */}

            <li className="flex flex-col flex-grow bg-white text-center p-1 px-3 gap-y-3 rounded-lg">
              <div className="text-purple-800  flex items-center justify-between space-x-2">
                <div className="text-left text-xs text-gray-500 leading-4">
                  Journalists that have
                  <br /> covered you since
                </div>
                <div className="font-bold text-2xl">
                  {graphData?.jourCount || 0}
                </div>
              </div>
            </li>

            <li className="flex flex-col flex-grow bg-white text-center  p-1 px-3  gap-y-3 rounded-lg">
              <div className=" text-purple-800  flex  items-center  justify-between space-x-2">
                <div className="text-left text-xs text-gray-500 leading-4">
                  Outlets that have
                  <br /> covered you since
                </div>
                <div className="font-bold text-2xl">
                  {" "}
                  {graphData?.outletCount || 0}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex gap-x-4 bg-gray-100 mt-3 p-3 rounded-lg">
        <ul className="flex gap-x-6 w-full">
          <li className="flex w-1/2 bg-white text-center p-3 gap-y-6 rounded-lg">
            <div className=" text-purple-800 flex flex-1 justify-between items-center space-x-2">
              <div className="text-balance text-left text-sm text-gray-700 leading-5">
                Opened the Email
              </div>
              <span className="text-center font-bold">
                <span className="text-2xl">
                  {data?.totalOpen ? (
                    <>
                      <Link
                        href={`/campaign-list/${data?.campaign?.intCampListId}`}
                      >
                        {!!data?.totalOpen ? data?.totalOpen : 0}

                        <span className="text-gray-800 text-2xl">
                          {" "}
                          Journalists
                        </span>
                      </Link>
                    </>
                  ) : (
                    <>
                      0{" "}
                      <span className="text-gray-800 text-2xl">
                        {" "}
                        Journalists
                      </span>
                    </>
                  )}
                </span>
              </span>
            </div>
          </li>
          <li className="flex w-1/2 bg-white text-center p-3 gap-y-6 rounded-lg">
            <div className=" text-purple-800 flex flex-1 justify-between items-center space-x-2">
              <div className="text-balance text-left text-sm text-gray-700 leading-5">
                Not opened the Email yet
              </div>
              <span className="text-center font-bold">
                <span className="text-2xl">
                  {data?.totalUniqueNotOpen ? data?.totalUniqueNotOpen : 0}
                </span>
                <span className="text-gray-800 text-2xl"> Journalists</span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CampaignStats;
