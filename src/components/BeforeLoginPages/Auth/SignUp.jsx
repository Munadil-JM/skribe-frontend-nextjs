"use client";

import { useEffect, useRef, useState } from "react";
import userService from "../../../Services/user.service";
import { FREESIGNUP, USERINFO } from "../../../constants";
import SkribeLite from "../SkribeLite";
// import { debug } from "util";
import Navbar from "../Navbar";
import Footer from "../Footer";
import useMetadata from "../custom-hooks/useMetadata";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Create Your Skribe Account - Start Your Free Trial Today",
    url: "https://app.goskribe.com/signup",
    description:
      "Sign up for Skribe and discover a smarter way to connect with journalists, monitor media, and analyze PR success. Start with a free trial.",
    inLanguage: "en",
  },
];

const FreebiesPage = ({ id }) => {
  useMetadata(schema);

  const [isOpen, setIsOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [timer, setTimer] = useState(null);
  const [intervalId, setIntervalId] = useState(null); // State to hold the interval ID

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTrigger, setMessageTrigger] = useState(0); // New state to trigger timer reset
  const [passwordValid, setPasswordValid] = useState("");
  const [redAlert, setRedAlert] = useState(false);
  const [userinfoStatus, setUserinfoStatus] = useState(false);
  const [accountDetail, setAccountDetail] = useState({
    organizationName: "",
    companyType: "",
    email: "",
    phoneNumber: "",
    name: "",
    password: "",
    otp: "",
  });

  const freeAccess = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/^\s+/, ""); // Trim the value
    setAccountDetail((old) => ({
      ...old,
      [name]: trimmedValue,
    }));
  };

  //FOLLOWING CODE FOR OTP
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [clearOtpInput, setClearOtpInput] = useState(true);

  const handleChange = (index, event) => {
    const value = event.target.value;
    // Update the OTP array with new value
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input field if value is not empty
    if (value !== "" && index < refs.length - 1) {
      refs[index + 1].current.focus();
    }
  };

  useEffect(() => {
    setOtp(["", "", "", ""]);
    refs[0]?.current?.focus();
  }, [clearOtpInput]);

  useEffect(() => {
    if (otp.every((value) => value !== "")) {
      let output = otp.join("");
      setAccountDetail((old) => {
        return {
          ...old,
          otp: output,
        };
      });
    }
  }, [otp]);

  useEffect(() => {
    // Check if the OTP in account details is exactly 4 characters long
    if (accountDetail.otp.length === 4) {
      createFreeAccount();
    }
  }, [accountDetail.otp]);

  useEffect(() => {
    let user = localStorage.getItem("user");
    let userInforLocal = localStorage.getItem("userInfo");

    if (user) {
      localStorage.removeItem("user");
    }
    if (userInforLocal) {
      localStorage.removeItem("userInfo");
    }
  }, []);

  function onPaste(e) {
    const pasted = e.clipboardData.getData("text/plain");
    const trimmedPasted = pasted.trim().slice(0, 4); // Ensure maximum of 4 characters
    setOtp(trimmedPasted.split(""));
  }

  const isPublicEmail = (email) => {
    const publicEmailDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "aol.com",
      "icloud.com",
      "live.com",
      "msn.com",
      "yandex.com",
      "zoho.com",
      "protonmail.com",
      "gmx.com",
      "mail.com",
      "rediffmail.com",
      "inbox.com",
      "mail.ru",
      "rocketmail.com",
      "yahoo.co.uk",
      "yahoo.co.in",
      "yahoo.ca",
      "yahoo.com.au",
      "hotmail.co.uk",
      "hotmail.fr",
      "hotmail.it",
      "hotmail.es",
      "me.com",
      "mac.com",
      "@qq.com",
      "@daum.net",
      "@naver.com",
      "@sina.com",
      "@163.com",
      "@qq.com",
      // Add more public email domains here as necessary
    ];

    const emailDomain = email.split("@")[1];
    return publicEmailDomains.includes(emailDomain);
  };

  const userInfo = async () => {
    userService
      .get(`${USERINFO}`)
      .then(function (output) {
        let result = output?.data;
        localStorage.setItem("userInfo", JSON.stringify(result));
        setUserinfoStatus(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createFreeAccount = async () => {
    try {
      setIsLoading(true);
      setButtonDisabled(true);
      const passwordPattern =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

      if (accountDetail?.organizationName?.length < 3) {
        setVisible(true);
        setMessage("Please enter a minimum 3-character organization name");
        setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
        return;
      } else if (accountDetail?.name?.length < 3) {
        setVisible(true);
        setMessage("Please enter a minimum 3-letter name");
        setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
        return;
      } else if (accountDetail?.email?.length <= 0) {
        setVisible(true);
        setMessage("Please enter a valid email address");
        setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
        return;
      } else if (isPublicEmail(accountDetail.email)) {
        setVisible(true);
        setMessage(
          "Please use a company email address, not a public email provider."
        );
        setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
        return;
      } else if (accountDetail?.phoneNumber?.length < 10) {
        setVisible(true);
        setMessage("Please enter a 10-digit mobile number");
        setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
        return;
      } else if (!passwordPattern.test(accountDetail?.password)) {
        setVisible(true);
        setMessage(
          "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character."
        );
        setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
        return;
      } else if (accountDetail?.companyType === "") {
        setVisible(true);
        setMessage("Please select an organization type");
        setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
        return;
      } else if (confirmPassword?.length < 8) {
        setVisible(true);
        setMessage(
          "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character."
        );
        setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
        return;
      } else if (accountDetail.password !== confirmPassword) {
        setVisible(true);
        setMessage("Your password does not match the confirm password");
        setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
        return;
      } else {
        userService.post(FREESIGNUP, accountDetail).then((result) => {
          if (result?.status === "DomainAlready") {
            setVisible(true);
            setMessage(
              "This domain is already registered with us. Please book a slot with our team to reactivate your account."
            );
            setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
          } else if (result?.response?.status === "NotWorkingEmailId") {
            setVisible(true);
            setMessage("The email ID you have entered is invalid");
            setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
          } else if (result?.response?.status === "OrganizationAlready") {
            setVisible(true);
            setMessage(result?.response?.message);
            setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
          } else if (result?.response?.status === "EmailIdAlready") {
            setVisible(true);
            setMessage(
              "This email ID is already registered with us. Please sign in to access your account."
            );
            setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
          } else if (result?.response?.status === "DomainAlready") {
            setVisible(true);
            setMessage(
              "Someone from your organisation is already an active Skribe user. Please get in touch with our team to know how to proceed."
            );
            setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
          } else if (result?.response?.status === "OTP") {
            setVisible(true);
            setShowOtp(true);
            countdownTimer();
            setMessage("OTP sent to your registered email address");
            setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
          } else if (result?.response?.status === "Ok") {
            localStorage.setItem("user", JSON.stringify(result?.data));
            setVisible(true);
            setMessage(result?.response?.message);
            setIsOpen(true);
            if (!userinfoStatus) {
              userInfo();
            }
          } else if (result?.response?.status === "ExpireOTP") {
            setVisible(true);
            setMessage("This OTP has expired, please request another OTP");
            setAccountDetail((old) => {
              return {
                ...old,
                otp: "",
              };
            });
            setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
          } else if (result?.response?.status === "InvalidOTP") {
            setVisible(true);
            setRedAlert(true);
            setMessage("This OTP you have entered is invalid");
            setClearOtpInput(!clearOtpInput);
            setMessageTrigger((prev) => prev + 1); // Trigger timeout reset
          }
        });
      }
    } catch (error) {
      if (error?.status === "BadRequest") {
        alert(error?.message);
      }
      if (error?.status === "Error") {
        alert(error?.message);
      }
    } finally {
      setIsLoading(false);
      setButtonDisabled(false);
    }
  };

  // Set up the timer to hide the message after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000); // 10 seconds

    // Clean up the timer if the component unmounts or the timer needs resetting
    return () => clearTimeout(timer);
  }, [messageTrigger]); // Depend on messageTrigger instead of message

  const countdownTimer = async () => {
    let seconds = 300; // 5 minutes in seconds
    const timer = setInterval(function () {
      let minutes = Math.floor(seconds / 60);
      let remainingSeconds = seconds % 60;
      // Formatting Mints, seconds to always display two digits
      let displaySeconds =
        remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
      setTimer(`0${minutes} : ${displaySeconds} `);
      seconds--;
      if (seconds <= 0) {
        clearInterval(timer);
        setTimer(null);
        setAccountDetail((old) => {
          return {
            ...old,
            otp: "",
          };
        });
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

  return (
    <>
      <Navbar />

      <main className="px-5 py-5 lg:px-10 lg:py-10 font-inter">
        <SkribeLite
          isOpen={isOpen}
          id={id}
          onClose={() => {
            document.body.classList.remove("overflow-hidden");
            setIsOpen(!isOpen);
          }}
        />

        <div className="container mx-auto bg-[#F1F1E6] border border-[#DADADA]/70 rounded-lg">
          <section className="relative section flex flex-col gap-x-6 lg:flex-row">
            <div className="w-full">
              <div className="img-wrap rounded-xl p-5">
                <h1 className="text-lg font-semibold">Welcome to Skribe</h1>

                <p className="text-sm text-gray-600 text-balance">
                  Please Sign up to avail{" "}
                  <span className="font-medium text-gray-800">
                    15 days free Trial
                  </span>
                </p>

                <div className="w-full flex md:flex-row flex-col gap-x-20">
                  <div className="w-full md:w-1/3">
                    <div className="flex flex-col mt-6 gap-1">
                      <label
                        htmlFor="organizationName"
                        className="text-xs text-black font-medium"
                      >
                        Organisation Name:
                      </label>
                      <input
                        id="organizationName"
                        type="text"
                        name="organizationName"
                        value={accountDetail?.organizationName}
                        className="p-2 text-sm text-gray-400 border bg-white border-black/30 focus:outline-0 rounded-md"
                        onChange={freeAccess}
                      />
                    </div>

                    <div className="flex flex-col gap-1 mt-2 lg:mt-5">
                      <label
                        htmlFor="name"
                        className="text-xs text-black font-medium"
                      >
                        Name:
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={accountDetail?.name}
                        className="p-2 text-sm text-gray-400 border bg-white border-black/30 focus:outline-0 rounded-md"
                        onChange={freeAccess}
                      />
                    </div>

                    <div className="flex flex-col gap-1 mt-2 lg:mt-5">
                      <label
                        htmlFor="phoneNumber"
                        className="text-xs text-black font-medium"
                      >
                        Mobile Number:
                      </label>
                      <input
                        id="phoneNumber"
                        type="number"
                        name="phoneNumber"
                        value={accountDetail?.phoneNumber}
                        className="p-2 text-sm text-gray-400 border bg-white border-black/30 focus:outline-0 rounded-md"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= 10) {
                            freeAccess(e);
                          }
                        }}
                        max="9999999999" // Set max value to 10 digits
                        style={{
                          MozAppearance: "textfield", // Firefox
                          WebkitAppearance: "none", // Safari and Chrome
                          appearance: "none", // For modern browsers
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-1 mt-2 lg:mt-5 relative">
                      <label
                        htmlFor="email"
                        className="text-xs text-black font-medium"
                      >
                        Work Email:
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={accountDetail?.email}
                        className="p-2 text-sm text-gray-400 bg-white border border-black/30 focus:outline-0 rounded-md"
                        onChange={freeAccess}
                      />
                      <p className="text-xs text-black/80">
                        You will recieve an OTP at your registered email.
                      </p>

                      {isPublicEmail(accountDetail.email) && (
                        <p className="text-red-500 text-xs">
                          Please use a company email address, not a public
                          email.
                        </p>
                      )}
                      {/* <span className="absolute right-3 cursor-pointer top-[26px] text-purple-700 text-xs">
												Verify email
											</span> */}
                    </div>
                  </div>

                  <div className="w-full flex flex-col md:flex-col justify-between flex-grow md:w-1/2">
                    <div className="flex flex-col lg:mt-5 mt-5 ">
                      <label className="text-xs text-black font-medium">
                        Organisation Type:
                      </label>

                      <div className="flex flex-col gap-y-2">
                        <div className="flex gap-x-2 mt-1">
                          <input
                            type="radio"
                            id="type"
                            className="w-4 h-4 peer peer-checked:bg-black "
                            name="companyType" // Make sure the 'name' is the same for both radio buttons
                            value="Agency"
                            onChange={freeAccess}
                          />
                          <label
                            htmlFor="type"
                            className="text-sm text-black/90"
                          >
                            Agency
                          </label>
                        </div>

                        <div className="flex gap-x-2">
                          <input
                            type="radio"
                            id="type1"
                            name="companyType"
                            value="Enterprise"
                            className="w-4 h-4 focus:ring-0 peer"
                            onChange={freeAccess}
                          />
                          <label
                            htmlFor="type1"
                            className="text-sm text-black/90"
                          >
                            Enterprise
                          </label>
                        </div>
                      </div>
                    </div>

                    {showOtp && (
                      <>
                        <div className="fixed inset-0 bg-gray-700 opacity-70 z-50"></div>
                        <div className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-2xl md:w-3/5 md:py-4 lg:w-3/5 xl:w-1/3 z-[51]">
                          <div className="relative flex flex-col items-center justify-between border-b border-gray-200">
                            <h2 className="text-md font-medium text-gray-800">
                              Please enter the OTP to verify your account
                            </h2>
                            <div className="flex flex-col">
                              <label className="flex gap-x-2 text-xs text-gray-700 mt-5 mb-3 md:mt-0">
                                OTP
                                <span className="text-xs text-gray-600">
                                  {showOtp && `sent to ${accountDetail?.email}`}
                                </span>
                              </label>

                              <div className="flex justify-start gap-x-4 pt-0 pb-3">
                                {otp?.map((digit, index) => (
                                  <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e)}
                                    ref={refs[index]}
                                    onPaste={onPaste}
                                    className={`${
                                      redAlert
                                        ? "bg-red-100 border-red-400"
                                        : " border-gray-600 "
                                    } border-2 h-10 w-10 rounded-md text-center text-[2rem] lowercase focus:outline-none`}
                                  />
                                ))}{" "}
                              </div>

                              <div className="flex flex-col items-start">
                                {timer !== null && (
                                  <p className="text-xs text-gray-700">
                                    <span>Time Remaining: </span>
                                    <span className="font-bold">
                                      {timer}
                                    </span>{" "}
                                    <span> seconds</span>
                                  </p>
                                )}
                                {timer === null && (
                                  <button
                                    disabled={buttonDisabled}
                                    className="cursor-pointer text-xs text-red-700 "
                                    onClick={() => createFreeAccount("resend")}
                                  >
                                    Resend One Time Password?
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="w-full flex md:flex-row flex-col gap-x-20">
                  <div className="w-full md:w-1/3">
                    <div className="flex flex-col lg:mt-5 mt-2 ">
                      <label
                        htmlFor="password"
                        className="text-xs text-black font-medium"
                      >
                        Password:
                      </label>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        value={accountDetail?.password}
                        className="p-2 text-sm text-gray-400 bg-white border border-black/30 focus:outline-0 rounded-md"
                        onChange={(e) => {
                          const value = e.target.value;
                          freeAccess(e); // Assuming freeAccess is your handler for setting account details
                          const passwordPattern =
                            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
                          setPasswordValid(passwordPattern.test(value));
                        }}
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-1/3">
                    <div className="flex flex-col lg:mt-5 mt-2 ">
                      <label className="text-xs text-black font-medium">
                        Confirm Password:
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        className="p-2 text-sm text-gray-400 bg-white border border-black/30 focus:outline-0 rounded-md"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {!passwordValid && accountDetail?.password?.length > 0 && (
                  <p className="text-xs text-red-500 mt-1">
                    Password must be at least 8 characters long, contain one
                    uppercase letter, one number, and one special character.
                  </p>
                )}

                <button
                  type="button"
                  onClick={createFreeAccount}
                  className={`${
                    timer !== null
                      ? "bg-gray-400"
                      : "bg-[#002B5B] cursor-pointer"
                  }  px-5 py-2 mt-10 text-white rounded-lg text-sm font-medium`}
                  disabled={timer !== null ? true : false}
                >
                  {isLoading ? "Loading..." : "Join Now - It's Free!"}
                </button>

                <p className="text-[#666666] text-sm pt-2">
                  Gain instant access to tools and insights designed to elevate
                  your experience.
                </p>

                {!!visible && (
                  <p
                    className={`px-4 lg:px-10 py-2 text-sm rounded-full w-fit fixed lg:absolute left-1/2 -translate-x-1/2 bottom-4 lg:bottom-16 bg-orange-400 text-white transition-opacity duration-500 ${
                      !message ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};
export default FreebiesPage;
