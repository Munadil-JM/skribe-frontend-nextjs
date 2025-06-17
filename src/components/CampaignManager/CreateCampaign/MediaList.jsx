import { useRouter } from "next/navigation";

const MediaList = ({
  selectedListId,
  campaignList,
  handleCheckboxChange,
  token,
  isLoading,
  handleScroll,
  listBreak,
}) => {
  const dateFun = (dates) => {
    const date = new Date(dates);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const router = useRouter();

  const redirect = () => {
    router.push("/journalist-search");
  };

  return (
    <section>
      {!isLoading && campaignList?.length === 0 && (
        <>
          <div className="border border-gray-300 p-6 rounded-md text-center my-3">
            <h2 className="text-gray-800 text-xl font-semibold p-0 m-0">
              Create a media list to send your pitch to
            </h2>
            <p className="text-gray-500 text-md pt-2 text-balance m-0">
              To kick-start your PITCH, either pick an existing media list or
              create a new list.
            </p>
            <button
              type="button"
              onClick={() => redirect()}
              className="flex justify-center mx-auto bg-[#002b5b] items-center gap-x-2 p-3 rounded-lg text-white w-full md:w-2/4 text-center text-xl font-medium mt-4"
            >
              <span className="material-icons-outlined">add</span>Create a new
              Media List
            </button>
          </div>
        </>
      )}
      {campaignList?.length > 0 && (
        <>
          <h3 className="m-0  mb-2">
            <span className="text-lg font-semibold text-gray-600 ">
              Step 1: Choose the list to PITCH
            </span>
            <span className="text-red-500 text-xl">*</span>
          </h3>
          {/* <p className="text-gray-400 text-sm mb-2">
            You can either use an existing list and add to this or SKIP or Step
            2 and create a new list.
          </p> */}
          <div className="flex my-4 gap-6 md:my-0 flex-col md:flex-col lg:flex-row border border-gray-300 p-3 rounded-md bg-gray-50">
            <div
              className={` border border-gray-300 rounded-lg max-h-36 xl:overflow-x-hidden overflow-scroll overflow-x-scroll ${
                selectedListId !== null ? "lg:w-3/4" : "w-full"
              }`}
            >
              <table
                className="table-fixed w-full"
                cellPadding="0"
                cellSpacing="0"
              >
                <thead className="sticky top-0 bg-gray-200">
                  <tr>
                    <th className="text-gray-700 text-left text-xs p-2 w-14 font-medium hidden">
                      Select
                    </th>
                    <th className="text-gray-700 text-left p-2  text-xs w-28 font-medium">
                      Date
                    </th>
                    <th className="text-gray-700 text-left p-2  text-xs w-52 font-medium">
                      List Name
                    </th>
                    <th className="text-gray-700 text-left p-2  text-xs w-44 font-medium">
                      Description
                    </th>
                    <th className="text-gray-700 text-left p-2  text-xs w-24 font-medium">
                      Journalists
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {campaignList
                    ?.sort((a, b) =>
                      selectedListId === a.listId
                        ? -1
                        : selectedListId === b.listId
                          ? 1
                          : 0
                    )
                    .map((curElem, ind) => (
                      <tr
                        key={ind}
                        className={`border-b border-gray-300  cursor-pointer ${
                          selectedListId === curElem.listId
                            ? " font-medium text-gray-900 bg-gray-100"
                            : "bg-white"
                        }`}
                        onClick={() => handleCheckboxChange(curElem.listId)} // Handle row click
                      >
                        <td className="align-top p-2 hidden">
                          <input
                            type="checkbox"
                            className="peer/published w-4 h-4 accent-[#FF3EA5]"
                            checked={selectedListId === curElem.listId}
                            onChange={() =>
                              handleCheckboxChange(curElem.listId)
                            }
                            disabled={
                              selectedListId !== null &&
                              selectedListId !== curElem.listId
                            }
                          />
                        </td>
                        <td className="text-gray-500 align-top p-2  text-sm">
                          {dateFun(curElem?.date)}
                        </td>
                        <td className="text-gray-500 align-top p-2  text-sm">
                          {curElem?.listName
                            ? curElem.listName.charAt(0).toUpperCase() +
                              curElem.listName.slice(1).toLowerCase()
                            : ""}
                        </td>
                        <td className="text-gray-500 align-top p-2  text-sm">
                          {curElem?.description
                            ? curElem.description.charAt(0).toUpperCase() +
                              curElem.description.slice(1).toLowerCase()
                            : ""}
                        </td>
                        <td className="text-gray-500 align-top p-2  text-sm">
                          {curElem?.count}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div>
                {token && (
                  <div className="flex items-center">
                    {isLoading ? (
                      <span className="mx-auto my-5 rounded-md bg-gray-500 px-3 py-2 text-sm font-normal text-white  md:w-auto md:border-0">
                        Loading...
                      </span>
                    ) : (
                      <span
                        onClick={() => handleScroll()}
                        className="cursor-pointer  mx-auto my-5 rounded-md bg-[#002b5b] px-3 py-2 text-sm font-normal text-white md:w-auto md:border-0"
                      >
                        Load more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* {isLoading && <p className="p-4">Loading...</p>} */}
            {selectedListId !== null && (
              <div className="flex flex-col gap-x-4 w-full lg:w-2/4">
                <h3 className="text-xs font-medium text-gray-700 mt-2 mb-2">
                  Selected List Details
                </h3>
                <ul className="flex w-full flex-wrap gap-x-3">
                  <li className="flex-grow flex flex-col bg-gray-100 border border-gray-300 rounded-md p-3 justify-center">
                    <span className="text-2xl text-[#002b5b] font-bold text-center">
                      {listBreak?.outletCount ? listBreak?.outletCount : "0"}
                    </span>
                    <span className="text-gray-700 text-center text-xs">
                      Outlets
                    </span>
                  </li>

                  <li className="flex-grow flex flex-col bg-gray-100 border border-gray-300 rounded-md p-3  justify-center">
                    <span className="text-2xl text-[#002b5b] font-bold text-center">
                      {listBreak?.locationCount
                        ? listBreak?.locationCount
                        : "0"}
                    </span>
                    <span className="text-gray-700 text-center  text-xs">
                      Locations
                    </span>
                  </li>

                  <li className="flex-grow flex flex-col bg-gray-100 border border-gray-300 rounded-md p-3  justify-center">
                    <span className="text-2xl text-[#002b5b] font-bold text-center">
                      {listBreak?.count ? listBreak?.count : "0"}
                    </span>
                    <span className="text-gray-700 text-center  text-xs">
                      Journalists
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default MediaList;
