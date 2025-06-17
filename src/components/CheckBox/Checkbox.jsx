import { useState } from "react";

const Checkbox = ({ cityId, cityName, status, cityFun }) => {
  const [isChecked, setIsChecked] = useState(status);

  return (
    <>
      <input
        className="peer/published w-4 accent-gray-600"
        type="checkbox"
        name={cityName}
        id={cityId}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />

      <label
        onClick={() => cityFun(cityId, isChecked)}
        htmlFor={cityId}
        className="text-sm lowercase text-gray-500 first-letter:uppercase  peer-checked/published:font-medium peer-checked/published:text-gray-500"
      >
        {cityName}
      </label>
    </>
  );
};

export default Checkbox;
