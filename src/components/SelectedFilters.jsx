const SelectedFilters = ({ selectedFilters, setSelectedFilters }) => {
  const removeSelected = (type, curElem) => {
    // Update selectedFilters based on checkbox change
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      // Add or remove the value based on checkbox state
      if (updatedFilters[type].includes(curElem)) {
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== curElem
        ); // Remove value
      }

      // Remove the key if the array is empty
      if (updatedFilters[type].length === 0) {
        delete updatedFilters[type];
      }

      // Optionally, update count or any other properties
      updatedFilters.count = Object.keys(updatedFilters).reduce(
        (total, key) => {
          if (Array.isArray(updatedFilters[key])) {
            return total + updatedFilters[key].length;
          }
          return total;
        },
        0
      );

      return updatedFilters;
    });
  };
  return (
    <>
      {Object.keys(selectedFilters)?.length > 1 && (
        <div className="section w-12/12 pr-0 px-4 pt-4">
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap  items-center rounded-md px-2">
              {Object.keys(selectedFilters).map((key, index) => (
                <div
                  key={index}
                  className="flex items-center flex-wrap text-sm"
                >
                  {key != "count" && key + ":"}
                  {selectedFilters[key]?.length > 0 &&
                    selectedFilters[key]?.map((curItem, ind) => {
                      return (
                        <div key={ind}>
                          <div className="m-1 flex items-center rounded-md border border-gray-400 px-2 ">
                            {curItem.split(" ").map((curElem, index) => {
                              if (index !== 0) {
                                return (
                                  <span key={index} className="text-gray-600">
                                    {curElem.slice(0, 1).toUpperCase() +
                                      curElem.slice(1).toLowerCase()}
                                    &nbsp;
                                  </span>
                                );
                              }
                            })}{" "}
                            <span
                              onClick={() => removeSelected(key, curItem)}
                              className="material-icons-outlined icon-16 cursor-pointer rounded-full pl-1 text-gray-400 hover:text-gray-800"
                            >
                              close
                            </span>{" "}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedFilters;
