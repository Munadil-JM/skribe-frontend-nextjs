import { baseURL } from "../../constants";
import noUser from "../assets/noUser.png";
import Link from "next/link";

const SearchRecord = ({ data, isSelected, disabled, onCheckboxChange }) => {
  return (
    <div className="relative flex w-1/2 flex-shrink flex-grow flex-col overflow-hidden rounded-lg border border-gray-300 p-3  py-3 pb-5 pt-9 lg:w-1/3  xl:w-1/4">
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

      <figure className="relative mb-1 flex flex-1 flex-col items-center">
        <input
          type="checkbox"
          name={data?.intJournalistId}
          id={data?.intJournalistId}
          className="peer/published absolute -top-5 right-3 h-4 w-4 accent-[#318fff]"
          value="abc"
          checked={isSelected}
          disabled={disabled}
          onChange={(e) => onCheckboxChange(e.target, data.intJournalistId)}
          //   onClick={(e) => getDeleteRecords(e)}
        />

        <Link
          href={`/journalist-profile/${data.intJournalistId}`}
          target="_blank"
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
            className="h-28 w-28 rounded-full object-cover"
          />
        </Link>
        <figcaption className="text-md flex flex-col items-center pt-8 leading-6 text-gray-900">
          <div className="text-sm line-clamp-2 max-h-10 overflow-hidden text-center font-medium text-[#002b5b]">
            <Link
              href={`/journalist-profile/${data.intJournalistId}`}
              target="_blank"
            >
              {" "}
              {data?.vchJournalistName}{" "}
            </Link>
          </div>
          <span className="pt-2 text-center text-xs font-medium leading-none text-gray-600">
            {data?.vchOutletName}
          </span>
          <div className="mt-1">
            <div className="left text-center text-xs leading-none text-gray-500">
              {data?.vchBeat}
            </div>
          </div>
        </figcaption>
      </figure>
      <div className="flex items-center justify-center gap-x-1 text-gray-600">
        {/* <span className="material-icons-outlined text-gray-400">
          location_on
        </span> */}
        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-6">
          {/* {data?.city?.city.slice(0, 1)?.toUpperCase()} */}
          {data?.vchCity == "" && "N/A"}
          {data?.vchCity == null && "N/A"}
          {data?.vchCity?.slice(0, 1).toUpperCase()}
          {data?.vchCity?.slice(1).toLowerCase()}
          {/* {`, ${data?.country?.country && data?.country?.country}`} */}
        </div>
      </div>
      {data?.crmStatus && (
        <div className="absolute left-0 top-3 px-2 py-1 text-center text-xs  font-medium text-[#318fff]">
          Added to CRM
        </div>
      )}
    </div>
  );
};

export default SearchRecord;
