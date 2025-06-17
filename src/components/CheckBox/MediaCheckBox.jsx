import { useState } from "react";

const MediaCheckBox = ({ mediaid, mediaName, status, mediaFn }) => {
  const [isChecked, setIsChecked] = useState(status);
  return (
    <>
      <input
        className="peer/published w-4 accent-gray-600"
        type="checkbox"
        name={mediaName}
        id={mediaid}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label
        onClick={() => mediaFn(mediaid, isChecked)}
        htmlFor={mediaid}
        className="text-sm lowercase text-gray-500 first-letter:uppercase peer-checked/published:font-medium peer-checked/published:text-gray-500"
      >
        {mediaName}
      </label>
    </>
  );
};

export default MediaCheckBox;
