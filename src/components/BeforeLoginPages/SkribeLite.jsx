import Link from "next/link";
import { createPortal } from "react-dom";

const SkribeLite = ({ isOpen, setIsOpen, onClose, id }) => {
  if (!isOpen) return null;

  return createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-700 opacity-70"></div>
      <div
        className={`fixed left-1/2 top-1/2 z-20 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-2xl lg:w-3/5 xl:w-2/5`}
      >
        <div className="container mx-auto">
          <section className="section mx-auto flex w-11/12 flex-col gap-x-6 lg:flex-row">
            <div className="img-wrap bg-white p-5 ">
              <div className="flex flex-col  text-center">
                <h2 className="text-2xl font-medium text-gray-800 text-balance">
                  Welcome to Skribe Lite!
                </h2>
                <span
                  onClick={onClose}
                  className="material-icons-outlined absolute right-1 top-1 rounded-full p-1 text-gray-400 hover:bg-gray-400 hover:text-gray-200 cursor-pointer"
                >
                  close
                </span>
                <p className="text-gray-400 leading-6 text-sm text-balance mt-4">
                  You're all set to start transforming your media experience
                  with Skribe Lite. Dive into our platform and explore powerful
                  tools tailored to enhance your media outreach.
                </p>
                <div className="flex flex-col md:flex-row justify-between items-center gap-x-4 my-6">
                  <p className="md:text-left pb-3 md:pb-0 w-full text-sm  text-center text-gray-400 leading-5 text-balance">
                    You have 30 days to unlock insights. Ready to make the most
                    of it?
                  </p>
                  <div className="flex px-5 items-center bg-gray-100 border text-sm border-gray-300 py-2 rounded-lg whitespace-nowrap font-semibold">
                    30 Days Left
                  </div>
                </div>
                <Link
                  type="button"
                  href={
                    id !== undefined ? `/view-journalists/${id}` : "/dashboard"
                  }
                  className="bg-purple-800 text-white py-3 rounded-lg mb-4 cursor-pointer"
                >
                  Let's get started!
                </Link>
                <div className="flex gap-x-3 justify-between mt-6">
                  <p className="text-left w-full text-sm text-gray-400 leading-5">
                    Want to Unlock More Power with Pro!? 🚀
                  </p>
                  <Link
                    href="/pricing"
                    // onClick={() => setIsOpen(!isOpen)}
                    className="cursor-pointer  self-center text-gray-600 dash whitespace-nowrap border-b border-gray-400 hover:border-gray-800 border-dashed text-sm"
                  >
                    Upgrade to Pro
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default SkribeLite;
