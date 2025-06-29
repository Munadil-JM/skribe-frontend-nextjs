const ErrorToast = ({ msg }) => {
  return (
    <>
      <div
        className="absolute left-1/4 top-20 rounded-md 
      bg-red-400 px-7 py-3 text-sm text-red-900"
      >
        {msg}
      </div>
    </>
  );
};

export default ErrorToast;
