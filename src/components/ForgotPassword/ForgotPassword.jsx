"use client";

import { useState } from "react";
import Link from "next/link";
//import { useDispatch, useSelector } from "react-redux";
// import ErrorToast from "../utils/ErrorToast";
// import SuccessToast from "../utils/SuccessToast";
// import WarningToast from "../utils/WarningToast";
// import { ErrorAlert } from "../../Redux/Action/Settings";
import { FORGOTTOKEN, RESETPASSWORD } from "../../constants";
import userService from "../../Services/user.service";

const ForgotPassword = () => {
  const [pass, setPass] = useState("");
  // const [warningactive, warningSetActive] = useState(false);
  // const [erroractive, errorSetActive] = useState(false);
  // const [successactive, successSetActive] = useState(false);
  // const disptach = useDispatch();
  // const pInvalid = useSelector((state) => state.passInvalid);
  // const { errorAlert, warningAlert, successAlert } = useSelector(
  //   (state) => state.settings
  // );
  // console.log(warningAlert.msg, "warning alert");
  // useEffect(() => {
  //   let timeout = setTimeout(() => {
  //     warningSetActive(false);
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timeout);
  //     warningSetActive(true);
  //   };
  // }, [warningAlert.trigger]);

  // useEffect(() => {
  //   let timeout = setTimeout(() => {
  //     errorSetActive(false);
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timeout);
  //     errorSetActive(true);
  //   };
  // }, [errorAlert.trigger]);

  // useEffect(() => {
  //   let timeout = setTimeout(() => {
  //     successSetActive(false);
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timeout);
  //     successSetActive(true);
  //   };
  // }, [successAlert.trigger]);

  const storeEmail = (event) => {
    setPass(event.target.value);
  };

  let validEmail = /[a-zA-Z0-9#$%&\*\+-/=\?\_`|~]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}/;

  const genToken = (event) => {
    event?.preventDefault();
    if (!pass) {
      //disptach(ErrorAlert("Please Enter Valid Email Address"));
      alert("Please Enter Valid Email Address");
    } else {
      if (validEmail?.test(pass)) {
        userService
          .get(FORGOTTOKEN + pass + `&Url=${RESETPASSWORD}`)
          .then((output) => {
            console.log(output, "check output");
            if (output?.response?.status === "Ok") {
              alert(output?.response?.message);
            } else if (output?.status === "NotExist") {
              alert(output?.message);
            }
          })
          .catch((error) => {
            if (error?.status === "Error") {
              alert("something went wrong!");
            }
          });
      } else {
        alert("please enter valid email address");
      }
    }
  };

  // if (!pInvalid ? "Please Enter Valid Email Address" : "tested")
  return (
    <main className="header-bg h-screen">
      {/* {errorAlert.msg && erroractive && <ErrorToast msg={errorAlert.msg} />}
        {warningAlert.msg && warningactive && (
          <WarningToast msg={warningAlert.msg} />
        )}
        {successAlert.msg && successactive && (
          <SuccessToast msg={successAlert.msg} />
        )} */}
      <section className="container mx-auto pt-40">
        <div className="w-5/5 relative mx-8 bg-white p-6 shadow-xl md:mx-auto md:w-3/5 md:p-12 lg:w-2/5  xl:w-1/3">
          <Link
            href="/login"
            className="absolute -top-8 left-0 flex items-center text-sm text-white"
          >
            <span className="material-icons-outlined text-xs text-white">
              arrow_back_ios_new
            </span>
            Back to Login
          </Link>
          <h2 className="text-lg font-medium text-gray-800">Forgot Password</h2>
          <p className="text-sm font-medium text-gray-400">
            Link will be sent on your registered email address to Reset your
            password!
          </p>
          <form action="" method="">
            <div className="mt-3 flex flex-col ">
              <input
                type="text"
                name="email"
                placeholder="Please enter your Email Address"
                className="border-bottom border border-slate-200 p-3 text-sm text-gray-400   focus:outline-0"
                onChange={(e) => storeEmail(e)}
              />
              <Link
                href={""}
                className="mt-4 w-fit rounded-md bg-[#FF3EA5] px-6 py-2 text-sm font-normal text-white hover:bg-orange-600 focus:outline-none"
                onClick={(e) => genToken(e)}
              >
                Send Link
              </Link>
            </div>
          </form>
        </div>
      </section>
      <footer className="w-5/5 mx-auto pt-3 text-center md:w-3/5 lg:w-2/5 xl:w-1/3">
        <p className="text-sm text-white">
          copyright &copy; {new Date().getFullYear()} all rights reserved
        </p>
      </footer>
    </main>
  );
};

export default ForgotPassword;
