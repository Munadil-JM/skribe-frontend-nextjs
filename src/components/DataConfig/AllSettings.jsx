import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ConfigTabs from "./ConfigTabs";
import { Outlet } from "react-router-dom";
import { selectGeo } from "../../Redux/Action/AllUserSettings";
import { useAllGeo, useSelected } from "../utils/useAllGeo";
// import { useAllBeat } from "../utils/useAllBeat";

const AllSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useAllGeo();
  const { selectLocation, isLoadingSelected } = useSelected();
  //const { mediaData, isLoadingMedia } = useAllMedia();
  // const { mediaBeat, isLoadingBeat } = useAllBeat();

  if (!isLoadingSelected && !isLoading) {
    dispatch(selectGeo(selectLocation));
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <section
        className="sticky bottom-1 left-0 top-[64px] z-10 flex gap-x-8 bg-white"
        style={{ borderBottom: "1px solid rgb(209 213 219)" }}
      >
        <div className="section flex w-11/12 gap-x-6">
          <div className="hidden w-4/12 pl-8 md:flex md:w-7/12 lg:w-1/3">
            <span
              onClick={() => goBack()}
              className=" flex w-28 cursor-pointer items-center text-sm font-normal text-gray-500 hover:border-gray-400 hover:text-gray-800"
            >
              <span className="material-icons-outlined icon-16">
                arrow_back_ios_new
              </span>
              Go Back
            </span>
          </div>
          <div className="flex w-full flex-col flex-wrap gap-6 self-start">
            <div className="flex flex-wrap items-center justify-between bg-white p-3 pr-0">
              <ul className="flex items-center gap-x-1 text-sm text-gray-400">
                <li className="flex items-center">
                  Home
                  <span className="material-icons-outlined b-font text-gray-400">
                    navigate_next
                  </span>
                </li>
                <li className="flex items-center">Data Preferences</li>
              </ul>
              {/* <h2 className="text-sm font-medium text-gray-600">
                All Journalists */}
              {/* {isdata?.total} */}
              {/* </h2> */}
              <div className="relative flex gap-x-3">
                <span>
                  <Link
                    to="customcrm"
                    className="flex flex-col rounded-md border-[#38185a] px-1 py-1 text-sm font-normal text-[#38185a]  md:border md:px-4 md:py-1"
                  >
                    Configure Your CRM
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section w-11/12 p-6 py-6 pl-8 pr-0">
        <div className="flex flex-col gap-8 pt-8 md:flex-row ">
          <ConfigTabs />
          <Outlet />
        </div>
      </section>

      {/* <div className="flex flex-1">
        <section className="min-w-5xl container items-start rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <h2 className="flex-1 border-b border-gray-300 pb-4">
            Please Select State
          </h2> */}
      {/* {!isLoading && !isLoadingSelected && (
            <AllState geoData={data} selectedGeo={selectLocation} />
          )} */}

      {/* <AllMedia allMediaData={mediaData} selectMedia={userMediaPrefs} /> */}

      {/* <h2 className="flex-1 border-b border-gray-300 pb-4">
            Please Select Beat,
          </h2>
          <AllBeat allBeatData={mediaBeat} selectedBeat={selectedBeat} />

          <AllCompetitors />
        </section>
      </div> */}
    </>
  );
};

export default AllSettings;
