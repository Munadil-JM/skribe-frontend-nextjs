import { useEffect, useState } from "react";
// import { Card } from "@chakra-ui/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HEADERAPI } from "../../constants";
import userService from "../../Services/user.service";
import campaign from "../assets/Campaign Created icon.svg";
import Jsearch from "../assets/Journalist Search.svg";
import TimeSpent from "../assets/Time spent Icon.svg";

const formatIndianNumber = (num) => {
  const str = num?.toString();

  const [integerPart, decimalPart] = str.split(".");

  if (integerPart.length < 4) return str;
  const lastThreeDigits = integerPart.slice(-3);
  const otherDigits = integerPart.slice(0, -3);

  const formattedOtherDigits = otherDigits.replace(
    /\B(?=(\d{2})+(?!\d))/g,
    ","
  );

  const formattedIntegerPart = `${formattedOtherDigits},${lastThreeDigits}`;
  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
};

const Header = () => {
  const [data, setData] = useState({
    jourSerCount: 0,
    camCount: 0,
    totalLoginTime: {
      hours: 0,
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.get(HEADERAPI);
        if (response?.response?.status === "Ok") {
          setData(response?.data || {});
        } else {
          console.error("API response status is not Ok:", response?.status);
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
    <div className="flex flex-col w-full gap-4 mt-2 mb-4 sm:flex-row">
      <div
        variant={"outline"}
        className="w-full px-5 py-4 bg-[#FFEAE4] rounded-2xl"
        // sx={{ borderRadius: "15px", borderColor: "rgba(250, 90, 125, 0.2)" }}
      >
        <div className="flex flex-col items-baseline gap-1">
          {loading ? (
            <Skeleton className="w-full" height={50} />
          ) : (
            <p className="text-[35px] text-black font-[500] ">
              {formatIndianNumber(data?.jourSerCount)}
            </p>
          )}
        </div>
        <div className="flex items-center flex-1 gap-2 text-[16px] text-zinc-500">
          <img width={20} height={20} src={Jsearch.src} alt="" />
          <p className="text-[13px]">Journalist Search</p>
        </div>
      </div>
      <div
        variant={"outline"}
        className="w-full px-5 py-4 bg-[#FFE2F2]  rounded-2xl"
        // sx={{ borderRadius: "15px", borderColor: "rgba(255, 148, 122, 0.2)" }}
      >
        <div className="flex flex-col items-baseline gap-1">
          {loading ? (
            <Skeleton className="w-full" height={50} />
          ) : (
            <p className="text-[35px] text-black font-[500] ">
              {formatIndianNumber(data?.camCount)}
            </p>
          )}
        </div>
        <div className="flex items-center flex-1 gap-2 text-[16px] text-zinc-500">
          <img width={20} height={20} src={campaign.src} alt="" />
          <p className="text-[13px]">Campaigns Created</p>
        </div>
      </div>
      <div
        variant={"outline"}
        className="w-full px-5 py-4 bg-[#F2E6FF] rounded-2xl"
        // sx={{ borderRadius: "15px", borderColor: "rgba(250, 90, 125, 0.2)" }}
      >
        <div className="flex flex-col gap-1">
          {loading ? (
            <Skeleton height={10} className="w-full" />
          ) : (
            <p className="text-[35px] text-black font-[500] ">
              {formatIndianNumber(data?.totalLoginTime?.hours)}
            </p>
          )}
        </div>
        <div className="flex items-end flex-1 gap-2 text-[16px] text-zinc-500">
          <img width={20} height={20} src={TimeSpent.src} alt="" />
          <p className="text-[13px] overflow-hidden overflow-ellipsis whitespace-normal line-clamp-1">
            Time Spent on Product (in hours)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
