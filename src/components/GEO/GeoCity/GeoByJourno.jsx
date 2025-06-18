import GetFiltersData from "../../Filters/GetFiltersData";

const GeoByJourno = ({
  data,
  getToken,
  handleScroll,
  load,
  cityId,
  trackingId,
  selectedFilters,
  setSelectedFilters,
  // setSelectedJournalists,
  disabled,
  onCheckboxChange,
  selectedJournalists,
  // mediaFilter,
  // languageFilter,
  // outletFilter,
}) => {
  return (
    <>
      <section className="flex w-11/12 p-6 py-6 pt-0 pl-8 pr-0 mt-6 section gap-x-6">
        <aside className="flex-col hidden w-3/12 gap-6 md:flex md:w-7/12 lg:w-1/3">
          <fieldset className="self-start w-full px-3 border border-gray-300 rounded-xl ">
            <h3 className="p-3 text-gray-900 uppercase text-md">Filters</h3>
            <div className="w-full p-3">
              <GetFiltersData
                trackingId={trackingId}
                type="Media"
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                url={`GetMediaFilter?CityFilter=${cityId}`}
              />

              <GetFiltersData
                trackingId={trackingId}
                type="Language"
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                url={`GetLanguageFilter?CityFilter=${cityId}`}
              />
              <GetFiltersData
                trackingId={trackingId}
                type="Outlet"
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                url={`GetOutletFilter?CityFilter=${cityId}`}
              />
            </div>
          </fieldset>
        </aside>
        <div className="h-[600px] w-11/12 overflow-scroll overflow-x-hidden relative">
          <table
            className="border-collapse text-sm"
            cellPadding="15"
            cellSpacing="0"
          >
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-3 w-24 font-medium text-gray-700  text-left rounded-tl-xl">
                  S. No.
                </th>
                <th className="border border-gray-300 p-3 w-[550px] font-medium text-gray-700  text-left">
                  Name
                </th>
                <th className="border border-gray-300 p-3 w-52 font-medium pr-8 text-gray-700  text-left">
                  Outlet
                </th>
                <th className="border border-gray-300 p-3 w-96 font-medium pr-8 text-gray-700  text-left">
                  Designation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white  border border-gray-200 border-collapse">
              {data ? (
                data?.length > 0 ? (
                  data?.map((curElem, index) => {
                    return (
                      <tr key={index}>
                        <td className="border border-gray-300 p-3 text-slate-500">
                          {index + 1}
                        </td>
                        <td className="border border-gray-300 p-3 text-slate-500">
                          <div className="flex items-center gap-4 gap-x-2">
                            <input
                              type="checkbox"
                              name={curElem?.intJournalistId}
                              id={curElem?.intJournalistId}
                              className="peer/published  h-4 w-4 accent-[#318fff]"
                              value="abc"
                              disabled={disabled}
                              checked={selectedJournalists.includes(
                                curElem?.intJournalistId
                              )}
                              onChange={(e) =>
                                onCheckboxChange(
                                  e.target,
                                  curElem.intJournalistId
                                )
                              }
                            />
                            {curElem?.vchJournalistName}{" "}
                            {!!curElem?.crmStatus && (
                              <div className="px-1 text-center text-xs bg-green-600  font-medium text-white rounded-sm">
                                Added to CRM
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="border border-gray-300 p-3 text-slate-500">
                          {curElem.vchOutletName}
                        </td>
                        <td className="border border-gray-300 p-3 text-slate-500">
                          {curElem.vchJournoTitle}
                        </td>
                      </tr>
                    );
                  })
                ) : load ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Record Found
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Record Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {getToken && !disabled && (
            <div className="flex items-center justify-center">
              <span
                onClick={handleScroll}
                className="cursor-pointer mx-auto my-5 rounded-md bg-[#002b5b] px-3 py-2 text-sm font-normal text-[#fff] md:w-auto md:border-0"
              >
                Load more
              </span>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default GeoByJourno;
