"use client";

import { useState } from "react";

const PodcastTooltip = ({ title, content }) => {
  const [toolTip, setToolTip] = useState(false);

  return (
    <div className="relative">
      <span
        className="material-icons-outlined icon-16 cursor-pointer bg-transparent"
        onMouseEnter={() => setToolTip(true)}
        onMouseLeave={() => setToolTip(false)}
      >
        info
      </span>
      {toolTip && (
        <div className="tooltip absolute w-64 rounded-lg border z-50  bg-gray-200 p-3 text-sm text-gray-500">
          <h2 className="text-xs">{title}</h2>
          <p className="text-xs">{content}</p>
        </div>
      )}
    </div>
  );
};

export default PodcastTooltip;
