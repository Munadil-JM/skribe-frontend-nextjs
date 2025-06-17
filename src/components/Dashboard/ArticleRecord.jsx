import Link from "next/link";
import { baseURL } from "../../constants";
import noUser from "../assets/noUser.png";

const ArticleRecord = ({
  journoName,
  journoTitle,
  photoPath,
  title,
  article,
  url,
  date,
  sentiment,
  JID,
  ArticleId,
}) => {
  let dateObj = new Date(date);
  let dd = dateObj.getDate();
  let mm = dateObj.getMonth() + 1;
  let yy = dateObj.getFullYear();

  return (
    <article className="flex flex-col gap-x-6 border-b border-gray-200 py-4 md:flex-row">
      <div className="flex w-[150px] flex-shrink-0 flex-col justify-start gap-y-1">
        <figure>
          <Link href="/journalist-profile/236760">
            <img
              className="h-24 w-24 cursor-pointer rounded-full md:h-16 md:w-16"
              src={
                photoPath
                  ? photoPath !== ""
                    ? baseURL + photoPath
                    : noUser.src
                  : noUser.src
              }
              alt=""
            />
          </Link>
        </figure>
        <figcaption>
          <h3 className="text-sm font-medium text-gray-700">{journoName}</h3>
          <p className="text-xs font-normal text-gray-500">{journoTitle}</p>
        </figcaption>
      </div>
      <div className="mt-2 w-[100%] flex-grow-0">
        <h4 className="text-md font-medium text-gray-700">{title}</h4>
        <p className="text-sm text-gray-500">
          {article.substring(0, 250)}
          <Link className="font-medium text-gray-900" href={`${ArticleId}`}>
            &nbsp;Read More
          </Link>
          <span className="text-gray-400"> {`Date: ${dd}-${mm}-${yy}`}</span>
        </p>
      </div>
      <div className="flex flex-1 items-center gap-x-7">
        {sentiment === 0 && (
          <span className="w-[72px] bg-red-500 px-2 py-1 text-xs uppercase text-white">
            Negative
          </span>
        )}
        {sentiment === 1 && (
          <span className="w-[72px] bg-green-500 px-2 py-1 text-xs uppercase text-white">
            Positive
          </span>
        )}
        {sentiment === 2 && (
          <span className="w-[72px] bg-orange-500 px-2 py-1 text-xs uppercase text-white">
            Neutral
          </span>
        )}
        {sentiment === null && (
          <span className="w-[72px] px-2 py-1 text-center text-xs uppercase text-white"></span>
        )}
        {sentiment === "" && (
          <span className="w-[72px] px-2 py-1 text-center text-xs uppercase text-white"></span>
        )}

        <Link
          href={""}
          onClick={() => alert(JID)}
          className="material-icons-outlined border border-gray-300 p-2 text-gray-400"
        >
          share
        </Link>
      </div>
    </article>
  );
};

export default ArticleRecord;
