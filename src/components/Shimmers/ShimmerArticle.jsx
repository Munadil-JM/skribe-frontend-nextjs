const ShimmerArticle = () => {
  return (
    <div className="max-w-full">
      {Array(3)
        .fill("")
        .map((e, index) => (
          <div className="record" key={index}>
            <div className="first">
              <div className="img"></div>
              <div className="dummy__name"></div>
              <div className="dummy__name1"></div>
            </div>
            <div className="second">
              <div className="dummy__name2"></div>
              <div className="dummy__name1"></div>
              <div className="dummy__name"></div>
              <div className="dummy__"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShimmerArticle;
