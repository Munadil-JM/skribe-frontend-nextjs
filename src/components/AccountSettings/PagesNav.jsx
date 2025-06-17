"use client";

import { useState } from "react";
import Link from "next/link";
import ChangePicture from "./ChangePicture";
// import ContactUs from "../BeforeLogin/ContactUs";
import noUser from "../assets/noUser.png";

const PagesNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const NavLinks = [
    //   {
    //     link: "/accountSettings",
    //     name: "Account Setting",
    //   },
    //   {
    //     link: "/changePassword",
    //     name: "Change Password",
    //   },
    //   {
    //     link: "#",
    //     name: "Security",
    //   },
    //   {
    //     link: "#",
    //     name: "Notification",
    //   },
  ];
  const userDetail = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div className="w-auto md:w-60">
      <ChangePicture open={isOpen} onClose={() => setIsOpen(false)} />
      <nav>
        <figure className="mb-5 flex flex-1 flex-col items-center">
          <div className="relative">
            <img
              src={noUser.src}
              className="h-24 w-24 rounded-full object-cover"
            />
            <div
              onClick={() => {
                setIsOpen(true);
              }}
              className="absolute -right-6 top-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full  border-4 border-white bg-gray-300 text-gray-500  hover:bg-gray-400 hover:text-white"
            >
              <span className="material-icons-outlined">photo_camera</span>
            </div>
          </div>

          <figcaption className="pt-1 text-sm">{userDetail?.name}</figcaption>
        </figure>
        <ul className="flex flex-wrap gap-1 border-b md:flex-col md:border-none">
          {NavLinks.map((curElem, ind) => (
            <li key={ind}>
              <Link
                href={curElem.link}
                onClick={() => setActiveTab(ind)}
                className={
                  activeTab === ind
                    ? "flex flex-col rounded-none bg-gray-200 px-6 py-3 text-xs font-normal text-gray-700  hover:bg-gray-300 hover:text-gray-800 md:rounded-lg md:px-12"
                    : "flex flex-col rounded-none  px-6 py-3 text-xs font-normal text-gray-700  hover:bg-gray-800 hover:text-gray-800 md:rounded-lg md:px-12"
                }
              >
                {curElem.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PagesNav;
