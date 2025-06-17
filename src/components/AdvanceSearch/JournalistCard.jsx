import { useMemo, useState } from "react";
import Link from "next/link";
import { baseURL } from "../../constants";
import noUser from "../assets/noUser.png";

const highlightText = (text, term, selectedType, highlightType) => {
  if (selectedType !== highlightType) {
    return text;
  }

  term = term.trim();
  const originalText = Array.isArray(text) ? text?.[0] : text;

  const lowerText = originalText?.toLowerCase();
  const lowerTerm = term?.toLowerCase();

  let highlightTarget = "";

  if (lowerTerm?.includes(lowerText)) {
    highlightTarget = originalText;
  } else if (lowerText?.includes(lowerTerm)) {
    highlightTarget = term;
  } else {
    // find largest substring from term that matches the beginning of text
    const words = term.split(/\s+/);
    let match = "";

    for (let i = words?.length; i > 0; i--) {
      const sub = words?.slice(0, i).join(" ");
      if (lowerText?.includes(sub.toLowerCase())) {
        match = sub;
        break;
      }
    }

    if (match) highlightTarget = match;
    else return text;
  }

  const regex = new RegExp(`(${highlightTarget})`, "gi");
  const parts = originalText.split(regex);

  return parts?.map((part, index) =>
    part?.toLowerCase() === highlightTarget.toLowerCase() ? (
      <span key={index} className="bg-[#FFDB43] text-black">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

const getCleanedTopics = (vchtopics, topics) => {
  const allTopics = [];

  if (vchtopics) {
    try {
      const parsed = JSON.parse(vchtopics);
      if (Array.isArray(parsed)) {
        allTopics.push(...parsed);
      } else if (typeof parsed === "string") {
        allTopics.push(parsed);
      }
    } catch {
      if (typeof vchtopics === "string" && vchtopics.trim()) {
        allTopics.push(vchtopics);
      }
    }
  }

  if (Array.isArray(topics)) {
    topics.forEach((item) => {
      if (typeof item === "string" && item.trim()) {
        allTopics.push(item.trim());
      } else if (
        Array.isArray(item) &&
        item.length > 0 &&
        typeof item[0] === "string" &&
        item[0].trim()
      ) {
        allTopics.push(item[0].trim());
      }
    });
  }

  const uniqueTopics = Array.from(
    new Set(
      allTopics
        .map((t) => (typeof t === "string" ? t.trim() : ""))
        .filter(Boolean)
    )
  );

  return uniqueTopics;
};

const JournalistCard = ({
  value,
  handleCase,
  vchPhotoPath,
  city,
  jourTitle,
  beat,
  subBeat,
  vchtitle,
  articleUrl,
  crmStatus,
  topics,
  outlets,
  search,
  vchtopics,
  selectedType,
  open,
  isSelected,
  handleSelect,
  disabled,
}) => {
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [showAllSubBeats, setShowAllSubBeats] = useState(false);

  const cleanedTopics = useMemo(
    () => getCleanedTopics(vchtopics, topics),
    [vchtopics, topics]
  );

  return (
    <article className="bg-white relative p-3 rounded-md flex gap-3 flex-col sm:flex-row items-start justify-between border border-[#E8E8E8] shadow-md">
      <div className="flex gap-2 sm:gap-5 items-start justify-normal w-full sm:w-1/2 lg:w-2/5">
        <input
          type="checkbox"
          disabled={disabled}
          className="scale-150 mt-2 mr-2 accent-[#002B5B]"
          onChange={handleSelect}
          checked={isSelected}
        />

        <div className="flex gap-2 sm:gap-5 items-start">
          <img
            src={vchPhotoPath !== "" ? baseURL + vchPhotoPath : noUser.src}
            width={40}
            height={40}
            alt=""
            className="rounded-full aspect-square"
          />

          <div>
            <p
              className="sm:whitespace-nowrap flex flex-wrap sm:flex-nowrap gap-x-2 items-center"
              aria-label="Journalist name"
            >
              <span
                onClick={open}
                role="button"
                className="font-semibold underline underline-offset-2 cursor-pointer"
              >
                {highlightText(value, search, selectedType, "Journalist")}
              </span>

              {crmStatus && (
                <span className="px-1 text-center text-xs bg-green-600 font-medium text-white rounded-sm">
                  Added to CRM
                </span>
              )}

              {handleCase === 64 && (
                <span className="bg-red-600 px-2 text-xs uppercase text-white absolute right-0 top-2 rounded-l-[4px] py-1">
                  Left Journalism
                </span>
              )}

              {handleCase === 65 && (
                <span className="bg-green-500 px-2 text-xs uppercase text-white absolute right-0 top-2 rounded-l-[4px] py-1">
                  In transition
                </span>
              )}

              {handleCase === 66 && (
                <span className="bg-orange-500 px-2 text-xs uppercase text-white absolute right-0 top-2 rounded-l-[4px] py-1">
                  Moved Abroad
                </span>
              )}

              {handleCase === 67 && (
                <span className="bg-red-600 px-2 text-xs uppercase text-white absolute right-0 top-2 rounded-l-[4px] py-1">
                  RIP
                </span>
              )}
            </p>

            <p className="text-xs text-black/70">
              <span className="text-black">{`${jourTitle}, `}</span>
              {outlets?.[0]?.value}
            </p>

            <p className="text-xs text-black/70 text-balance sm:text-wrap mt-2 hidden sm:block">
              Article:{" "}
              <Link
                href={articleUrl}
                className="text-black/40 text-xs underline "
                target="_blank"
              >
                {vchtitle || "N/A"}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-black/70 text-balance sm:text-wrap mt-2 block sm:hidden">
        Article:{" "}
        <Link
          href={articleUrl}
          className="text-black/40 text-xs underline "
          target="_blank"
        >
          {vchtitle || "N/A"}
        </Link>
      </p>

      <div className="mt-[1px] flex items-start gap-5 justify-between sm:w-1/2">
        <div>
          <div className="flex gap-1 items-center">
            <img
              src="/assets/adv-search-location.png"
              alt="Advance Search - Location icon"
              width={15}
              height={15}
              className="-ml-[2px]"
            />

            <p className="text-black text-xs font-medium">
              {city?.[0]?.city
                ?.toLowerCase()
                .split(" ")
                .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
                .join(" ") || "N/A"}
            </p>
          </div>

          <div className="flex gap-2 items-center mt-2">
            <p className="text-xs flex gap-2 flex-wrap items-center">
              <span className="text-xs font-medium">Primary beat:</span>
              {beat?.map((item, index) => (
                <span
                  key={index}
                  className="text-black/40 bg-[#F1F1E6] px-2 py-1 rounded-[4px]"
                >
                  {highlightText(item?.beatName, search, selectedType, "Beat")}
                </span>
              ))}
            </p>
          </div>

          {subBeat?.length > 0 && (
            <div className="flex gap-2 items-center mt-2">
              <p className="text-xs flex gap-2 flex-wrap items-center">
                <span className="text-xs font-medium">Secondary beat:</span>
                {subBeat
                  ?.sort(
                    (a, b) =>
                      b?.subBeatName
                        ?.toLowerCase()
                        .includes(search?.toLowerCase()) -
                      a?.subBeatName
                        ?.toLowerCase()
                        .includes(search?.toLowerCase())
                  )
                  .map((item, index) => {
                    if ((!showAllSubBeats && index > 2) || index > 4) {
                      return null;
                    }

                    return (
                      <span
                        key={index}
                        className="text-black/40 bg-[#F1F1E6] px-2 py-1 rounded-[4px]"
                      >
                        {highlightText(
                          item?.subBeatName,
                          search,
                          selectedType,
                          "Beat"
                        )}
                      </span>
                    );
                  })}

                {showAllSubBeats && (
                  <button
                    type="button"
                    className="px-1 py-1 text-black/70 underline cursor-pointer"
                    onClick={() => setShowAllSubBeats(false)}
                  >
                    View less
                  </button>
                )}
              </p>
            </div>
          )}

          {!showAllSubBeats && subBeat?.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAllSubBeats(true)}
              className="text-black/70 text-xs underline mt-2 cursor-pointer"
            >
              View more
            </button>
          )}

          <div className="flex gap-1 items-center mt-2">
            <p className="text-xs flex gap-2 flex-wrap">
              {cleanedTopics.map((topic, index) => {
                if ((!showAllTopics && index > 2) || index > 4) {
                  return null;
                }

                return (
                  <span
                    key={index}
                    className="text-[#002B5B] bg-[#EDF5FF] px-2 py-1 rounded-[4px]"
                  >
                    {highlightText(topic, search, selectedType, "Topic")}
                  </span>
                );
              })}

              {showAllTopics && (
                <button
                  type="button"
                  className="px-1 py-1 text-[#002B5B] underline cursor-pointer"
                  onClick={() => setShowAllTopics(false)}
                >
                  View less
                </button>
              )}
            </p>
          </div>

          {!showAllTopics && cleanedTopics?.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAllTopics(true)}
              className="text-[#002B5B] text-xs underline mt-2 cursor-pointer"
            >
              {`${cleanedTopics.length > 5 ? "2" : cleanedTopics.length - 3}+ topics`}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default JournalistCard;
