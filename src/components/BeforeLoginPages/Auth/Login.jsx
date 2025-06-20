"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthService from "../../../Services/auth.service";
import userService from "../../../Services/user.service";
import { GENERATEOTP, USERINFO } from "../../../constants";
// import { debug } from "util";
import OTP from "./OTP";
import Navbar from "../Navbar";
import Footer from "../Footer";
import useMetadata from "../custom-hooks/useMetadata";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Login to Skribe - Access Your Media Intelligence Dashboard",
    url: "https://app.goskribe.com/login",
    description:
      "Securely log in to your Skribe account. Access journalist databases, media monitoring, analytics, and more.",
    inLanguage: "en",
  },
];

const Login = ({ listName, id, regional }) => {
  useMetadata(schema);

  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [cred, setCred] = useState({
    username: "",
    password: "",
    otp: "",
  });
  // const [message, setMessage] = useState([]);
  const [AllInfo, setAllInfo] = useState();
  const [userinfoStatus, setUserinfoStatus] = useState(false);
  const [otpFlag, setOtpFlag] = useState(false);
  const [timer, setTimer] = useState("");
  const [intervalId, setIntervalId] = useState(null); // State to hold the interval ID
  const [clearOtpInput, setClearOtpInput] = useState(true);
  // const token = JSON.parse(localStorage.getItem("user"));
  const [otpMessage, setOtpMessage] = useState("");

  // useEffect(() => {
  //   if (token?.accessToken) {
  //     router.push("/dashboard");
  //   }
  // }, [token]);

  useEffect(() => {
    localStorage.clear();
  }, []);

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // Function to set a cookie
  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie =
      name +
      "=" +
      encodeURIComponent(value) +
      "; expires=" +
      expires +
      "; path=/";
  }

  // Function to get a cookie
  function getCookie(name) {
    return document.cookie.split("; ").reduce((r, v) => {
      const parts = v.split("=");
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, "");
  }

  useEffect(() => {
    let browserId = getCookie("browserId");
    if (!browserId) {
      browserId = generateUUID();
      setCookie("browserId", browserId, 365); // Set cookie for 1 year
    }
  }, []);

  const userInfo = async () => {
    userService
      .get(`${USERINFO}`)
      .then(function (output) {
        let result = output?.data;
        setAllInfo(result);

        localStorage.setItem("userInfo", JSON.stringify(result));
        setUserinfoStatus(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function addCookie() {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    if (role) {
      await fetch("/api/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });
    }
  }

  function onChangeCred(e) {
    const { name, value } = e.target;
    setCred((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const countdownTimer = async () => {
    let seconds = 300; // 5 minutes in seconds
    const timer = setInterval(function () {
      let minutes = Math.floor(seconds / 60);
      let remainingSeconds = seconds % 60;
      // Formatting Minutes, seconds to always display two digits
      let displaySeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
      setTimer(`0${minutes} : ${displaySeconds} `);
      seconds--;
      if (seconds < 0) {
        clearInterval(timer);
        setTimer(null);
      }
    }, 1000);

    setIntervalId(timer);
  };

  // Use useEffect for cleanup
  useEffect(() => {
    return () => {
      //unmounts when timer state changes
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]); // if intervalId changes

  const submitForm = (e) => {
    if (cred?.username === "" || cred?.password === "") {
      alert("Please enter username or password");
    }

    let browserId = getCookie("browserId");
    setSubmitting(true);

    AuthService.login(cred.username, cred.password, browserId, cred.otp)
      .then((response) => {
        if (response?.response?.status === "OTP") {
          countdownTimer();
          setOtpFlag(true);
          //alert(response?.response?.message);
          // alert("OTP sent to your registered email address");
        } else if (response?.response?.status === "FreebiesExpire") {
          alert(
            "Your free trial has ended. Please upgrade now to continue using the service without interruption."
          );
        } else if (response?.response?.status === "InvalidOTP") {
          setOtpMessage("Wrong OTP, Please Check Again");
          setClearOtpInput(!clearOtpInput);
        } else if (response?.response?.status === " ") {
          setOtpMessage("Your OTP has expired, Please Resend your OTP");
          setClearOtpInput(!clearOtpInput);
        } else if (response?.accessToken) {
          if (!userinfoStatus) {
            userInfo();
            addCookie();
          }
          if (id) {
            router.push(`/view-journalists/${listName}/${id}`);
          } else if (regional) {
            router.push("/regional");
          } else {
            router.push("/dashboard");
          }
        }
      })
      .catch((error) => {
        if (error?.response?.data?.status === 401) {
          alert("Username or Password is incorrect");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const resendOtp = () => {
    const data = {
      userName: cred.username,
    };
    userService.post(GENERATEOTP, data).then((result) => {
      if (result?.response?.status === "OTP") {
        //alert(result?.response?.message);
        countdownTimer();
        setOtpMessage("OTP sent to your registered email address");
      }
    });
  };

  useEffect(() => {
    if (cred.otp !== "") {
      submitForm();
    }
  }, [cred.otp]);

  return (
    <>
      {otpFlag && (
        <OTP
          open={otpFlag}
          resend={resendOtp}
          timer={timer}
          cred={cred}
          setCred={setCred}
          clearData={clearOtpInput}
          otpMessage={otpMessage}
        />
      )}

      <Navbar />

      <main className="font-inter flex items-center px-5 py-5 lg:px-10 lg:py-10 justify-center">
        <section className="container mx-auto p-6 bg-[#F1F1E6] border border-[#DADADA] rounded-lg lg:h-full flex lg:justify-between gap-10 flex-col lg:flex-row">
          <div className="rounded-md lg:w-1/3">
            <Link href="/">
              <span className="text-black flex cursor-pointer items-center text-sm font-medium mb-3 hover:text-black/80">
                <span className="material-icons-outlined icon-16">
                  arrow_back_ios_new
                </span>
                <span>&nbsp; Back to Home</span>
              </span>
            </Link>

            <h1 className="text-lg font-semibold">Welcome Back!</h1>

            <p className="text-sm text-gray-600">Login to Skribe Dashboard</p>

            {/* <span>
               {isFailure && (
								<span className="text-xs text-red-600">
									Invalid Email Address or Password!
								</span>
							)} 
            </span> */}

            <div className="flex flex-col mt-5">
              <label htmlFor="email" className="text-sm font-medium">
                Work Email:
              </label>
              <input
                id="email"
                type="text"
                name="username"
                value={cred.username}
                className="p-3 text-sm text-gray-500 bg-white border border-black/30 rounded-md focus:outline-0"
                onChange={onChangeCred}
              />

              <label htmlFor="password" className="text-sm font-medium mt-5">
                Password:
              </label>
              <input
                id="password"
                type="password"
                value={cred.password}
                name="password"
                className="p-3 text-sm text-gray-500 bg-white border border-black/30 rounded-md focus:outline-0"
                onChange={onChangeCred}
              />

              <Link
                href="/forgot-password"
                className="pt-2 text-sm w-fit hover:underline"
              >
                Forgot Password ?
              </Link>

              {/* {otpFlag && (
									<>
										<label className="mt-2 text-sm text-slate-500">OTP:</label>
										<input
											type="text"
											value={cred.otp}
											name="otp"
											minlength="4"
											maxlength="4"
											className="p-3 text-sm text-gray-800 uppercase border border-slate-200 focus:outline-0"
											onChange={onChangeCred}
										/>
										<label className="flex justify-between mt-2 text-sm text-slate-500">
											<span>{timer}</span>
											<span
												onClick={resendOtp}
												className="text-red-700 underline"
											>
												Resend OTP
											</span>
										</label>
									</>
								)} */}

              <button
                className="relative mt-6 cursor-pointer w-fit rounded-lg bg-[#002B5B] px-5 py-2 text-sm font-semibold text-white focus:outline-none"
                onClick={(event) => {
                  submitForm(event);
                }}
              >
                <span>
                  {submitting ? (
                    <span className="Load">Logging...</span>
                  ) : (
                    "Login"
                  )}
                </span>
              </button>
            </div>
          </div>

          <img
            className="hidden sm:block w-[300px] self-center lg:self-auto lg:w-[400px] xl:w-[500px] xl:h-[500px]"
            src="/assets/login-page-illustration.webp"
            alt="Skribe - Login Page illustration"
          />
        </section>
      </main>

      <Footer />
    </>
  );
};
export default Login;
