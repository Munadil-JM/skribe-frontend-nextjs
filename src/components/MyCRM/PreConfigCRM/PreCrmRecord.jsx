import { baseURL } from "../../../constants";
import noUser from "../../assets/noUser.png";
import Link from "next/link";

const PreCrmRecord = ({
  journalistId,
  journalistName,
  photoPath,
  outlet,
  beat,
  city,
  addInCrm,
  crmStatus,
}) => {
  //ADD TO CRM START
  return (
    <div className="relative flex w-1/4 flex-shrink flex-grow flex-col overflow-hidden rounded-lg border border-gray-300 p-3  py-3 pb-10 pt-14 lg:w-1/4  xl:w-1/4">
      <figure className="relative flex flex-col items-center">
        {!crmStatus && (
          <input
            type="checkbox"
            name="abc"
            id="abc"
            className="peer/published absolute -top-10 right-3 h-4 w-4 accent-orange-600"
            value="abc"
            onClick={(e) => addInCrm(e.target, journalistId)}
          />
        )}
        <Link href={`/journalist-profile/${journalistId}`}>
          <img
            src={
              photoPath
                ? photoPath !== ""
                  ? baseURL + photoPath
                  : noUser.src
                : noUser.src
            }
            alt=""
            className="h-20 w-20 rounded-full object-cover"
            loading="lazy"
          />
        </Link>
        <figcaption className="text-md flex flex-col items-center pt-8 leading-4 text-gray-900">
          <div className="text-md line-clamp-2 max-h-10 overflow-hidden text-center font-semibold text-[#6521AD]">
            {journalistName}
          </div>
          <span className="pt-4 text-center text-sm font-medium text-gray-600">
            {outlet?.length > 0
              ? outlet.map(
                  (curItem) => curItem.outletName && curItem.outletName
                )
              : "Outlet: N/A"}
          </span>
          <div className="left mt-1 text-center text-sm leading-none  text-gray-500">
            {beat?.length > 0 && beat[0]?.beatName !== "" ? (
              beat?.map((beat, index) => (
                <div
                  key={index}
                  className="left text-center text-sm leading-none  text-gray-500"
                >
                  {beat.beatName}
                </div>
              ))
            ) : (
              <div className="left text-center text-sm text-gray-500">
                Beat : N/A
              </div>
            )}
          </div>
        </figcaption>
      </figure>
      <div className="flex items-center justify-center gap-x-1 text-gray-400">
        {/* <span className="material-icons-outlined">location_on</span> */}
        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {city ? city?.city : "N/A"}
        </div>
      </div>
      {crmStatus && (
        <div className="absolute left-0 top-3 px-2 py-1 text-center text-xs  font-medium text-[#6521AD]">
          Added to CRM
        </div>
      )}
    </div>
  );
};

export default PreCrmRecord;
