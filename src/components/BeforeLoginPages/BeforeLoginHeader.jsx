"use client";

import { useState } from "react";
import Link from "next/link";
import logo from "../assets/skribe-logo.png";
import ContactUs from "./ContactUs";

const BeforeLoginHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // const mainNav = [
  //   {
  //     name: "Home",
  //     url: "/",
  //   },
  //   {
  //     name: "Chai-Time",
  //     url: "/tea-time",
  //   },
  //   {
  //     name: "Request Demo",
  //     url: "contact-us",
  //   },

  //   {
  //     name: "Login",
  //     url: "/login",
  //   },
  // ];

  const contactForm = () => {
    document.body.classList.add("overflow-hidden");
    setIsOpen(true);
  };

  const contactClose = () => {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  };

  return (
    <div>
      <ContactUs open={isOpen} onClose={() => contactClose()} />
      <nav className="fixed z-10 flex w-full items-center justify-between border-b border-gray-200 px-5 py-3 md:static md:py-1">
        <h1 className="text-3xl font-medium text-white">
          <Link href="/">
            <img
              src={logo.src}
              className="w-[75px] md:w-[100px]"
              alt="Skribe"
            />
          </Link>
        </h1>
        <div className="flex items-center justify-between gap-x-5 md:mb-0">
          <Link
            href={""}
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden"
          >
            <span className="material-icons-outlined rounded-lg border border-white px-3 py-2 text-lg text-white ">
              menu
            </span>
          </Link>

          <div
            // role="Primary Navigation"
            aria-label="Main Navigation"
            className={`${
              mobileMenu
                ? " absolute left-0 top-[67px] flex w-full flex-col place-items-center items-start gap-x-8 bg-[#333]  p-4 text-white  transition-all md:flex md:pb-0"
                : "hidden place-items-center gap-x-6 text-white md:flex md:pb-0"
            }  `}
          >
            <Link
              href="/"
              className="w-full border-b border-gray-500  py-2 hover:rounded-md hover:text-white md:w-auto md:border-0 md:hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/tea-time"
              className="w-full border-b border-gray-500  py-2 hover:rounded-md hover:text-white md:w-auto md:border-0 md:hover:text-white"
            >
              Chai-Time
            </Link>

            <Link
              href={""}
              onClick={() => contactForm()}
              className="w-full border-b border-gray-500  py-2 hover:rounded-md hover:text-white md:w-auto md:border-0 md:hover:text-white"
              // className="my-5 flex w-full rounded-md bg-[#FF3EA5] px-3 py-2 text-sm font-normal text-white hover:bg-[#dd338e] md:w-auto md:border-0"
            >
              Request Demo
            </Link>
            <Link
              href="/signup"
              className="my-5 flex w-full rounded-md bg-[#FF3EA5] px-3 py-2 text-sm font-normal text-white hover:bg-[#dd338e] md:w-auto md:border-0"
              // className="flex w-full rounded-md bg-white px-3 py-2 text-sm font-normal  text-gray-900 hover:bg-gray-200 md:block md:w-auto md:border-0"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="flex w-full rounded-md bg-white px-3 py-2 text-sm font-normal  text-gray-900 hover:bg-gray-200 md:block md:w-auto md:border-0"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
      {/* </div> */}
      {/* </header> */}
    </div>
  );
};

export default BeforeLoginHeader;
