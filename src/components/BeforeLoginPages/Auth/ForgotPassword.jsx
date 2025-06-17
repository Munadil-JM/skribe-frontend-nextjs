"use client";

import { useState } from "react";
import Link from "next/link";
//import { useDispatch, useSelector } from "react-redux";
// import ErrorToast from "../utils/ErrorToast";
// import SuccessToast from "../utils/SuccessToast";
// import WarningToast from "../utils/WarningToast";
// import { ErrorAlert } from "../../Redux/Action/Settings";
import { FORGOTTOKEN, RESETPASSWORD } from "../../../constants";
import userService from "../../../Services/user.service";
import Navbar from "../Navbar";
import Footer from "../Footer";
import useMetadata from "../custom-hooks/useMetadata";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Reset Your Skribe Password - Secure Account Recovery",
    url: "https://app.goskribe.com/forgot-password",
    description:
      "Forgot your Skribe password? Quickly reset it and regain access to your PR intelligence tools and journalist data dashboard.",
    inLanguage: "en",
  },
];

const ForgotPassword = () => {
  useMetadata(schema);

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
    <>
      <Navbar />

      <main className="font-inter px-5 py-5 lg:px-10 lg:py-10">
        {/* {errorAlert.msg && erroractive && <ErrorToast msg={errorAlert.msg} />}
				{warningAlert.msg && warningactive && (
					<WarningToast msg={warningAlert.msg} />
				)}
				{successAlert.msg && successactive && (
					<SuccessToast msg={successAlert.msg} />
				)} */}

        <section className="container mx-auto flex gap-10 flex-col lg:flex-row lg:justify-between p-5 rounded-lg border border-[#DADADA] bg-[#F1F1E6]">
          <div className="lg:w-1/3">
            <Link href="/login">
              <span className="text-black flex cursor-pointer items-center text-sm font-medium mb-3 hover:text-black/80">
                <span className="material-icons-outlined icon-16">
                  arrow_back_ios_new
                </span>
                <span>&nbsp; Back to Login</span>
              </span>
            </Link>

            <h1 className="text-lg text-black font-semibold">
              Forgot your Password
            </h1>

            <p className="text-sm text-[#666666]">
              Enter your email address to send a reset link!
            </p>

            <form action="" method="">
              <div className="flex flex-col ">
                <label
                  htmlFor="email"
                  className="text-sm text-black font-medium mt-8"
                >
                  Work Email:
                </label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="Please enter your Email Address"
                  className="rounded-md bg-white border border-black/30 p-3 text-sm text-gray-500 focus:outline-0"
                  onChange={(e) => storeEmail(e)}
                />

                <Link
                  href=""
                  className="mt-6 w-fit rounded-md bg-[#002B5B] px-5 py-2 text-sm font-medium text-white focus:outline-none"
                  onClick={(e) => genToken(e)}
                >
                  Send reset link
                </Link>
              </div>
            </form>
          </div>

          <img
            className="hidden sm:block w-[300px] self-center lg:self-auto lg:w-[400px] xl:w-[500px] xl:h-[500px]"
            src="/assets/forgot-pass-illustration.webp"
            alt="Skribe - Forgot Password illustration"
          />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ForgotPassword;
