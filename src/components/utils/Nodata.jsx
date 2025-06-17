const Nodata = ({ height, topic }) => {
  return (
    <>
      <div
        className={`flex flex-col items-center justify-center text-customGray64 h-[${height}px]`}
      >
        <span className="text-sm text-customGray64 material-icons-outlined icon-50">
          sentiment_dissatisfied
        </span>
        <p>{`No data to display for ${topic}`}</p>
      </div>
    </>
  );
};

export default Nodata;
