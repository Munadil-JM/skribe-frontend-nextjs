import { useEffect, useState } from "react";
import PieChart from "./PieChart";
// import { ApexChart, SemiDountChart } from "./SemiDountChart";
import userService from "../../Services/user.service";
import {
  SHAREVOICE,
  BRANDSENTIMENT,
  BRANDLANGUAGE,
  CITYWISECOUNT,
} from "../../constants";
import ShareOfVoice from "./ShareOfVoice";
import LanguageChart from "./LanguageChart";
import SentimentScore from "./SentimentScore";

const data1 = BRANDSENTIMENT;
const data2 = SHAREVOICE;
const data3 = BRANDLANGUAGE;
const data4 = CITYWISECOUNT;

const ChartStats = ({ startDate, endDate, render }) => {
  const [loader, setLoader] = useState(false);
  const [languageCount, setLanguageCount] = useState([]);
  const [sentimentCount, setSentimentsCount] = useState([]);
  const [sentimentRatio, setSentimentRatio] = useState("");
  const [shareOfVoice, setShareOfVoice] = useState([]);
  const [cityCount, setCityCount] = useState([]);

  const graphAPI = async () => {
    setLoader(true);
    try {
      const url1 = `${data1}?StartDate=${startDate}&EndDate=${endDate}`;
      const url2 = `${data2}?StartDate=${startDate}&EndDate=${endDate}`;
      const url3 = `${data3}?StartDate=${startDate}&EndDate=${endDate}`;
      const url4 = `${data4}?StartDate=${startDate}&EndDate=${endDate}`;
      const [response1, response2, response3, response4] = await Promise.all([
        userService.post(url1),
        userService.post(url2),
        userService.post(url3),
        userService.post(url4),
      ]);

      if (response1?.response?.status === "Ok") {
        setSentimentsCount(
          response1?.result?.aggregations?.distinct_websites?.buckets || []
        );
        setSentimentRatio(response1?.sentimentRatio || "N/A");
      }

      if (response2?.response?.status === "Ok") {
        setShareOfVoice(response2?.results || []);
      }

      if (response3?.response?.status === "Ok") {
        setLanguageCount(
          response3?.result?.aggregations?.distinct_websites?.buckets || []
        );
      }

      if (response4?.response?.status === "Ok") {
        setCityCount(
          response4?.result?.aggregations?.distinct_websites?.buckets || []
        );
      }
    } catch (error) {
      console.log(error, "check error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    graphAPI();
  }, [startDate, endDate, render]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      <fieldset className="border border-gray-300 rounded-md relative">
        <legend className="px-2 text-sm text-black/40">
          Media-wise coverage
        </legend>
        {cityCount?.length > 0 ? (
          <PieChart data={cityCount} type="PieChart" heading="City" />
        ) : (
          <div className="text-gray-400 text-xs p-2">No data available</div>
        )}
      </fieldset>

      <fieldset className="border border-gray-300 rounded-md">
        <legend className="px-2 text-sm text-black/40">
          Language-wise coverage
        </legend>
        {languageCount?.length > 0 ? (
          <LanguageChart
            data={languageCount}
            type="PieChart"
            heading="Language"
          />
        ) : (
          <div className="text-gray-400 text-xs p-2">No data available</div>
        )}
      </fieldset>

      <fieldset className="border border-gray-300 rounded-md">
        <legend className="px-2 text-sm text-black/40">Share of voice</legend>
        {shareOfVoice?.length > 0 ? (
          <ShareOfVoice data={shareOfVoice} type="donut" />
        ) : (
          <div className="text-gray-400 text-xs p-2">No data available</div>
        )}
      </fieldset>

      <fieldset className="border border-gray-300 rounded-md">
        <legend className="px-2 text-sm text-black/40">Sentiment Score</legend>
        <div className="relative">
          {sentimentCount?.length > 0 ? (
            <SentimentScore
              data={sentimentCount}
              type="radialBar"
              heading="Sentiment Score"
            />
          ) : (
            <div className="text-gray-400 text-xs p-2">No data available</div>
          )}
          <div className="absolute right-4 top-1 text-xs text-black/40 pr-2">
            {sentimentCount?.length > 0 && `${sentimentRatio} Avg score`}
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default ChartStats;
