"use client";

import { baseURL, SUPPTIMAGE } from "../../../constants";
import noUser from "../../assets/noUser.png";
import Link from "next/link";
import { useParams } from "next/navigation";

const SupplementRecord = ({ data }) => {
  const params = useParams();
  const [outletId, id, name] = params.slug;

  return (
    <div className="relative flex w-1/2 flex-shrink flex-grow flex-col overflow-hidden rounded-lg border border-gray-300 p-3  py-3 pb-5 pt-9 lg:w-1/3  xl:w-1/4">
      <figure className="relative flex flex-1 flex-col items-center">
        <Link
          href={`/SupplementsJourno/${data?.intSupplementId}/${outletId}/${id}/${name}/${data?.vchSupplementName}`}
        >
          <img
            src={
              data?.photo
                ? data.photo !== ""
                  ? SUPPTIMAGE + data?.photo
                  : noUser.src
                : noUser.src
            }
            alt=""
            className="h-28 w-28 rounded-full object-contain"
          />
        </Link>
        <figcaption className="text-md flex flex-col items-center pt-8 leading-6 text-gray-900">
          <div className="text-sm line-clamp-2 max-h-10 overflow-hidden text-center font-medium text-[#002B5B]">
            <Link
              href={`/SupplementsJourno/${data?.intSupplementId}/${outletId}/${id}/${name}/${data?.vchSupplementName}`}
            >
              {" "}
              {data?.vchSupplementName}{" "}
            </Link>
          </div>

          <span className="pt-2 text-center text-sm font-medium text-gray-600">
            {data?.vchOutletName}
          </span>
          <div className="left mt-1 text-center text-sm leading-none  text-gray-500">
            <div className="left text-center text-sm leading-none  text-gray-500">
              {data?.verticle?.value}
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default SupplementRecord;
