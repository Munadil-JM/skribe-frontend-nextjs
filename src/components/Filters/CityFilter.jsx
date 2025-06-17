import { useEffect, useState } from "react";

const CityFilter = ({
  metroCity,
  name,
  fName,
  isSelected,
  setFlag,
  setTarget,
  isDispatch,
  setIsDispatch,
  toggle,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [hidden, setHidden] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (metroCity?.length > 0) {
      setData(metroCity);
    }
  }, [metroCity]);

  const clearButton = () => {
    setSearchInput("");
    setData(metroCity);
    setHidden(false);
  };

  const searchResult = (e, name) => {
    const { value: val } = e.target;
    let result = metroCity?.filter((curItem) =>
      curItem?.value?.toLowerCase().includes(val?.toLowerCase())
    );

    if (result?.length > 0) {
      setData(result);
      setHidden(true);
    } else {
      setData([{ value: `No ${name} Exist` }]);
    }
  };

  return (
    <div className="flex flex-col flex-wrap gap-y-0">
      <h3
        onClick={() => setisOpen((prev) => !prev)}
        className="mb-0 mt-1 flex cursor-pointer items-center justify-between text-sm font-bold leading-none text-[#6521AD]"
      >
        {fName}
        <span
          className={
            isOpen
              ? "material-icons-outlined transition-all "
              : "material-icons-outlined -rotate-90 transition-all"
          }
        >
          expand_more
        </span>
      </h3>
      <div style={{ display: `${isOpen ? "block" : "none"}` }}>
        <div className="bg-[#f1f1f1] p-3 pl-0">
          <div className="flex items-center rounded-md border border-gray-300 bg-white pl-2 xl:w-full  ">
            <span className="material-icons-outlined text-sm text-gray-300">
              search
            </span>
            <input
              type="text"
              name="city"
              value={searchInput}
              onChange={(e) => setSearchInput(e?.target?.value)}
              onKeyUp={(e) => searchResult(e, name)}
              className="w-full rounded-lg bg-white px-3 py-2 text-sm text-gray-400 focus:outline-none"
              placeholder="Search"
            />
            {searchInput?.length > 0 && (
              <span
                onClick={clearButton}
                className="material-icons-outlined icon-14 cursor-pointer pr-2 text-xs uppercase text-gray-700 hover:text-gray-900 hover:underline"
              >
                close
              </span>
            )}
          </div>
        </div>
        <ul style={{ display: `${isOpen ? "block" : "none"}` }}>
          {data?.length > 0 &&
            data.map((curItem, index) => {
              return (
                <>
                  <li key={index} className="flex w-full gap-x-2">
                    {curItem?.value === `No ${name} Exist` ? (
                      ""
                    ) : (
                      <input
                        type="checkbox"
                        checked={
                          isSelected?.length > 0 &&
                          isSelected(curItem?.id + " " + curItem?.value)
                        }
                        id={curItem?.value}
                        data-checked={name}
                        onChange={() => {}}
                        onClick={(event) => {
                          const { checked } = event.target.dataset;
                          if (isSelected?.length > 0 && isSelected(curItem?.id))
                            setFlag(-1);
                          else setFlag(1);
                          setTarget(checked);
                          setIsDispatch((prev) => !prev);
                          toggle(curItem?.id + " " + curItem?.value);
                        }}
                        className="peer/published  w-3 accent-[#318fff]"
                      />
                    )}
                    <label
                      htmlFor={curItem?.value}
                      className="text-md font-medium text-gray-400 "
                    >
                      {curItem?.value?.split(" ")?.map((word, index) => {
                        if (index === 0) {
                          if (
                            word === "CSR" ||
                            word === "BFSI" ||
                            word === "B2B"
                          ) {
                            return word;
                          } else {
                            return (
                              <span key={index}>
                                {word?.charAt(0)?.toUpperCase() +
                                  word?.slice(1).toLowerCase()}
                              </span>
                            );
                          }
                        } else {
                          return (
                            <span key={index}>
                              {" " +
                                word?.charAt(0)?.toUpperCase() +
                                word?.slice(1)?.toLowerCase()}
                            </span>
                          );
                        }
                      })}
                    </label>
                  </li>
                </>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default CityFilter;
