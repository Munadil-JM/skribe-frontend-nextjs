"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import MenuData from "./MenuData";
// import logo from "../assets/skribe-logo.png";
import { sidebarMenu, mobileMenu } from "../../Redux/Action/Settings";
import tokenService from "../../Services/token.service";
import HeaderLock from "../Tooltip/HeaderLock";
import { usePopup } from "../Header/CreatePopup";

const Sidebar = () => {
  const [roleType, setRoleType] = useState(null);

  useEffect(() => {
    setRoleType(() => tokenService.getLocalRole());
  }, []);

  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { showPopup } = usePopup();
  const dispatch = useDispatch();

  const { sideMenu, mobileLeftMenu } = useSelector((state) => state.settings);

  const [openSection, setOpenSection] = useState("brand");

  const sections = [
    {
      key: "discovery",
      label: "Discovery",
      icon: "/assets/Discover.svg",
      imageWidth: 26,
      link: "#",
      items: [
        { name: "Media Type", link: "media-types" },
        { name: "Journalists", link: "journalist-search" },
        // { name: "Outlet", link: "#" },
        { name: "Beats", link: "#" },
      ],
    },
    //  {
    //   key: "Regional",
    //   label: "Regional Media",
    //   icon: "/assets/Regional.svg",
    //   imageWidth: 26,
    //   link: "#",
    //   items: [{ name: "Coming soon", link: "#"}],
    // },
    {
      key: "Regional",
      label: "Regional Media",
      icon: "/assets/Regional.svg",
      imageWidth: 26,
      link: "/regional",
      items: [],
    },
    {
      key: "pressReleaseDistribution",
      label: "Press Release Distribution",
      icon: "/assets/pressRelease.svg",
      imageWidth: 18,
      link: "/press-release",
      items: [],
    },
    // { name: "Press Release", link: "PressReleaseDistribution"}, {name: "Brand Story", link: "brand-story" },
    {
      key: "brand",
      label: "Brand",
      icon: "/assets/Brand.svg",
      imageWidth: 23,
      link: "/brand-dashboard",
      items: [],
    },
    {
      key: "social",
      label: "Social",
      imageWidth: 22,
      icon: "/assets/Social.svg",
      link: "#",
      items: [
        { name: "X", link: "X" },
        { name: "Instagram", link: "instagram" },
        { name: "Podcast", link: "podcast" },
      ],
    },
    {
      key: "campaigns",
      label: "Campaigns",
      imageWidth: 26,
      icon: "/assets/Campaign.svg",
      link: "#",
      items: [
        { name: "Create Campaign", link: "campaigns" },
        { name: "Campaign Tracker", link: "campaign-summary" },
        { name: "Media Lists", link: "media-lists" },
      ],
    },
    {
      key: "resources",
      label: "Resources",
      imageWidth: 24,
      icon: "/assets/Resources.svg",
      link: "#",
      items: [
        { name: "Chai Time", link: "tea-time" },
        { name: "Skribe 365", link: "view-skribe365" },
        { name: "Top Journalists", link: "pro-list" },
      ],
    },
    {
      key: "insights",
      label: "Insights",
      imageWidth: 24,
      icon: "/assets/Insights.svg",
      link: "#",
      items: [{ name: "Beat Watch", link: "beat-watch" }],
    },
  ];

  const toggleSection = (key) => {
    setOpenSection(openSection === key ? "" : key);
  };

  return (
    <>
      {mobileLeftMenu && (
        <div className="absolute inset-0 z-[2] bg-gray-600 opacity-60"></div>
      )}

      <nav
        aria-labelledby="sidebar-navigation"
        className={`fixed top-0 left-0 z-[3] h-full transition-all  ease-out animate-slide-right  ${
          sideMenu
            ? "w-48 px-2 pt-6 bg-[#002b5b]"
            : "w-16 px-2 pt-6 bg-[#002b5b] hidden lg:block"
        } ${mobileLeftMenu ? "lg:block" : "hidden lg:block"}`}
      >
        {/* Header */}
        <div
          className={`text-white ${sideMenu ? "flex justify-end" : "flex justify-center"}`}
        >
          {sideMenu ? (
            <>
              {/* <img src={logo} alt="Logo" /> */}
              <div className="bg-[#fac540] w-8 h-8 rounded-full absolute -right-[12px] top-[170px] z-50 flex items-center justify-center cursor-pointer border-[3px] border-[#002b5b]">
                <span
                  onClick={() =>
                    dispatch(mobileLeftMenu ? mobileMenu() : sidebarMenu())
                  }
                  className="material-icons-outlined text-[#002b5b] text-sm icon-32 rotate-180"
                >
                  {mobileLeftMenu ? (
                    "close"
                  ) : (
                    <span className="material-icons-outlined text-[#002b5b] text-sm cursor-pointer">
                      chevron_right
                    </span>
                  )}
                </span>
              </div>
            </>
          ) : (
            <div
              onClick={() => dispatch(sidebarMenu())}
              className="bg-[#fac540] w-8 h-8 rounded-full absolute -right-[12px] top-[170px] z-50 flex items-center justify-center cursor-pointer border-[3px] border-[#002b5b]"
            >
              <span className="material-icons-outlined text-[#002b5b] text-sm icon-32">
                chevron_right
              </span>
            </div>
          )}
          {/* <span
              onClick={() => dispatch(sidebarMenu())}
              className="material-icons-outlined cursor-pointer border p-1 rounded-md text-white"
            >
              menu
            </span> */}
        </div>

        {/* User Info */}
        {/* {sideMenu && userInfo && (
          <Link
            href="#"
            className="my-10 grid grid-cols-[auto_1fr] gap-x-4 border border-gray-500 p-3 rounded-md"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fac540] text-[#002b5b] text-lg uppercase">
              {userInfo.name?.charAt(0)}
            </div>
            <div className="relative overflow-hidden">
              <h3 className="truncate text-sm font-normal text-white">
                {userInfo.name}
                <span className="material-icons-outlined absolute right-0 text-white">
                  arrow_drop_down
                </span>
              </h3>
              <p className="truncate text-xs text-gray-300">{userInfo.email}</p>
            </div>
          </Link>
        )} */}

        {/* Menu Sections */}
        <ul className="flex flex-col gap-y-7 mt-20">
          {sections?.length > 0 &&
            sections?.map(({ key, label, icon, imageWidth, items, link }) => (
              <li key={key} className="flex flex-col relative items-start">
                <div
                  className={`${sideMenu ? "flex gap-x-2 items-center" : "flex gap-x-4 items-center self-center"}`}
                >
                  {/* <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fac540] text-[#002b5b] text-sm">
                    {icon}
                  </span> */}

                  <div className="w-6 flex justify-center items-center">
                    <img src={icon} alt={label} width={imageWidth} />
                  </div>

                  {sideMenu &&
                    (roleType?.includes("Freebies") && label === "Brand" ? (
                      <Link
                        href="#"
                        onClick={() => showPopup()}
                        className="flex flex-1 items-center gap-x-2"
                      >
                        <span className="text-white text-sm w-[110px]">
                          {label}{" "}
                          <HeaderLock
                            left="-right-[10px]"
                            top="top-[3px]"
                            leftPosition="-left-[0px]"
                            topPosititon="top-[38px]"
                            title="Feature Locked!"
                          />
                        </span>

                        {items?.length > 0 && (
                          <span
                            className={`material-icons-outlined ml-auto text-white transition-transform ${
                              openSection === key ? "rotate-180" : ""
                            }`}
                          >
                            arrow_drop_down
                          </span>
                        )}
                      </Link>
                    ) : roleType?.includes("Freebies") &&
                      label === "Regional Media" ? (
                      <Link
                        to="#"
                        onClick={() => showPopup()}
                        className="flex flex-1 items-center gap-x-2"
                      >
                        <span className="text-white text-sm w-[130px]">
                          {label}{" "}
                          <HeaderLock
                            left="-right-[10px]"
                            top="top-[5px]"
                            leftPosition="-left-[0px]"
                            topPosititon="top-[38px]"
                            title="Feature Locked!"
                          />
                        </span>

                        {items?.length > 0 && (
                          <span
                            className={`material-icons-outlined ml-auto text-white transition-transform ${
                              openSection === key ? "rotate-180" : ""
                            }`}
                          >
                            arrow_drop_down
                          </span>
                        )}
                      </Link>
                    ) : (
                      <Link
                        href={link}
                        onClick={() => toggleSection(key)}
                        className="flex flex-1 items-center gap-x-2"
                      >
                        <span className="text-white text-sm w-[110px]">
                          {label}
                        </span>
                        {items?.length > 0 && (
                          <span
                            className={`material-icons-outlined ml-auto text-white transition-transform ${
                              openSection === key ? "rotate-180" : ""
                            }`}
                          >
                            arrow_drop_down
                          </span>
                        )}
                      </Link>
                    ))}
                </div>

                {sideMenu && openSection === key && items?.length > 0 && (
                  <ul className="ml-4 mt-5 border-l border-[#fac540] pl-6 text-xs text-gray-400 flex flex-col gap-y-3">
                    {items?.length > 0 &&
                      items?.map((item, idx) => (
                        <MenuData
                          role={roleType}
                          showPopup={showPopup}
                          key={idx}
                          id={idx}
                          linking={item?.link}
                          description={item?.name}
                        />
                      ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
