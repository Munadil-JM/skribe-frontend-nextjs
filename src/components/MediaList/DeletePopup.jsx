// import Multiselect from "multiselect-react-dropdown";
import { createPortal } from "react-dom";
import userService from "../../Services/user.service";
import { DELETE_LIST } from "../../constants";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";

const DeletePopup = ({
  open,
  onClose,
  listId,
  setListId,
  allMediaList,
  setAllMediaList,
  setSelectedRadio,
  totalResult,
  setTotalResult,
}) => {
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);
  const deleteLists = (id) => {
    userService
      .delete(`${DELETE_LIST}/${id}`)
      .then((result) => {
        if (result?.status === "Success") {
          onClose();
          success(result?.message, "success");
          setTimeout(() => {
            setListId(""); // Clear after closing
            setSelectedRadio(null);
          }, 0); // Ensures the state is updated after re-render

          setSelectedRadio(null);
          let sortedData = allMediaList?.filter(
            (curItem) => curItem?.intCampListId !== id
          );
          setAllMediaList(sortedData);
          setTotalResult(totalResult - 1);
          // setAllMediaList([]);
          // MediaList(url);
        } else if (result?.status === "ExistInCampaign") {
          onClose();
          setTimeout(() => {
            setListId("");
            setSelectedRadio(null);
          }, 0);
          warning(result?.message, "warning");
          // setListId("");
          // setSelectedRadio(null);
        }
      })
      .catch((errors) => {
        if (errors?.response?.data?.status === "Not Found") {
          warning(errors?.response?.data?.message, "warning");
        }
        console.error("Error deleting list:", errors);
      });
  };

  if (!open) return null;

  return createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-700 opacity-70 z-[80]"></div>
      <div className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-2xl md:w-3/5 lg:w-1/5 xl:w-1/5 z-[85]">
        <div className="flex items-center justify-end absolute right-1 top-1">
          <button onClick={onClose}>
            <span className="material-icons-outlined rounded-full p-1 text-gray-800 hover:bg-gray-400 hover:text-gray-200 icon-16">
              close
            </span>
          </button>
        </div>
        <div className="flex flex-col justify-center text-xs pb-2">
          <h2 className="text-sm text-gray-900">
            Are you sure you want to delete?
          </h2>
        </div>
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => deleteLists(listId)}
            className="border border-purple-700 bg-purple-700 px-4 py-1 text-xs text-white rounded-md"
          >
            OK
          </button>
          <button
            onClick={onClose}
            type="button"
            className="border border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white px-4 py-1 text-xs rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default DeletePopup;
