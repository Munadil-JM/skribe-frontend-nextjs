import noUser from "../assets/noUser.png";

const ShimmerCrmTile = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {Array(10)
        .fill("")
        .map((e, index) => (
          <div
            className="w-60 rounded-lg border border-gray-300 p-3 py-6"
            key={index}
          >
            <div className="relative mb-3 flex flex-1 flex-col items-center">
              <div className="text-md flex flex-col items-center pt-2 leading-4 text-gray-900">
                <div className="line-clamp-2 overflow-hidden text-center">
                  <img
                    src={noUser.src}
                    alt=""
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-x-1 text-gray-400">
              <div className="second">
                <div className="dummy__name2 m-auto"></div>
                <div className="dummy__name1 m-auto"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default ShimmerCrmTile;
