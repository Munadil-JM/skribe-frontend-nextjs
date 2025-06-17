const Tooltip = ({ position, content, children }) => {
  return (
    <div id="tooltip" className="group relative cursor-pointer">
      {children}
      <span
        className={
          " inner-block invisible  absolute -left-0 top-10 whitespace-nowrap rounded bg-neutral-900 p-1 p-2 text-xs text-white opacity-0 transition group-hover:visible group-hover:opacity-100"
        }
      >
        {content}
      </span>
    </div>
  );
};

export default Tooltip;
