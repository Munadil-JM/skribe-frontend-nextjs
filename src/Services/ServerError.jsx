"use client";

import { useRouter } from "next/navigation";

const ServerError = ({ error }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="z-50 flex max-h-full items-center justify-center">
      <div className="fixed inset-0 z-50 bg-gray-600 opacity-90"></div>
      <div className="absolute left-auto top-52 z-50">
        <div className="w-3/3 bg-white p-5">
          <a
            className="my-4 flex items-center text-sm"
            href="/"
            onClick={() => goBack()}
          >
            <span className="material-icons-outlined icon-16 text-gray-500">
              arrow_back_ios_new
            </span>
            Go Back
          </a>
          <h2 className="text-lg font-semibold">
            <span className="text-red-600">Error, Something went wrong!</span>
          </h2>
          <p className="text-lg">Please go back and try again!</p>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
