import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import noUser from "../assets/noUser.png";
import "./TrendingJournalist.css";
import { baseURL, TRENDINGJOURNALISTS } from "../../constants";
import userService from "../../Services/user.service";

const TrendingJournalists = () => {
  const [journalists, setJournalists] = useState([]);
  const [loading, setLoading] = useState(true);

  const capitalizeFirstLetter = (str) => {
    if (!str) return "N/A";
    const lowercased = str.toLowerCase();
    return lowercased.charAt(0).toUpperCase() + lowercased.slice(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.get(TRENDINGJOURNALISTS);
        if (response?.response?.status === "Ok") {
          setJournalists(response?.data || []);
        } else {
          console.error("Failed to fetch data:", response?.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="p-4 border-2 border-black/10 rounded-[10px] mb-5 bg-white relative">
        <span className="absolute px-4 text-sm bg-custom-gradient -top-3 left-1 text-[#333] font-[500]">
          Trending Journalists
        </span>
        <div className="flex overflow-x-auto scrollbar scroll-mt-4">
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
                <div
                  className="flex flex-col items-center flex-shrink-0 text-center"
                  key={index}
                >
                  <Skeleton circle width={40} height={40} />
                  <div className="mt-2 text-sm">
                    <Skeleton width={100} />
                    <Skeleton width={80} />
                    <Skeleton width={60} />
                  </div>
                </div>
              ))
            : journalists?.map((journalist) => (
                <div
                  className="relative flex flex-col items-center flex-shrink-0 mx-1 my-6 text-center cursor-pointer"
                  key={journalist?.intJournalistId}
                >
                  <a
                    target="_blank"
                    href={`/journalist-profile/${journalist?.intJournalistId}`}
                    rel="noreferrer"
                    className="flex flex-col items-center w-full no-underline"
                  >
                    <div>
                      <img
                        className="items-center w-10 h-10 rounded-full"
                        src={
                          journalist?.vchPhotoPath
                            ? journalist.vchPhotoPath !== ""
                              ? baseURL + journalist?.vchPhotoPath
                              : noUser.src
                            : noUser.src
                        }
                        alt=""
                      />
                    </div>
                    <div className="mt-2 text-sm">
                      <h2 className="text-md text-gray-800 w-[150px] truncate">
                        {journalist?.vchJournalistName}
                      </h2>
                      <p className="text-xs text-gray-400 w-[150px] truncate">
                        {journalist?.outlets
                          ?.map((outlet) => outlet?.outletName)
                          .join(", ") || "N/A"}
                      </p>
                      <p className="text-xs text-gray-600">
                        {capitalizeFirstLetter(journalist?.city)}
                      </p>
                    </div>
                  </a>
                  {journalist?.intShutShop === 64 && (
                    <div className=" z-[8]   bg-red-600  px-1 text-xs text-white">
                      Left Journalism
                    </div>
                  )}

                  {journalist?.intShutShop === 65 && (
                    <div className="z-[8] bg-green-500 px-1 text-xs text-white">
                      In transition
                    </div>
                  )}

                  {journalist?.intShutShop === 66 && (
                    <div className="z-[8] bg-orange-500 px-1 text-xs text-white">
                      Moved Abroad
                    </div>
                  )}

                  {journalist?.intShutShop === 67 && (
                    <div className="z-[8] bg-red-600 px-1 text-xs text-white">
                      RIP
                    </div>
                  )}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingJournalists;
