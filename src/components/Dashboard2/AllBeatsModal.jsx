"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GETALLBEATS } from "../../constants";
import userService from "../../Services/user.service";
// import { Button } from "@chakra-ui/react";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";

const AllBeatsModal = ({ open, onClose, onSelectBeats }) => {
  const [mediaBeat, setMediaBeat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBeats, setSelectedBeats] = useState([]);
  const [warningMessage, setWarningMessage] = useState(""); // Added state for warning message

  const { showNotification } = useNotification();
  // const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);

  const fetchBeatData = async () => {
    setLoading(true);
    try {
      const result = await userService.get(GETALLBEATS);
      setMediaBeat(result.data);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchBeatData();
      setSelectedBeats([]);
      setWarningMessage("");
    }
  }, [open]);

  const handleSelectBeat = (e, beatName) => {
    const { checked } = e.target;
    const newSelectedBeats = checked
      ? [...selectedBeats, beatName]
      : selectedBeats.filter((name) => name !== beatName);

    if (newSelectedBeats.length > 3) {
      warning("You can select up to 3 beats only.", "warning");
    }

    setSelectedBeats(newSelectedBeats);
  };

  const handleSubmit = () => {
    if (selectedBeats.length === 0) {
      // setWarningMessage("You can select up to 3 beats only.");
      warning("Please select a beat", "warning");
    } else if (selectedBeats.length > 3) {
      // setWarningMessage("You can select up to 3 beats only.");
      warning("You can select a maximum of 3 beats", "warning");
    } else {
      onSelectBeats(selectedBeats);
      onClose();
    }
  };

  if (!open) return null;

  return createPortal(
    <div>
      <div className="fixed inset-0 z-50 bg-gray-700 opacity-70"></div>
      <section className="fixed z-50 w-4/5 p-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl md:w-5/5 sm:w-5/5 left-1/2 top-1/2 lg:w-4/5">
        <button onClick={onClose} className="absolute right-4 top-3">
          <span className="p-1 text-gray-800 rounded-full material-icons-outlined hover:bg-gray-400 hover:text-gray-200">
            close
          </span>
        </button>
        <div className="relative flex items-center justify-between border-b border-gray-200">
          <h2 className="flex flex-col mb-3 font-medium leading-5 text-gray-600 text-md">
            <span className="text-sm font-medium text-gray-600">
              Select a single or multiple beats (you can select up to 3 beats).
            </span>
          </h2>
        </div>

        <div
          className="scroll my-4 max-h-96 overflow-y-auto bg-[#e5e5e5] p-3"
          id="scrollHeight"
        >
          {loading ? (
            <div>Loading...</div>
          ) : (
            <span className="flex gap-x-4">
              <span className="text-sm text-gray-500 peer-checked/published:font-medium peer-checked/published:text-gray-800">
                <ul className="flex flex-wrap mt-2 gap-y-3">
                  {mediaBeat.length > 0 && mediaBeat[0]?.orderBy !== 0 && (
                    <h2 className="pb-4 font-medium text-gray-700 text-md">
                      Top Search Beats
                    </h2>
                  )}
                  {mediaBeat.map((beat) => (
                    <li
                      key={beat.beatName}
                      className="flex w-1/4 gap-x-4 md:w-1/2 lg:w-1/3 xl:w-1/4"
                    >
                      <input
                        type="checkbox"
                        className="peer/published n w-4 accent-[#318fff]"
                        checked={selectedBeats.includes(beat.beatName)}
                        onChange={(e) => {
                          if (selectedBeats?.includes(beat.beatName)) {
                            handleSelectBeat(e, beat.beatName);
                          } else {
                            if (selectedBeats.length <= 2) {
                              handleSelectBeat(e, beat.beatName);
                            } else {
                              warning(
                                "You can select a maximum of 3 beats",
                                "warning"
                              );
                            }
                          }
                        }}
                        id={beat.beatName}
                      />
                      <label
                        htmlFor={beat.beatName}
                        className="font-medium text-gray-500 text-md peer-checked/published:font-medium peer-checked/published:text-gray-500"
                      >
                        {beat.beatName}
                      </label>
                    </li>
                  ))}
                </ul>
              </span>
            </span>
          )}
        </div>
        {warningMessage && (
          <div className="mb-2 text-sm text-[#fac540]">{warningMessage}</div>
        )}
        <div className="flex justify-end">
          <div
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-[#002b5b] rounded-lg text-white"
          >
            Submit
          </div>
        </div>
      </section>
    </div>,
    document.getElementById("portal")
  );
};

export default AllBeatsModal;
