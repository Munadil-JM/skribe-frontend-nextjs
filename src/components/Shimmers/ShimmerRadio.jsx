const ShimmerRadio = () => {
  return (
    <div className="max-w-full">
      {Array(10)
        .fill("")
        .map((e, index) => (
          <div className="record" key={index}>
            <div className="second">
              <div className="dummy__name2"></div>
              <div className="dummy__name1"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShimmerRadio;
