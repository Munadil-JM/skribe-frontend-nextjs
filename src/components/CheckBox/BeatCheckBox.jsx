import { useState } from "react";

const BeatCheckBox = ({ beatid, beatName, status, beatFn }) => {
  const [isChecked, setIsChecked] = useState(status);
  return (
    <>
      <input
        className="peer/published n w-4 accent-gray-600"
        type="checkbox"
        name={beatName}
        id={beatid}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label
        onClick={() => beatFn(beatid, isChecked)}
        htmlFor={beatid}
        className="text-sm lowercase text-gray-500 first-letter:uppercase peer-checked/published:font-medium peer-checked/published:text-gray-500"
      >
        {beatName}
      </label>
    </>
  );
};

export default BeatCheckBox;
