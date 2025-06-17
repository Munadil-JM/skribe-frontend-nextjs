import Link from "next/link";

const SetBrand = () => {
  return (
    <>
      <div className="px-8 py-4 xl:w-11/12 w-12/12 xl:pl-8 section flex items-center justify-between">
        <div className="flex flex-col mt-0 ml-4">
          <ul className="flex items-center text-sm text-gray-400 gap-x-1">
            <li className="flex items-center">
              Home
              <span className="items-center text-gray-400 material-icons-outlined b-font">
                navigate_next
              </span>
            </li>
            <li className="flex items-center">Analytics</li>
          </ul>
        </div>
      </div>
      <hr className="mb-4" />
      <div className="px-8 pb-6 xl:w-11/12 w-12/12 xl:pl-8 section bg-gray-[#F8F9FC] min-h-[500px]">
        <h3 className="font-bold text-3xl">
          Set the Keywords
          <span className="text-gray-400 font-medium pl-2 text-xl">
            (Date will be tracked from next day)
          </span>
        </h3>
        <div>
          <div className="lg:block hidden">
            <span class="icon-align text-gray-400 material-icons-outlined -z-10">
              analytics
            </span>
          </div>
          <div>
            <form class="w-12/12  mt-14 lg:mt-24">
              <div class="lg:flex lg:items-center mb-6 gap-x-16 w-full">
                <div class="w-12/12  lg:w-4/12  self-start pt-1">
                  <label class="block text-gray-700 font-bold md:text-left mb-1 md:mb-0 pr-4 lg:text-3xl  text-2xl xl:text-right">
                    Enter Brand Name :
                  </label>
                </div>
                <div class="w-12/12 lg:w-5/12">
                  <input
                    type="text"
                    class="bg-white rounded w-full lg:w-12/12 text-lg py-2 px-4 h-12 border border-gray-300 text-gray-700 focus:outline-none focus:bg-white"
                    id="inline-full-name"
                    placeholder="You can upto 1 Brand"
                  />
                  <ul className="flex  gap-x-3 gap-y-3 mt-3 flex-wrap">
                    <li className="border  bg-white border-gray-300 text-gray-600 px-2 py-1 rounded-lg flex items-center">
                      Book My Show
                      <Link href="#">
                        <span className="material-icons-outlined bg-gray-500 icon-14 p-1 text-white rounded-full ml-2">
                          close
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="lg:flex lg:items-center mb-6 gap-x-16 w-full">
                <div class="w-12/12  lg:w-4/12  self-start pt-1">
                  <label class="block text-gray-700 font-bold md:text-left mb-1 md:mb-0 pr-4 lg:text-3xl  text-2xl xl:text-right">
                    Enter Brand Keyboards :
                  </label>
                </div>
                <div class="w-12/12  lg:w-5/12">
                  <input
                    type="text"
                    class="bg-white rounded w-full lg:w-12/12 text-lg py-2 px-4 h-12 border border-gray-300 text-gray-700 focus:outline-none focus:bg-white"
                    id="inline-full-name"
                    placeholder="Write upto 5 keywords"
                  />
                  <ul className="flex  gap-x-3 gap-y-3 mt-3 flex-wrap">
                    <li className="border  bg-white border-gray-300 text-gray-600 px-2 py-1 rounded-lg flex items-center">
                      Book My Show
                      <Link href="#">
                        <span className="material-icons-outlined bg-gray-500 icon-14 p-1 text-white rounded-full ml-2">
                          close
                        </span>
                      </Link>
                    </li>
                    <li className="border bg-white border-gray-300 text-gray-600 px-2 py-1 rounded-lg flex items-center">
                      BMS
                      <Link href="#">
                        <span className="material-icons-outlined bg-gray-500 icon-14 p-1 text-white rounded-full ml-2">
                          close
                        </span>
                      </Link>
                    </li>
                    <li className="border bg-white border-gray-300 text-gray-600 px-2 py-1 rounded-lg flex items-center">
                      Tickets
                      <Link href="#">
                        <span className="material-icons-outlined bg-gray-500 icon-14 p-1 text-white rounded-full ml-2">
                          close
                        </span>
                      </Link>
                    </li>
                    <li className="border bg-white border-gray-300 text-gray-600 px-2 py-1 rounded-lg flex items-center">
                      Events
                      <Link href="#">
                        <span className="material-icons-outlined bg-gray-500 icon-14 p-1 text-white rounded-full ml-2">
                          close
                        </span>
                      </Link>
                    </li>
                    <li className="border bg-white border-gray-300 text-gray-600 px-2 py-1 rounded-lg flex items-center">
                      Movies
                      <Link href="#">
                        <span className="material-icons-outlined bg-gray-500 icon-14 p-1 text-white rounded-full ml-2">
                          close
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="lg:flex lg:items-center mb-6 gap-x-16 mt-6 w-full">
                <div class="w-12/12  lg:w-4/12 self-start pt-2">
                  <label class="block text-gray-700 font-bold md:text-left mb-1 md:mb-0 pr-4 lg:text-3xl  text-2xl xl:text-right">
                    Enter Competitors Keyboards :
                  </label>
                </div>
                <div class="w-12/12  lg:w-4/12">
                  <ul className="flex  gap-x-3 mt-3 flex-wrap items-center">
                    <li className="border border-[#FF3EA5] bg-[#FF3EA5] text-white px-2 py-2 rounded-lg flex items-center">
                      Paytm Insider
                      <Link href="#">
                        <span className="material-icons-outlined bg-white icon-14 p-1 text-[#FF3EA5] rounded-full ml-4">
                          close
                        </span>
                      </Link>
                    </li>
                    <li className="text-xl text-gray-400">
                      Add 1 keywords more
                    </li>
                  </ul>
                  <ul className="flex  gap-x-3 gap-y-3 mt-3 flex-wrap">
                    <li className="border bg-white border-gray-300 text-gray-600 px-2 py-1 rounded-lg flex items-center">
                      Paytm
                      <Link href="#">
                        <span className="material-icons-outlined bg-gray-500 icon-14 p-1 text-white rounded-full ml-2">
                          close
                        </span>
                      </Link>
                    </li>
                    <li className="border bg-white border-gray-300 text-gray-600 px-2 py-1 rounded-lg flex items-center">
                      Insider
                      <Link href="#">
                        <span className="material-icons-outlined bg-gray-500 icon-14 p-1 text-white rounded-full ml-2">
                          close
                        </span>
                      </Link>
                    </li>
                    <li className="border bg-white border-gray-300 text-gray-600 px-2 py-1 rounded-lg flex items-center">
                      PaytmEvents
                      <Link href="#">
                        <span className="material-icons-outlined bg-gray-500 icon-14 p-1 text-white rounded-full ml-2">
                          close
                        </span>
                      </Link>
                    </li>
                    <li className="border bg-white border-gray-300 text-gray-600 px-2 py-1 rounded-lg flex items-center">
                      PaytmMusic
                      <Link href="#">
                        <span className="material-icons-outlined bg-gray-500 icon-14 p-1 text-white rounded-full ml-2">
                          close
                        </span>
                      </Link>
                    </li>
                  </ul>

                  <ul className="flex mt-8  gap-x-3 flex-wrap items-center">
                    <li className="hover:text-gray-500 rounded-lg flex items-center text-xl font-bold text-gray-800">
                      <Link href="#" className="flex items-center">
                        <span className="material-icons-outlined icon-24  mr-2">
                          add
                        </span>
                        Add More Competitor
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="lg:flex lg:items-center mb-6 gap-x-16 w-full">
                <div class="w-12/12  lg:w-4/12  self-start pt-1">
                  <label class="block text-gray-700 font-bold md:text-left mb-1 md:mb-0 pr-4 lg:text-3xl  text-2xl xl:text-right">
                    Enter Spokesperson :
                  </label>
                </div>
                <div class="w-12/12 lg:w-5/12">
                  <input
                    type="text"
                    class="bg-white rounded w-full lg:w-12/12 text-lg py-2 px-4 h-12 border border-gray-300 text-gray-700 focus:outline-none focus:bg-white"
                    id="inline-full-name"
                    placeholder="You can add upto 3 spokes person"
                  />
                  <ul className="flex  gap-x-3 gap-y-3 mt-3 flex-wrap">
                    <li className="border  bg-white border-gray-300 text-gray-600 px-2 py-1 rounded-lg flex items-center">
                      Rajesh Kumar
                      <Link href="#">
                        <span className="material-icons-outlined bg-gray-500 icon-14 p-1 text-white rounded-full ml-2">
                          close
                        </span>
                      </Link>
                    </li>
                    <li className="border  bg-white border-gray-300 text-gray-600 px-2 py-1 rounded-lg flex items-center">
                      Jaspreet Singh
                      <Link href="#">
                        <span className="material-icons-outlined bg-gray-500 icon-14 p-1 text-white rounded-full ml-2">
                          close
                        </span>
                      </Link>
                    </li>
                    <li className="border  bg-white border-gray-300 text-gray-600 px-2 py-1 rounded-lg flex items-center">
                      Amit Singh
                      <Link href="#">
                        <span className="material-icons-outlined bg-gray-500 icon-14 p-1 text-white rounded-full ml-2">
                          close
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </form>
            <div class="md:flex flex-col lg:flex-row lg:gap-24 ">
              <div class="md:w-1/3"></div>
              <div class="md:w-2/3">
                <button
                  class="shadow border border-[#FF3EA5] bg-[#FF3EA5] hover:bg-[#d92d89] text-white font-bold px-9 py-3 rounded-lg flex items-center cursor-pointer focus:outline-none"
                  type="button"
                >
                  Show Results
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetBrand;
