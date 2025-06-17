import { useState } from "react";

const HeaderLock = ({
  title,
  content,
  left,
  top,
  leftPosition,
  topPosititon,
}) => {
  const [toolTip, setToolTip] = useState(false);
  return (
    <>
      <span
        className={`material-icons-outlined icon-16 cursor-pointer text-[#eab621] ${left} ${top}`}
        onMouseEnter={() => setToolTip(true)}
        onMouseLeave={() => setToolTip(false)}
      >
        lock
      </span>
      {toolTip && (
        <div
          className={`tooltip-lock absolute w-32 rounded-lg z-50  bg-gray-900 p-3 text-sm text-white ${leftPosition} ${topPosititon}`}
        >
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
      )}
    </>
  );
};

export default HeaderLock;
