const WarningToast = ({ msg }) => {
  return (
    <>
      <div
        className="absolute left-1/4 top-20 rounded-md 
      bg-orange-400  px-7 py-3 text-sm text-orange-900 "
      >
        {msg}
      </div>
    </>
  );
};

export default WarningToast;
