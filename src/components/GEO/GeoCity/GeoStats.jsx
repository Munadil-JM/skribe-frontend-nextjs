import CityBreakDown from "./CityBreakDown";
// import userService from "../../../Services/user.service";

const GeoStats = ({ langCount, cityCount, geoStatData,outletResults,outCount }) => {

  return (
    <>
      <section className="flex flex-col gap-x-6 gap-y-6 md:flex-col lg:flex-row">
        {/* [STATS BREAKDOWN START] */}
        {geoStatData && (
          <div className="w-12/12 md:w-12/12 lg:w-4/12 xl:w-3/12 border border-gray-200 bg-gray-50 rounded-md p-6 flex items-center">
            <ul className="flex flex-col gap-y-5 self-center basis-full">
              <li className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <span className="material-icons-outlined text-xs text-purple-400 rounded-full bg-gray-200 p-1">
                    campaign
                  </span>
                  <span className="text-xl font-extrabold text-gray-800">
                    {outCount}
                  </span>
                </div>
                <p className="text-sm text-gray-400">Total Media</p>
              </li>
              <li className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <span className="material-icons-outlined text-xs text-purple-400 rounded-full bg-gray-200 p-1">
                    person
                  </span>
                  <span className="text-xl font-extrabold text-gray-800">
                    {geoStatData?.jourCount}
                  </span>
                </div>
                <p className="text-sm text-gray-400">Total Journalist</p>
              </li>
              <li className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <span className="material-icons-outlined text-xs text-purple-400 rounded-full bg-gray-200 p-1">
                    language
                  </span>
                  <span className="text-xl font-extrabold text-gray-800">
                    {geoStatData?.lanCount}
                  </span>
                </div>
                <p className="text-sm text-gray-400">Total Languages</p>
              </li>
            </ul>
          </div>
        )}
        {/* [/STATS BREAKDOWN END] */}
        {langCount && (
          <CityBreakDown data={langCount} type="PieChart" heading="Languages" />
        )}
        {cityCount && (
          <CityBreakDown
            data={cityCount}
            type="BarChart"
            heading="MediaDensity"
          />
        )}
      </section>
    </>
  );
};

export default GeoStats;
