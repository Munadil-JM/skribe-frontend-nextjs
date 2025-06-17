import { baseURL } from "../../../constants";
import noUser from "../../assets/noUser.png";
import Link from "next/link";

const ByShowRecord = ({ data, outletId }) => {
  const convertTo12Hour = (time) => {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert hour to 12-hour format

    return `${hours}:${minutes} ${period}`;
  };

  return (
    <div className="relative flex w-1/4 flex-shrink flex-grow flex-col overflow-hidden rounded-lg border border-gray-300 p-3  py-3 pb-5 pt-9 lg:w-1/4  xl:w-1/4">
      {data?.intShutShop === 64 && (
        <div className="absolute -left-8 top-7 z-[8] -rotate-45  bg-red-600 px-6 py-1 text-xs uppercase text-white">
          Left Journalism
        </div>
      )}

      {data?.intShutShop === 65 && (
        <div className="absolute -left-8 top-6 z-[8] -rotate-45  bg-green-500 px-6 py-1 text-xs uppercase text-white">
          In transition
        </div>
      )}

      {data?.intShutShop === 66 && (
        <div className="absolute -left-8 top-6 z-[8] -rotate-45  bg-orange-500  px-6 py-1 text-xs uppercase text-white">
          Moved Abroad
        </div>
      )}

      {data?.intShutShop === 67 && (
        <div className="absolute -left-8 top-6 z-[8] -rotate-45  bg-red-600 p-2 px-6 py-1 text-xs uppercase text-white">
          RIP
        </div>
      )}

      <figure className="relative flex flex-1 flex-col items-center">
        <Link
          href={`/journoByShow/${data?.intShowId}/${data?.vchOutletName}/${data?.vchProgramName}/${outletId}`}
          ///${data?.vchOutletName}/${data?.vchProgramName}/${outletId}
        >
          <img
            src={
              data?.vchPhotoPath
                ? data.vchPhotoPath !== ""
                  ? baseURL + data?.vchPhotoPath
                  : noUser.src
                : noUser.src
            }
            alt=""
            className="h-28 w-28 rounded-full object-contain"
          />
        </Link>
        <figcaption className="text-md flex flex-col items-center pt-8 leading-4 text-gray-900">
          <div className="text-md line-clamp-2 max-h-10 overflow-hidden text-center font-medium leading-5 text-[#6521AD]">
            <Link
              href={`/journoByShow/${data?.intShowId}/${data?.vchOutletName}/${data?.vchProgramName}/${outletId}`}
            >
              {/*  */}
              {data?.vchProgramName}{" "}
            </Link>
          </div>
          <div className="line-clamp-2 max-h-10 overflow-hidden text-center text-sm font-semibold text-gray-400">
            {data?.vchProgramDay !== "NULL"
              ? data?.vchProgramDay
              : "Program Day: N/A"}
          </div>
          <span className="pt-2 text-center text-sm font-medium text-gray-600">
            {!!data?.startTime
              ? `Start Time ${convertTo12Hour(data?.startTime)}`
              : "Start Time: N/A"}
          </span>
          <span className="text-center text-sm font-medium text-gray-600">
            {!!data?.endTime
              ? `End Time ${convertTo12Hour(data?.endTime)}`
              : "End Time: N/A"}
          </span>
          <div className="left mt-1 text-center text-sm leading-none  text-gray-500">
            {!!data?.vchBeat ? data?.vchBeat : "Beat: N/A"}
          </div>
        </figcaption>
      </figure>
      <div className="flex items-center justify-center gap-x-1 leading-none text-gray-600">
        {/* <span className="material-icons-outlined text-gray-400">
          location_on
        </span> */}
        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-6">
          {!!data?.vchCity ? data?.vchCity : "City: N/A"}
        </div>
      </div>
      {data.crmStatus && (
        <div className="absolute left-0 top-3 px-2 py-1 text-center text-xs  font-medium text-[#6521AD]">
          Added to CRM
        </div>
      )}
    </div>
  );
};

export default ByShowRecord;
