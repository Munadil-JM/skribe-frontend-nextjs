"use client";

import { useEffect, useState } from "react";
import userService from "../../../Services/user.service";
import { GETALLJOURNO } from "../../../constants";
import OutletJouranlists from "./OutletJouranlists";
import GetFiltersData from "../../Filters/GetFiltersData";
import Link from "next/link";

const MediaRank = ({
  data,
  load,
  loadMore,
  geoToken,
  cityId,
  trackingId,
  selectedFilters,
  setSelectedFilters,
  mediaFilter,
  languageFilter,
  outletFilter,
}) => {

  const [byJournalist, setbyJournalist] = useState([]);
  const [getToken, setGetToken] = useState("");
  const [totalResults, setTotalResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [outletId, setOutletId] = useState({});
  // const { cityId } = useParams();
  //outlet journalist loading
  const [open, setOpen] = useState(false);

  let getJour = `${GETALLJOURNO}`;

  const outletJournalist = async (id, Name, token = null) => {
    getJour = `${getJour}?OutletFilter=${id}&IsFilter=false&CityFilter=${cityId}`;
    if (token) {
      getJour = `${getJour}&${token}`;
    }
    setLoading(true);
    try {
      const url4 = getJour;

      const [response4] = await Promise.all([userService.get(url4)]);
      if (response4?.response?.status === "Ok") {
        setbyJournalist((old) => [...old, ...response4?.data]);
        setGetToken(response4?.nextpagetoken?.token);
        setTotalResults(response4?.nextpagetoken?.totalResult);
        setOutletId({
          id,
          outletName: Name,
          totalResults: response4?.nextpagetoken?.totalResult,
          token: response4?.nextpagetoken?.token,
        });
        setOpen(true);
      }
    } catch (error) {
      console.log(error, "check error");
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (getToken) {
      let token = "token=" + encodeURIComponent(getToken);
      outletJournalist(outletId.id, outletId.outletName, token);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);
  const closePopup = () => {
    setOpen(false);
    setbyJournalist([]);
  };

  return (
    <>
      {open && (
        <OutletJouranlists
          outletId={outletId}
          loading={loading}
          data={byJournalist}
          open={open}
          onClose={closePopup}
          handleScroll={handleScroll}
          setbyJournalist={setbyJournalist}
        />
      )}
      <section className="w-11/12 p-6 py-6 pt-0 pl-8 pr-0 section mt-6 flex gap-x-6">
        <aside className="hidden w-3/12 flex-col gap-6 md:flex md:w-7/12 lg:w-1/3">
          <fieldset className="w-full self-start rounded-xl border border-gray-300 px-3 ">
            <h3 className="p-3 text-gray-900 uppercase text-md">Filters</h3>
            <div className="w-full p-3">
              <>
                <GetFiltersData
                  type="Media"
                  trackingId={trackingId}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  geoData={mediaFilter}
                  url="staticData"
                />
                <GetFiltersData
                  type="Language"
                  trackingId={trackingId}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  geoData={languageFilter}
                  url="staticData"
                />
                <GetFiltersData
                  type="Outlet"
                  trackingId={trackingId}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  geoData={outletFilter}
                  url="staticData"
                />
              </>
            </div>
          </fieldset>
        </aside>
        <article className="flex w-full flex-col flex-wrap self-start">
          <div className="h-[500px] overflow-scroll overflow-x-hidden relative">
            <table
              className="border-collapse text-sm"
              cellPadding="15"
              cellSpacing="0"
            >
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="border border-gray-300 p-3 w-24 font-medium text-gray-700 text-left rounded-tl-xl">
                    Rank
                  </th>
                  <th className="border border-gray-300 p-3 w-[550px] font-medium text-gray-700 text-left">
                    Outlet
                  </th>
                  <th className="border border-gray-300 p-3 w-52 font-medium pr-8 text-gray-700 text-left">
                    Circulation
                  </th>
                  <th className="border border-gray-300 p-3 w-48 font-medium pr-8 text-gray-700 text-left">
                    Editions
                  </th>
                  <th className="border border-gray-300 p-3 w-48 font-medium pr-8 text-gray-700 text-left rounded-tr-xl">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white border border-gray-200 border-collapse">
                {data ? (
                  data?.length > 0 ? (
                    data?.map((curElem, index) => {
                      return (
                        <tr key={index}>
                          <td className="border border-gray-300 p-3 text-slate-500">
                            {curElem.serialNo}
                          </td>
                          <td className="border border-gray-300 p-3 text-slate-500">
                            {curElem.vchOutletName}
                          </td>
                          <td className="border border-gray-300 p-3 text-slate-500">
                            {curElem.bintCirculationFig || 0}
                          </td>
                          <td className="border border-gray-300 p-3 text-slate-500">
                            {curElem.edition}
                          </td>
                          <td className="border border-gray-300 p-3 text-slate-500">
                            <span
                              onClick={() =>
                                outletJournalist(
                                  curElem.bintOutletId,
                                  curElem.vchOutletName
                                )
                              }
                              className="border border-[#002b5b] text-[#002b5b] px-3 py-1 text-xs cursor-pointer rounded-md hover:bg-[#002b5b] hover:text-white"
                            >
                              Preview
                            </span>
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
            {geoToken && (
              <div className="flex items-center">
                {load ? (
                  <span className="mx-auto my-5 rounded-md bg-gray-500 px-3 py-2 text-sm font-normal text-white  md:w-auto md:border-0">
                    Loading...
                  </span>
                ) : (
                  <Link
                    href="#"
                    onClick={() => loadMore()}
                    className="mx-auto my-5 rounded-md bg-[#002b5b] px-3 py-2 text-sm font-normal text-white  md:w-auto md:border-0"
                  >
                    Load more
                  </Link>
                )}
              </div>
            )}
          </div>
        </article>
      </section>
    </>
  );
};

export default MediaRank;
