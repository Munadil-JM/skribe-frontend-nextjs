import React from "react";
import Skeleton from "react-loading-skeleton";
import Nodata from "../../utils/Nodata";
import Link from "next/link";

const BrandArticle = ({
  articles,
  totalCount,
  loading,
  setCurrentPage,
  currentPage,
}) => {
  const articlesPerPage = 10; // Assuming 10 articles per page
  const totalPages = Math.ceil(totalCount / articlesPerPage);
  const handlePagination = (operation) => {
    setCurrentPage((prevPage) => {
      if (
        operation === "increment" &&
        currentPage * articlesPerPage < totalCount
      ) {
        return prevPage + 1;
      } else if (operation === "decrement" && prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  return (
    <div className="overflow-y-auto h-[650px] scrollbar">
      {loading ? (
        <Skeleton count={3} />
      ) : articles?.length > 0 ? (
        articles?.map((ele, index) => {
          const formattedDate = new Date(
            ele?._source?.dtmpublishdate
          ).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          return (
            <React.Fragment key={index}>
              <div className="flex flex-col justify-between gap-4 mx-2 mt-2 mb-2 xl:items-center xl:flex-row">
                <div className="xl:w-[85%]">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-[500] text-xs text-[#333333]">
                      {ele?._source?.vchtitle}
                    </h2>
                    <div className="flex gap-x-2">
                      <p className=" text-xs font-[400] text-customGray64 w-full">
                        {ele?._source?.mtxtarticlesummary
                          ? String(ele._source?.mtxtarticlesummary).slice(
                              0,
                              200
                            ) + "..."
                          : ""}

                        <Link
                          href={ele?._source?.vchurl}
                          className="cursor-pointer text-[#333333] text-xs font-weight-500"
                          target="_blank"
                        >
                          Read More
                        </Link>
                      </p>
                      <span className="text-xs text-customGray100">
                        {formattedDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="xl:mx-2">
                  {["positive", "Positive"].includes(
                    ele?._source?.vchsentiment
                  ) && (
                    <div className="w-20 py-1 px-2 tracking-wider text-center rounded-[2px] border border-green-600 text-green-600">
                      <p className="text-[11px]">
                        {ele?._source?.vchsentiment?.toUpperCase()}
                      </p>
                    </div>
                  )}

                  {["neutral", "Neutral"].includes(
                    ele?._source?.vchsentiment
                  ) && (
                    <div className="w-20 py-1 px-2 tracking-wider text-center rounded-[2px] border border-yellow-500 text-yellow-500">
                      <p className="text-[11px]">
                        {ele?._source?.vchsentiment.toUpperCase()}
                      </p>
                    </div>
                  )}
                  {["negative", "Negative"].includes(
                    ele?._source?.vchsentiment
                  ) && (
                    <div className="w-20 py-1 px-2 tracking-wider text-center rounded-[2px] font-[500] border border-red-500 text-red-500">
                      <p className="text-[11px]">
                        {ele._source.vchsentiment.toUpperCase()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <hr className="h-[1px] before-0 text-[#D0D0D0] w-full" />
            </React.Fragment>
          );
        })
      ) : (
        <Nodata />
      )}

      <div className="flex items-center">
        {articles?.length > 0 && articles.length < totalCount && (
          <div className="flex items-center justify-center my-2 text-center text-[15px] gap-4">
            <div
              className={`p-2 pt-2 pb-1 rounded-[5px] border-[#333333] items-center justify-center border-[1px] ${
                currentPage === 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              onClick={() => currentPage > 1 && handlePagination("decrement")}
            >
              <span className="icon-16 text-sm  text-[#333333] material-icons-outlined">
                arrow_back
              </span>
            </div>
            <div className="font-[500]">{currentPage + "/" + totalPages}</div>

            {currentPage !== totalPages && (
              <div
                className={`p-2 pt-2 pb-1 rounded-[5px] border-[#333333] items-center justify-center border-[1px] ${
                  articles.length > 9
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`}
                onClick={() =>
                  articles.length > 9 && handlePagination("increment")
                }
              >
                <span className="icon-16 text-sm  text-[#333333] material-icons-outlined">
                  arrow_forward
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandArticle;
