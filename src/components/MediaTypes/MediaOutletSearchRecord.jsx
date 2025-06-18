import { OUTLETPATH } from "../../constants";
import noUser from "../assets/noUser.png";
import Link from "next/link";

const MediaOutletSearchRecord = ({ data, outletId }) => {
  let encodedString = encodeURIComponent(data?.value);

  return (
    <div className="relative flex w-1/2 flex-shrink flex-grow flex-col overflow-hidden rounded-lg border border-gray-300 p-3  py-3 pb-5 pt-9 lg:w-1/3  xl:w-1/4">
      {data?.shutShop?.value === "Left journalism" && (
        <div className="absolute -left-8 top-7 -rotate-45  bg-red-600 px-6 py-1 text-xs uppercase text-white">
          Left Journalism
        </div>
      )}

      {data?.shutShop?.value === "In transition (next move unknown)" && (
        <div className="absolute -left-8 top-6 -rotate-45  bg-green-500 px-6 py-1 text-xs uppercase text-white">
          In transition
        </div>
      )}

      {data?.shutShop?.value === "Moved abroad" && (
        <div className="absolute -left-8 top-6 -rotate-45  bg-orange-500 px-6 py-1 text-xs uppercase text-white">
          Moved Abroad
        </div>
      )}

      {data?.shutShop?.value === "RIP" && (
        <div className="absolute -left-8 top-6 -rotate-45  bg-red-600 p-2 px-6 py-1 text-xs uppercase text-white">
          RIP
        </div>
      )}

      {/* <Link
        href={{
          pathname: `/journalist-by-outlet/${data.id}/${data.value}${passId}`,
          state: [{ id: passId }],
        }}
      >
        Your Page
      </Link> */}
      <figure className="relative flex flex-1 flex-col items-center">
        <Link
          href={`/journalist-by-outlet/${outletId}/${data.id}/${encodedString}`}
        >
          {/* <Link to={`/journalist-profile/${data.id}`}> */}
          <img
            src={
              !!data?.outletPhoto && data?.outletPhoto !== ""
                ? OUTLETPATH + "/" + data?.outletPhoto
                : noUser.src
            }
            alt=""
            className="h-28 w-28 rounded-full object-contain"
          />
        </Link>
        <figcaption className="text-md flex flex-col items-center pt-8 leading-4 text-gray-900">
          <div className="text-sm line-clamp-2 max-h-10 overflow-hidden text-center font-medium text-[#002b5b]">
            <Link
              href={`/journalist-by-outlet/${outletId}/${data.id}/${encodedString}`}
            >
              {" "}
              {data?.value}
            </Link>
          </div>

          <div className="pt-2 text-center text-sm text-gray-400">
            {data?.language?.length > 0
              ? data?.language?.map(
                  (curItem) => curItem?.value && curItem?.value
                )
              : "Language: N/A"}
          </div>
        </figcaption>
      </figure>
      <div className="flex items-center justify-center gap-x-1 text-gray-400">
        {/* <span className="material-icons-outlined">location_on</span> */}
        <span className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-600">
          {data?.city?.length > 0
            ? data?.city?.map((curItem) => curItem?.value && curItem?.value)
            : "N/A"}
        </span>
      </div>
    </div>
  );
};

export default MediaOutletSearchRecord;
