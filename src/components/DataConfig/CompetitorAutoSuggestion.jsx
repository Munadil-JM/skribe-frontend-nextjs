const CompetitorAutoSuggestion = ({ suggestion, sortData, comp, ref }) => {
  return (
    <>
      {/* SUGGESTION BOX START */}
      {suggestion && (
        <div
          className="absolute top-9 max-h-44 w-full overflow-y-auto border  border-gray-300 bg-white text-sm lg:w-1/3"
          ref={ref}
        >
          <ul>
            {sortData.length > 0 &&
              sortData.map((curItem) => {
                return (
                  <>
                    <li
                      key={curItem.intCompetitorId}
                      className="text-sm lowercase text-gray-500 first-letter:uppercase"
                    >
                      <span
                        className="block p-1 pl-2 hover:bg-gray-200"
                        onClick={() =>
                          comp(curItem.intCompetitorId, curItem.vchCompetitor)
                        }
                      >
                        {curItem.vchCompetitor}
                      </span>
                    </li>
                  </>
                );
              })}
          </ul>
        </div>
      )}
      {/* SUGGESTION BOX END */}
    </>
  );
};

export default CompetitorAutoSuggestion;
