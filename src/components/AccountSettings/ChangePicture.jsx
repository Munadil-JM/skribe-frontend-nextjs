import { createPortal } from "react-dom";
import noUser from "../assets/noUser.png";

const ChangePicture = ({ open, onClose }) => {
  if (!open) return null;

  return createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-700 opacity-70 z-[80]"></div>
      <div className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-2xl md:w-3/5 lg:w-2/5 xl:w-1/4 z-[85]">
        <div className="flex items-center justify-between border-b border-gray-200">
          <h2 className="text-sm text-gray-700">Change Profile Picture</h2>
          <button onClick={onClose}>
            <span className="material-icons-outlined cursor-pointer rounded-full p-1 text-gray-800 hover:bg-gray-400 hover:text-gray-200">
              close
            </span>
          </button>
        </div>
        <div className="flex justify-center gap-x-1 pt-5">
          <figure className="relative mb-5 flex flex-col items-center">
            <img
              src={noUser.src}
              alt=""
              className="h-24 w-24 rounded-full object-cover"
            />
          </figure>
        </div>
        <div className="flex justify-center text-xs">
          <input type="file" />
        </div>
        <div className="flex justify-center">OR</div>
        <a
          href=""
          className="mx-auto mb-5 mt-5 flex w-fit gap-x-1 rounded-lg bg-gray-200 p-2 px-7 hover:bg-gray-300 text-xs items-center"
        >
          <span className="material-icons-outlined text-xs text-gray-500">
            delete
          </span>
          <p>Remove profile picture</p>
        </a>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ChangePicture;
