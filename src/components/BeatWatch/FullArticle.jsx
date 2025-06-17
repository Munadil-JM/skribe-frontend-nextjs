"use client";

import { useRouter } from "next/navigation";
import ShimmerArticle from "../Shimmers/ShimmerArticle";
import useBeatWatchFullArticle from "../utils/useBeatWatchFullArticle";
import articleDefaultImg from "../assets/article-default.gif";

const FullArticle = ({ id, name }) => {
  const router = useRouter();
  const { isError, isLoading, result } = useBeatWatchFullArticle(id);

  const goBack = () => {
    router.back();
  };
  // const data = {
  //   journoName: "Chitranjan Kumar",
  //   journoTitle: "Freelancer",
  // };

  const formatDate = (date) => {
    const date1 = new Date(date);
    const formattedDate = date1.toLocaleDateString("en-GB");
    return formattedDate;
  };

  return (
    <>
      <section className="container p-4 pt-8 xl:w-3/5">
        <h2 className="text-lg font-medium text-gray-600">{name} Article</h2>
        <main className="container mt-6 rounded-2xl border border-gray-200 bg-white px-6 py-4">
          <article className="gap-x-6py-4 flex  flex-col md:flex-row">
            <div className="w-[100%] flex-grow-0">
              <span
                onClick={() => goBack()}
                className="mb-4 flex cursor-pointer items-center gap-x-1 self-start border  border-gray-300 px-4 py-2 text-sm font-normal text-gray-500 hover:border-gray-400 hover:text-gray-800"
              >
                <span className="material-icons-outlined icon-16">
                  arrow_back_ios_new
                </span>
                Go Back
              </span>

              <img
                src={articleDefaultImg}
                alt="Artilce Default"
                className="mb-4 w-full"
              />

              {!result?.length && <ShimmerArticle />}

              {!isLoading &&
                result?.map((result) => {
                  return (
                    <>
                      <div className="flex flex-1 items-center gap-x-7">
                        {result.sentiment === "negative" && (
                          <span className="w-[72px] bg-red-500 px-2 py-1 text-xs uppercase text-white">
                            Negative
                          </span>
                        )}
                        {result.sentiment === "positive" && (
                          <span className="w-[72px] bg-green-500 px-2 py-1 text-xs uppercase text-white">
                            Positive
                          </span>
                        )}
                        {result.Sentiment === "neutral" && (
                          <span className="w-[72px] bg-orange-500 px-2 py-1 text-xs uppercase text-white">
                            Neutral
                          </span>
                        )}
                        {result.sentiment === null && (
                          <span className="w-[72px] px-2 py-1 text-center text-xs uppercase text-white"></span>
                        )}
                        {result.sentiment === "" && (
                          <span className="w-[72px] px-2 py-1 text-center text-xs uppercase text-white"></span>
                        )}
                      </div>
                      <div className="mb-2">
                        Publish Date : {formatDate(result?.publishDate)}
                      </div>
                      <h4 className="mb-2 text-xl font-semibold text-gray-700">
                        <a
                          href={result.articleUrl}
                          target="blank"
                          className=" font-medium text-black"
                        >
                          {result?.vchTitle}
                        </a>
                      </h4>
                      <p className="text-md text-gray-500">
                        {result?.articleContent}
                      </p>
                    </>
                  );
                })}
            </div>
          </article>
        </main>
      </section>
    </>
  );
};

export default FullArticle;
