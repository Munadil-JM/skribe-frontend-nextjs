const SuccessToast = ({ msg }) => {
  return (
    <>
      <div
        className="absolute left-1/4 top-20 
      rounded-md bg-green-400 px-7 py-3 text-sm text-green-800"
      >
        {msg}
      </div>
    </>
  );
};

export default SuccessToast;
