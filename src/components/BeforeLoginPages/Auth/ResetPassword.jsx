"use client";

import { useState } from "react";
import Link from "next/link";
//import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
//import { ResetMailPassword } from "../../Redux/Action/UserAuth";
import userService from "../../../Services/user.service";
import { MAILPASSRESET } from "../../../constants";
import Navbar from "../Navbar";
import Footer from "../Footer";

const ResetPassword = () => {
  const [pass, setPass] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  ////const dispatch = useDispatch();
  // const [warningactive, warningSetActive] = useState(false);
  // const [erroractive, errorSetActive] = useState(false);
  // const [successactive, successSetActive] = useState(false);

  const searchParams = useSearchParams();
  const getToken = searchParams.get("token");
  let reset = getToken && getToken?.split(" ").join("+");

  //const pInvalid = useSelector((state) => state.passInvalid);
  const storeEmail = (event) => {
    setPass({
      ...pass,
      [event.target.name]: event.target.value,
      token: reset,
    });
  };

  const genToken = (e) => {
    e.preventDefault();
    if (!pass.email || !pass.password || !pass.confirmPassword) {
      alert("please Enter all Input");
    } else if (pass.password !== pass.confirmPassword) {
      alert("Password and confirm password are not same");
    } else if (pass.password.length < 6) {
      alert("password should be more than 6 charactor");
    } else {
      //dispatch(ResetMailPassword(pass));
      userService
        .post(MAILPASSRESET, pass)
        .then((fData) => {
          if (fData?.response?.status === "error") {
            alert(fData?.response?.message);
          } else if (fData?.status === "error") {
            alert(fData?.message);
          } else if (fData?.response?.status === "error") {
            alert(fData?.response?.message);
          } else if (fData?.status === "TimeOut") {
            alert("Your token is expired, Please re-generate your password!");
          } else if (fData?.response?.status === "Success") {
            setTimeout(() => {
              window.location?.replace("/");
            }, 5000);
            alert(fData?.response?.message);
          }
        })
        .catch((error) => alert(error?.response?.message));
    }
  };

  // if (!pInvalid ? "Please Enter Valid Email Address" : "tested")
  return (
    <main className="h-screen">
      <Navbar />
      <section className="container w-3/4 lg:w-full mx-auto py-20">
        <div className="w-5/5 relative mx-auto p-6 md:w-3/5 md:p-12 lg:w-3/5 xl:w-3/5 bg-[#F1F1E6] border border-black/15 rounded-md">
          <div className="relative flex items-center justify-between">
            <Link
              href="/login"
              className="absolute -top-8 left-0 flex items-center text-sm"
            >
              <span className="absolute left-0 flex w-52 mt-5 cursor-pointer items-center text-sm font-normal text-black">
                <span className="material-icons-outlined mr-2 icon-16">
                  arrow_back_ios_new
                </span>
                <span className="hover:underline">Back to Login</span>
              </span>
            </Link>
          </div>
          <h2 className="text-lg font-medium text-gray-800">
            Reset Your Password
          </h2>
          <p className="text-sm font-medium text-black/50">
            You can reset your password now!
          </p>
          <form action="" method="">
            <div className="mt-3 flex flex-col ">
              <label className="text-sm text-black/70">Email:</label>
              <input
                type="text"
                name="email"
                value={pass.email}
                className="border-bottom border border-black/15 rounded-sm w-2/3 p-3 text-sm text-black/70  focus:outline-0"
                onChange={(e) => storeEmail(e)}
              />
            </div>
            <div className="mt-3 flex flex-col ">
              <label className="text-sm text-black/70">Password:</label>
              <input
                type="password"
                name="password"
                value={pass.password}
                className="border-bottom border border-black/15 rounded-sm w-2/3 p-3 text-sm text-black/70  focus:outline-0"
                onChange={(e) => storeEmail(e)}
              />
            </div>
            <div className="mt-3 flex flex-col ">
              <label className="text-sm text-black/70">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={pass.confirmPassword}
                className="border-bottom border border-black/15 rounded-sm w-2/3 p-3 text-sm text-black/70  focus:outline-0"
                onChange={(e) => storeEmail(e)}
              />
              <Link
                href=""
                className="relative mt-4 w-fit rounded-md bg-[#002b5b] px-6 py-2 text-sm font-normal text-white hover:bg-[#dd338e] focus:outline-none"
                onClick={(e) => genToken(e)}
              >
                Reset Password
              </Link>
            </div>
          </form>
        </div>
      </section>
      {/* <footer className="w-5/5 mx-auto pt-3 text-center md:w-3/5 lg:w-2/5 xl:w-1/3">
        <p className="text-sm text-white">
          copyright &copy; {new Date().getFullYear()} all rights reserved
        </p>
      </footer> */}
      <Footer />
    </main>
  );
};
export default ResetPassword;
