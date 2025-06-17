import React from "react";

class ErrorBoundary extends React.Component {
  state = {
    error: "",
  };

  static getDerivedStateFromError(error) {
    return {
      error: error,
    };
  }
  componentDidCatch(error, info) {
    console.log("error is", error);
    console.log("error is", info);
  }

  render() {
    if (this.state.error) {
      return (
        <>
          <header className="sticky top-0 z-50 flex items-center flex-col-reverse justify-between border-b  md:px-5 border-gray-300 bg-[#002b5b] p-3 xl:px-60 md:flex-row md:items-center lg:flex-row">
            <div className="flex items-center justify-between mb-4 gap-x-5 md:mb-0 w-full">
              <div className="flex flex-row gap-2">
                <div className="pr-2">
                  <a
                    href="/dashboard"
                    className="text-white uppercase font-semibold text-xl"
                  >
                    Skribe
                  </a>
                </div>
              </div>
              <ul
                role="Primary Navigation"
                aria-label="Main Navigation"
                className="flex gap-x-8 md:pb-0 lg:flex "
              >
                <li>
                  <a
                    href="/dashboard"
                    className="flex items-center text-white gap-x-1"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/mycrm"
                    className="flex items-center text-white gap-x-1"
                  >
                    MyCRM
                  </a>
                </li>

                <li>
                  <a
                    href="/campaign-manager"
                    className="flex items-center text-white gap-x-1"
                  >
                    Campaigns
                  </a>
                </li>
              </ul>
            </div>
          </header>

          <div className="mt-28 flex items-center justify-center">
            <div className="text-center">
              <span className="material-icons-outlined small-icon ml-auto text-[#002b5b]">
                info
              </span>
              <h2 className="mb-3 text-4xl font-semibold text-gray-600">
                Something went wrong
              </h2>
              <p className="text-md mb-4 text-xl text-gray-600">
                There was a problem processing the request. Please try again.
              </p>

              <a
                href="/dashboard"
                className="cursor-pointer bg-[#fac540] px-3 py-2 font-medium text-[#002b5b]"
              >
                Return to Home Page
              </a>
            </div>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
