import { RotatingLines } from "react-loader-spinner";

const Spinner = (props) => {
  // alert(props.status)

  return (
    <RotatingLines
      visible={props.status}
      height="50"
      width="50"
      strokeWidth="5"
      strokeColor="gray"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default Spinner;
