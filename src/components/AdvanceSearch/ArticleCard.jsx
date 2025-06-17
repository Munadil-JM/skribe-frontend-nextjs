import Link from "next/link";

const ArticleCard = ({ _source }) => {
  return (
    <article className="bg-white p-3 rounded-md border border-black/20 shadow-md">
      <div className="flex sm:items-start flex-col sm:flex-row justify-between gap-2 sm:gap-5 w-full">
        <Link
          href={_source?.vchurl}
          className="text-[#01438D] font-semibold hover:underline hover:decoration-[#01438D]"
          target="_blank"
        >
          {_source?.vchtitle}
        </Link>

        <div className="flex gap-3 items-center">
          <span className="text-black/50 text-xs whitespace-nowrap">
            {/* {new Date(_source?.dtmpublishdate).toLocaleDateString("en-GB")} */}
            {_source?.dtmpublishdate
              ?.split("T")[0]
              .split("-")
              .reverse()
              .join("/")}
          </span>

          <span
            className={`${_source?.vchsentiment === "positive" ? "text-[#16A34A] border-[#16A34A]" : _source?.vchsentiment === "negative" ? "text-[#EF4444] border-[#EF4444]" : "text-[#EAB308] border-[#EAB308]"} border px-2 py-1 text-xs rounded-[4px]`}
          >
            {_source?.vchsentiment.charAt(0).toUpperCase() +
              _source?.vchsentiment.slice(1) || "N/A"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-3 sm:mt-1 flex-wrap">
        <Link
          className={`${_source?.vchauthor == "" && "hidden"} font-medium text-xs`}
          target="_blank"
          href={
            _source?.intjid !== 0
              ? `/journalist-profile/${_source?.intjid}`
              : ""
          }
        >
          <span className={`underline underline-offset-2 hover:text-black/70`}>
            {_source?.vchauthor}
          </span>
          <span>{" —"}</span>
        </Link>

        <span className="text-xs text-black/50 font-medium">
          {_source?.vchwebsite}
        </span>

        {_source?.vchtopics?.length > 0 && (
          <p className="text-[#002B5B] bg-[#EDF5FF] w-fit text-xs py-1 px-2 rounded-[4px]">
            {_source?.vchtopics[0] === "["
              ? JSON.parse(_source?.vchtopics)
              : _source?.vchtopics}
          </p>
        )}
      </div>

      <p className="text-xs text-black/50 mt-2 sm:w-10/12">
        {_source?.mtxtarticlesummary}
      </p>
    </article>
  );
};

export default ArticleCard;
