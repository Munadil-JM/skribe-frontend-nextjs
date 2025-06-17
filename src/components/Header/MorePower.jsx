import { createPortal } from "react-dom";
import pro from "../assets/pro.webp";
import Link from "next/link";

const MorePower = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-700 opacity-70 z-[55]"></div>
      <div
        className={` fixed left-1/2 top-1/2 z-[60] w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-2xl lg:w-3/5 xl:w-2/4`}
      >
        <span
          onClick={onClose}
          className="material-icons-outlined absolute right-1 top-1 rounded-full p-1 text-white bg-gray-400 hover:bg-gray-600 hover:text-gray-200 cursor-pointer"
        >
          close
        </span>

        <div className="flex rounded-lg">
          <div className="px-5 py-10">
            <div className=" flex items-center justify-between ">
              <h2 className="text-2xl font-medium text-gray-800">
                Unlock More Power with Premium! 🚀
              </h2>
            </div>
            <div className="flex flex-col justify-center gap-x-1 gap-y-1 ">
              <p className="text-sm text-gray-500">
                Ready to take your productivity to the next level? Upgrade to
                our Pro Plan and enjoy:
              </p>
              <ul className="p-0 m-0 list-none text-sm pt-5 pb-7 xl:pt-10 xl:pb-20 text-gray-500 flex flex-col xl:gap-y-3 gap-y-2">
                <li>✔️ Unlimited Access to premium features</li>
                <li>✔️ Priority Support for faster assistance</li>
                <li>✔️ Advanced Analytics to optimize your workflow</li>
                <li>✔️ Exclusive Integrations for seamless automation</li>
              </ul>
              <Link
                href="https://calendly.com/growth-jangamedia/30min"
                target="_blank"
                // onClick={() => contact()}
                className="relative mt-4 w-full flex items-center justify-center gap-x-1 rounded-md bg-[#002b5b] px-6 py-3 text-sm font-normal text-white focus:outline-none"
              >
                {" "}
                Contact our sales team
                {/* <span class="material-icons-outlined cursor-pointer text-[#eab621]">
                  lock
                </span> */}
              </Link>
            </div>
          </div>
          <div
            className="hidden w-2/3 md:block rounded-r-lg"
            style={{
              background: `URL(${pro.src}) center no-repeat`,
              backgroundSize: "100%",
            }}
          >
            {/* <img
              src="https://cloud.goskribe.com/v2_Images/request-bg.jpg"
              className="h-full w-full rounded-l-lg rounded-bl-lg object-cover grayscale "
            /> */}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default MorePower;
