import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { prevData } from "../../Redux/Action/Settings";

const BeatSearch = ({ query, getBeat, filter, allArticle, setFilterData }) => {
  const [activeInput, setActiveInput] = useState(true);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const dispatch = useDispatch();

  useEffect(() => {
    if (dateRange[1] !== null) {
      getDates(dateRange);
    }
  }, [dateRange]);

  const getDates = (val) => {
    let currentDate = new Date();
    if (val[0] >= currentDate && val[1] >= currentDate) {
      alert("End Date should not be more than current Date");
    } else {
      dispatch(prevData("CUSTOM_RANGE", val));
    }
  };

  const customData = (value) => {
    if (value === "CUSTOM_RANGE") {
      setActiveInput(false);
    } else {
      setActiveInput(true);
      dispatch(prevData(value));
    }
  };
  return (
    <header className="flex flex-col justify-end gap-x-3 gap-y-3 border-b border-gray-200 pb-4 md:flex-row">
      <div className="flex items-center  rounded-lg border border-gray-200 bg-white pl-2  xl:w-[320px] ">
        <span className="material-icons-outlined text-sm text-gray-300">
          search
        </span>
        <input
          type="text"
          name="jitender"
          value={getBeat}
          className="w-full rounded-lg p-3 px-3 text-sm text-gray-600 focus:outline-none"
          placeholder="Search by title or journalist name"
          onChange={(e) => {
            query(e.target);
            const data = filter(getBeat, allArticle);
            setFilterData(data);
          }}
        />
      </div>
      <select
        className="rounded-lg border border-gray-200 p-3 text-sm text-gray-400 focus:outline-0"
        onChange={(e) => customData(e.target.value)}
      >
        <option value="SELECT_ALL">Select All</option>
        <option value="LAST_DAY">Past 24 Hours</option>
        <option value="PAST_WEEK">Past Week</option>
        <option value="PAST_MONTH">Past Month</option>
        <option value="PAST_YEAR">Past Year</option>
        <option value="CUSTOM_RANGE">Custom Range</option>
      </select>
      <div className="w-full md:w-[218px]">
        <DatePicker
          disabled={activeInput}
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
          }}
          isClearable={true}
          className={
            activeInput
              ? "w-full rounded-lg border border-gray-200 bg-gray-100 p-3 text-sm text-gray-400 focus:outline-0 md:w-56"
              : "w-full rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-400 focus:outline-0 md:w-56"
          }
        />
      </div>
    </header>
  );
};

export default BeatSearch;
