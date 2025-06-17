"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

const OTP = ({
  open,
  resend,
  cred,
  setCred,
  timer,
  clearData,
  otpMessage,
  onClose,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = [useRef(), useRef(), useRef(), useRef()];

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
  }, [clearData]);

  useEffect(() => {
    if (otp.every((value) => value !== "")) {
      let output = otp.join("");
      setCred((old) => {
        return {
          ...old,
          otp: output,
        };
      });
    }
  }, [otp]);

  function onPaste(e) {
    const pasted = e.clipboardData.getData("text/plain");
    const trimmedPasted = pasted.trim().slice(0, 4); // Ensure maximum of 4 characters
    setOtp(trimmedPasted.split(""));
  }

  if (!open) return null;

  return createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-700 opacity-70"></div>

      <div className="absolute left-1/2 top-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-2xl md:w-3/5 md:py-7 lg:w-3/5 xl:w-1/3">
        <div className="relative flex flex-col items-center justify-between border-b border-gray-200">
          <h2 className="text-md font-medium text-gray-800">
            Please enter the OTP to verify your account
          </h2>

          <p className="text-sm font-normal text-gray-500">
            A OTP has been sent to your registered Email-id
          </p>
        </div>

        <div className="flex justify-center gap-x-4 pt-5">
          {otp?.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e)}
              ref={refs[index]}
              onPaste={onPaste}
              className="otp-bg border h-12 w-12 rounded-md border-gray-900 text-center text-[2rem] lowercase"
            />
          ))}
        </div>

        <div className="flex flex-col items-center pt-1">
          {timer !== null && (
            <p className="pt-2 text-xs text-gray-700">
              <span>Time Remaining: </span>
              <span className="font-bold">{timer}</span> <span> seconds</span>
            </p>
          )}

          {timer === null && (
            <span
              className="cursor-pointer pt-2 text-sm font-medium text-gray-800"
              onClick={resend}
            >
              <span className="text-red-700">Resend One Time Password?</span>
            </span>
          )}

          <p className="pt-4 text-sm text-red-800">
            {!!otpMessage && otpMessage}
          </p>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default OTP;
