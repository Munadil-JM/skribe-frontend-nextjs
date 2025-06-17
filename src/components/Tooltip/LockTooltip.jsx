import { useState } from "react";

const LockTooltip = ({
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
        className={`absolute material-icons-outlined bg-white cursor-pointer ${left} ${top}`}
        onMouseEnter={() => setToolTip(true)}
        onMouseLeave={() => setToolTip(false)}
        style={{ fontSize: "18px" }}
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

export default LockTooltip;
