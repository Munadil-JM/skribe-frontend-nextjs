const CompetitorPostData = ({ postData, removeComp }) => {
  return (
    <>
      <div className="mt-3 flex flex-wrap gap-2">
        {postData.map((curItem) => {
          return (
            <span
              key={curItem.intCompetitorId}
              className="flex items-center border border-gray-600 pl-2 text-sm capitalize text-gray-600"
            >
              {curItem.vchCompetitor}
              <span
                className="material-icons-outlined custom-text close-icon-size ml-2 cursor-pointer p-1 hover:bg-slate-600 hover:text-white"
                onClick={() => removeComp(curItem.vchCompetitor)}
              >
                close
              </span>
            </span>
          );
        })}
      </div>
    </>
  );
};

export default CompetitorPostData;
