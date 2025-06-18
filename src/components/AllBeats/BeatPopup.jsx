import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
//import { useAllBeat } from "../utils/useAllBeat";
import Link from "next/link";
import { GETALLBEATS } from "../../constants";
import userService from "../../Services/user.service";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";
const BeatPopup = ({ open, onClose }) => {
  //const { mediaBeat, isLoadingBeat } = useAllBeat();
  const [mediaBeat, setMediaBeat] = useState([]);
  const [mediaSearch, setMediaSearch] = useState([]);
  const [noRecord, setNoRecord] = useState(true);

  const [loader, setLoader] = useState(true);
  const [selectedBeats, setSelectedBeats] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const clearButton = () => {
    setSearchInput("");
    setMediaBeat(mediaSearch);
  };
  const { showNotification } = useNotification();
  const warning = (msg, type) => showNotification(msg, type);
  useEffect(() => {
    if (searchInput.length > 0) handleSearch(searchInput);
  }, [searchInput]);
  const handleSearch = (val) => {
    const filteredOutlet = mediaSearch?.filter((data) => {
      return data?.beatName?.toLowerCase().includes(val?.toLowerCase());
    });
    setMediaBeat(filteredOutlet);
    if (filteredOutlet.length > 0) {
      setNoRecord(false);
    } else {
      setNoRecord(true);
    }
  };

  const PopupBeatData = () => {
    setLoader(false);

    userService
      .get(`${GETALLBEATS}`)
      .then((result) => {
        setMediaBeat(result?.data);
        setMediaSearch(result?.data);
      })
      .catch((error) => alert(error))
      .finally(() => {
        setLoader(true);
      });
  };

  useEffect(() => {
    if (open) {
      PopupBeatData();
      setSelectedBeats([]);
    }
  }, [open]);
  const selectedBeat = (target, curBeatId) => {
    const { checked } = target;
    if (checked) {
      setSelectedBeats((prevData) => [...prevData, curBeatId]);
    } else {
      setSelectedBeats(selectedBeats.filter((id) => id !== curBeatId));
    }
  };
  if (!open) return null;
  return createPortal(
    <div>
      <div className="fixed inset-0 z-50 bg-gray-700 opacity-70"></div>

      <section className="fixed z-50 w-4/5 p-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl md:w-5/5 sm:w-5/5 left-1/2 top-1/2 lg:w-4/5">
        <button
          onClick={onClose}
          className="absolute cursor-pointer right-4 top-3"
        >
          <span className="p-1 text-gray-800 rounded-full material-icons-outlined hover:bg-gray-400 hover:text-gray-200">
            close
          </span>
        </button>
        <div className="relative flex items-center justify-between border-b border-gray-200 py-2">
          <h2 className="flex flex-col mb-3 font-medium leading-5 text-gray-600 text-md">
            <span className="text-sm font-medium text-gray-600">
              Select a single or multiple beats (you can select up to 3 beats).
            </span>
          </h2>

          <div className="flex items-center rounded-lg border border-gray-300 bg-white  pl-2 mr-3">
            <span className="material-icons-outlined text-sm text-gray-300">
              search
            </span>
            <input
              type="text"
              className="text-sm w-full rounded-lg bg-white px-3 py-1 text-gray-400 focus:outline-none"
              placeholder="Search By Beat Name"
              value={searchInput}
              onChange={(e) => setSearchInput(e?.target?.value)}
              onKeyUp={(e) => handleSearch(e?.target?.value)}
            />
            {searchInput?.length > 0 && (
              <span
                onClick={clearButton}
                className="absolute right-3 material-icons-outlined icon-14 cursor-pointer pr-2 text-xs uppercase text-gray-700 hover:text-gray-900 hover:no-underline"
              >
                close
              </span>
            )}
          </div>
        </div>

        <div
          className="scroll my-4 h-96 overflow-y-auto bg-[#e5e5e5] p-3"
          id="scrollHeight"
        >
          {/* {!loader && <div>Loading...</div>} */}
          <ul className="flex flex-wrap gap-y-3">
            <li className="flex flex-col w-full">
              <span className="flex gap-x-4">
                {/* <span className="text-sm text-gray-500 peer-checked/published:font-medium peer-checked/published:text-gray-800"> */}
                {/* {mediaBeat?.length > 0 && mediaBeat[0]?.orderBy !== 0 && (
                    <h2 className="pb-4 font-medium text-gray-700 text-md peer-checked/published:font-medium peer-checked/published:text-gray-800">
                      Top Search Beats
                    </h2>
                  )} */}
                {/* <ul className="flex flex-col flex-wrap gap-y-3 md:flex-row">
                    {mediaBeat?.map((curItem, index) => {
                      if (curItem?.orderBy !== 0) {
                        return (
                          <li
                            key={index}
                            className="flex w-1/4 gap-x-4 md:w-1/2 lg:w-1/3 xl:w-1/4"
                          >
                            <input
                              className="peer/published n w-4 accent-[#FF3EA5]"
                              type="checkbox"
                              checked={selectedBeats?.includes(curItem.beatid)}
                              onClick={(e) => {
                                if (selectedBeats?.includes(curItem.beatid)) {
                                  selectedBeat(e.target, curItem.beatid);
                                } else {
                                  if (selectedBeats.length <= 2) {
                                    selectedBeat(e.target, curItem.beatid);
                                  } else {
                                    alert(
                                      "You can select a maximum of 3 beats"
                                    );
                                  }
                                }
                              }}
                              name={curItem.beatName}
                              value={curItem.beatName}
                              id={curItem.beatid}
                            />
                            <label
                              htmlFor={curItem.beatid}
                              className="font-medium text-gray-500 text-md peer-checked/published:font-medium peer-checked/published:text-gray-500"
                            >
                              {curItem.beatName}
                            </label>
                          </li>
                        );
                      }
                    })}
                  </ul>
                  <div className="my-5 h-1 border-b border-[#38185A]"></div> */}
                <ul className="flex flex-col flex-wrap gap-y-3 md:flex-row w-full">
                  {mediaBeat
                    ? mediaBeat.length > 0
                      ? mediaBeat?.map((curItem, index) => {
                          return (
                            <li
                              key={index}
                              className="flex w-1/4 gap-x-4 md:w-1/2 lg:w-1/3 xl:w-1/4"
                            >
                              <input
                                className="peer/published n w-4 accent-[#318fff]"
                                type="checkbox"
                                checked={selectedBeats?.includes(
                                  curItem.beatid
                                )}
                                onChange={() => {}}
                                onClick={(e) => {
                                  if (selectedBeats?.includes(curItem.beatid)) {
                                    selectedBeat(e.target, curItem.beatid);
                                  } else {
                                    if (selectedBeats.length <= 2) {
                                      selectedBeat(e.target, curItem.beatid);
                                    } else {
                                      warning(
                                        "You can select a maximum of 3 beats",
                                        "warning"
                                      );
                                    }
                                  }
                                }}
                                name={curItem.beatName}
                                value={curItem.beatName}
                                id={curItem.beatid}
                              />
                              <label
                                htmlFor={curItem.beatid}
                                className="text-xs flex items-center font-normal text-gray-500 hover:accent-[#FF3EA5] peer-checked/published:font-medium peer-checked/published:text-gray-500"
                              >
                                {curItem.beatName}
                              </label>
                            </li>
                          );
                        })
                      : !loader
                        ? "Loading..."
                        : "No Record Found"
                    : "No Record Found"}
                </ul>
                {/* </span> */}
              </span>
            </li>
          </ul>
        </div>
        <div className="flex justify-end ">
          {selectedBeats?.length && selectedBeats?.length > 0 ? (
            <Link
              href={`/journalist-by-beat/${selectedBeats}`}
              className={
                "mt-4 w-fit cursor-pointer rounded-md bg-[#002b5b] px-5 py-2 text-xs font-semibold text-white focus:outline-none"
              }
              onClick={onClose}
            >
              {" "}
              Submit
            </Link>
          ) : (
            <span
              className="px-5 py-2 mt-4 text-xs font-semibold text-gray-500 bg-gray-300 rounded-md cursor-default w-fit focus:outline-none"
              disabled
            >
              Submit
            </span>
          )}
        </div>
      </section>
    </div>,
    document.getElementById("portal")
  );
};

export default BeatPopup;
