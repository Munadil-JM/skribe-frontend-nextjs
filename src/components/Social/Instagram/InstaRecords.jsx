// import { baseURL } from "../../../constants";
import noUser from "../../assets/noUser.png";
import Link from "next/link";

const InstaRecords = ({ data }) => {
  return (
    <div className="relative flex w-1/4 flex-shrink flex-grow flex-col overflow-hidden rounded-lg border border-gray-300 p-3  py-3 pb-5 pt-9 lg:w-1/3  xl:w-1/4">
      <figure className="relative mb-1 flex flex-1 flex-col items-center">
        <Link href={`/insta-detail/${data?.instagram_id}`} target="_blank">
          <img
            src={
              data?.profile_picture_url
                ? data.profile_picture_url !== ""
                  ? data?.profile_picture_url
                  : noUser.src
                : noUser.src
            }
            alt=""
            className="h-28 w-28 rounded-full object-cover"
          />
        </Link>
        <figcaption className="text-md flex flex-col items-center pt-4 text-gray-900">
          <div className="text-sm line-clamp-2 max-h-12 overflow-hidden text-center font-medium text-[#002b5b]">
            <Link href={`/insta-detail/${data?.instagram_id}`} target="_blank">
              {data?.fullname === "" && "Name N/A"}
              {data?.fullname?.slice(0, 1).toUpperCase()}
              {data?.fullname?.slice(1)}
            </Link>
          </div>
          <span className="pb-2 text-gray-400 font-medium text-center text-xs  leading-none ">
            {data?.categories?.map((curCat) => curCat + ", ")}
          </span>
          <span className="pt-2 text-gray-700 font-medium text-center text-sm  leading-none ">
            <Link
              href={`https://www.instagram.com/${data?.instagram_username}`}
              target="_blank"
            >
              {" "}
              @{data?.instagram_username}
            </Link>
          </span>
          <div className="mt-2">
            <div className="left text-center text-sm leading-none text-gray-700 font-medium">
              Followers:{data?.instagram_follower_count}
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default InstaRecords;
