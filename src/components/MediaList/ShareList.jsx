// import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SHARED_LIST, USER_LIST_SHARE } from "../../constants";
import userService from "../../Services/user.service";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";

const ShareList = ({ open, onClose, shareListId, listName }) => {
  const [remainingUsers, setRemainingUsers] = useState([]);
  const [alreadyShare, setAlreadyShare] = useState([]);

  const [selectedValues, setSelectedValues] = useState([]);
  // const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // post final ids of following state to share with
  const [finalIds, setFinalIds] = useState();

  //SHOW NOTIFICATION POPUP
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);
  const USER_LIST = `${USER_LIST_SHARE}?ListId=${shareListId}`;

  const shareList = () => {
    userService
      .post(USER_LIST)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setRemainingUsers(result?.remainingUsers);
          setAlreadyShare(result?.alreadyShare);
        }
      })
      .catch((errors) => {
        if (errors?.response?.status) {
          console.log(errors?.response?.message);
        }
        console.log(errors);
      });
  };

  useEffect(() => {
    if (open && shareListId) {
      shareList();
    }
  }, [open, shareListId]);

  const postSelectedNames = () => {
    const postData = {
      mediaListId: shareListId,
      userIds: finalIds,
    };
    setIsLoading(true);
    userService
      .post(SHARED_LIST, postData)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          success("list shared with users", "success");
          setSelectedValues([]);
          onClose();
        }
      })
      .catch((errors) => {
        console.log(errors, "check error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // const handleSelect = (selectedList, selectedItem) => {
  //   if (!selectedItem || !selectedItem.key) return;
  //   setSelectedValues(selectedList);
  // };

  useEffect(() => {
    if (!open) {
      setSelectedValues([]);
    }
  }, [open]);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const selectedUser = remainingUsers.find((user) => user.id === selectedId);

    if (!selectedUser) return;

    // Check if the user is already selected
    if (selectedValues.some((user) => user.id === selectedId)) {
      warning("Already selected to share", "warning");
      return;
    }

    // Add to selectedValues and update finalIds
    const updatedSelection = [
      ...selectedValues,
      { id: selectedUser.id, name: selectedUser.name },
    ];
    setSelectedValues(updatedSelection);
    setFinalIds(updatedSelection.map((user) => user.id));
  };

  const handleRemove = (idToRemove) => {
    const updatedSelection = selectedValues.filter(
      (user) => user.id !== idToRemove
    );
    setSelectedValues(updatedSelection);
    setFinalIds(updatedSelection.map((user) => user.id));
  };

  if (!open) return null;

  return createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-700 opacity-70 z-[80]"></div>
      <div className="fixed left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-2 shadow-2xl md:w-3/5 lg:w-2/5 xl:w-1/4 z-[85]">
        <div className="flex items-center justify-end">
          <button onClick={onClose}>
            <span className="material-icons-outlined rounded-full p-1 text-gray-800 hover:bg-gray-400 hover:text-gray-200 icon-16">
              close
            </span>
          </button>
        </div>
        <div className="flex flex-col justify-center text-xs px-4 pb-4">
          <h2 className="text-sm text-gray-900">{listName}</h2>
          <div className="flex gap-1 my-2 items-center flex-wrap max-h-[100px] overflow-scroll overflow-x-hidden text-xs">
            {alreadyShare?.length > 0 && "Shared with :"}
            {alreadyShare?.map((curItem) => (
              <div className="bg-gray-200 px-2 py-1 text-xs">
                {curItem?.name}
              </div>
            ))}

            {selectedValues.map((user) => (
              <div
                key={user.id}
                className="bg-gray-100 px-2 py-1 flex items-center gap-x-1 text-xs"
              >
                {user.name}
                <span
                  className="material-icons-outlined icon-12 text-gray-500 cursor-pointer"
                  onClick={() => handleRemove(user.id)}
                >
                  close
                </span>
              </div>
            ))}
          </div>
          <select
            name="share"
            id="share"
            onChange={handleSelectChange}
            className="text-sm p-1 border border-gray-400 rounded-md focus:outline-none"
          >
            <option>Please select</option>
            {remainingUsers?.map((curItem) => (
              <option value={curItem?.id}>{curItem?.name}</option>
            ))}
          </select>
        </div>
        <div className="px-4">
          <button
            type="button"
            onClick={postSelectedNames}
            className={`${isLoading ? "bg-gray-400" : "bg-[#002b5b]"} px-4 py-2 text-xs text-white rounded-md`}
          >
            {isLoading ? "Sharing..." : "Share"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ShareList;
