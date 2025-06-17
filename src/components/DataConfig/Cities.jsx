const Cities = ({ cities, parent, index, fn }) => {
  const checkedStore = (value) => {
    let arr = cities.map((element) => {
      if (element.cityName === value) {
        if (element.status === false) {
          return {
            ...element,
            status: true,
          };
        } else {
          return {
            ...element,
            status: false,
          };
        }
      } else return element;
    });
    return arr;
  };

  return (
    <ul className="flex flex-col md:flex-row gap-y-3 flex-wrap ml-8 border-t border-gray-300 mt-2 pt-3">
      {cities &&
        cities.map((elem) => {
          return (
            <>
              <li className="flex gap-x-4 w-1/3">
                <input
                  className="accent-gray-600 w-4 peer/published"
                  type="checkbox"
                  name={elem.cityName}
                  checked={elem.status}
                  id={elem.cityName}
                  onChange={(event) => {
                    let arr = checkedStore(event.target.name);
                    let allCities = { ...parent, cities: arr };
                    fn(index, allCities);
                  }}
                  //onClick={(event) => checkedStore(event.target.value)}
                />
                <label
                  htmlFor={elem.cityName}
                  className="peer-checked/published:text-gray-500 peer-checked/published:font-medium text-sm text-gray-500 lowercase first-letter:uppercase"
                >
                  {elem.cityName}
                </label>
              </li>
            </>
          );
        })}
    </ul>
  );
};

export default Cities;
