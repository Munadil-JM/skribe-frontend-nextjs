import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import userService from "../../Services/user.service";
import { baseURL, DUPLICATE_COPY } from "../../constants";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";

const DuplicateCopy = ({ open, onClose, duplicateData, fetchMediaList }) => {
  const [localDuplicateData, setLocalDuplicateData] = useState({});
  const [duplicateLoading, setDuplicateLoading] = useState(false);
  //SHOW NOTIFICATION POPUP
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  const error = (msg, type) => showNotification(msg, type);

  useEffect(() => {
    setLocalDuplicateData(duplicateData || {});
  }, [duplicateData]);

  const copyList = () => {
    if (localDuplicateData?.listName === "") {
      warning("please enter list name", "warning");
      return;
    } else if (localDuplicateData?.vchListDescription === "") {
      warning("Please enter list Description", "warning");
      return;
    }
    const copyListData = localDuplicateData;
    setDuplicateLoading(true);
    userService
      .post(DUPLICATE_COPY, copyListData)
      .then((result) => {
        if (result?.status === "Created") {
          success("Media list copied and created", "success");
          onClose();
          fetchMediaList();
          // setTimeout(() => {
          //   fetchMediaList();
          // }, 5000);
        } else if (result?.status === "Already") {
          warning(result?.message, "warning");
        } else if (result?.status === "NoContent") {
          warning(result?.message, "warning");
        }
      })
      .catch((errors) => {
        if (errors?.status === "BadRequest") {
          error(error?.message, "error");
        }
        console.log(errors, "check error in console");
      })
      .finally(() => {
        setDuplicateLoading(false);
      });
  };

  if (!open) return null;

  return createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-700 opacity-70 z-[80]"></div>
      <div className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-2 shadow-2xl md:w-3/5 lg:w-2/5 xl:w-1/4 z-[85]">
        <div className="flex items-center justify-end">
          <button onClick={onClose}>
            <span className="material-icons-outlined rounded-full p-1 text-gray-800 hover:bg-gray-400 hover:text-gray-200 icon-16">
              close
            </span>
          </button>
        </div>
        <div className="flex flex-col justify-center text-xs px-4 pb-4 py-4">
          <input
            type="text"
            onChange={(e) =>
              setLocalDuplicateData({
                ...localDuplicateData,
                listName: e.target.value,
              })
            }
            value={localDuplicateData?.listName || ""}
            className="text-xs text-gray-600 border border-gray-300 p-2 rounded-md drop-shadow-md focus:outline-none"
          />

          <textarea
            onChange={(e) =>
              setLocalDuplicateData({
                ...localDuplicateData,

                description: e?.target.value,
              })
            }
            value={localDuplicateData?.description || ""}
            className="resize-none text-gray-600 h-[100px] mt-2 p-2 border border-gray-300 rounded-md drop-shadow-md focus:outline-none"
          ></textarea>

          <div className="flex flex-col">
            <div className="mt-2 text-gray-600">Total Journalists</div>
            <div className="flex items-center">
              {duplicateData?.img?.map((images, index) => {
                if (index <= 4) {
                  return (
                    <>
                      <img
                        key={index}
                        src={encodeURI(`${baseURL}${images}`)}
                        width="60"
                        height="60"
                        alt={`Image ${index + 1}`}
                        className="w-[30px] h-[30px] bg-gray-300 object-cover rounded-full border-2 border-white -mr-2"
                      />
                    </>
                  );
                }
              })}

              <div className="w-[30px] h-[30px] bg-gray-200 rounded-full -mr-8 flex items-center justify-center text-md font-medium">
                {duplicateData?.count}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={copyList}
              className={`${duplicateLoading ? "bg-gray-500" : "bg-[#002b5b]"} px-4 py-2 text-xs text-white rounded-md`}
            >
              {duplicateLoading ? "Creating..." : "Duplicate List"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default DuplicateCopy;
