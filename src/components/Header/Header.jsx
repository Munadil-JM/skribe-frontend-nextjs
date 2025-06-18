"use client";

import React, { useEffect, useState } from "react";
// import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import parse from "html-react-parser";

// import { MaterialIcon } from "material-icons";
import { useDispatch, useSelector } from "react-redux";
import ErrorToast from "../utils/ErrorToast";
import {
  FREEBIES_EXPIRE_DAYS,
  logout_API,
  ACTIVE_ANNOUNCEMENT,
} from "../../constants";
import SessionOut from "../SessionOut/SessionOut";
// import { mobileMenu } from "../../Redux/Action/Settings";
import { useRef } from "react";
import service from "../../Services/auth.service";
import Searchbar from "./Searchbar";
import { USERINFO } from "../../constants";
import userService from "../../Services/user.service";
import logo from "../assets/skribe-logo.png";
import TawkMessenger from "../Chat/TawkMessenger";
import tokenService from "../../Services/token.service";
import Tooltip from "../Tooltip/Tooltip";
import LockTooltip from "../Tooltip/LockTooltip";
import LockTooktip from "../Tooltip/LockTooltip";
import HeaderLock from "../Tooltip/HeaderLock";
import MorePower from "./MorePower";
import { usePopup } from "./CreatePopup";
import ErrorAlerts from "../ErrorAlert/ErrorAlerts";
const Header = React.memo(() => {
  const openDD = useRef();
  const closeDD = useRef();
  const openDD1 = useRef();
  const closeDD1 = useRef();
  const [socialDropDown, setSocialDropDown] = useState(false);
  const [campaignDropDown, setCampaignDropDown] = useState(false);
  const [stripLoading, setStripLoading] = useState(false);

  const [showNotification, setShowNotification] = useState(() => {
    const stored = localStorage.getItem("strip");
    return stored !== "false";
  });
  const [stripData, setStripData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [roleType, setRoleType] = useState(tokenService.getLocalRole());
  const [remaingDays, setRemainingDays] = useState(null);
  const { showPopup } = usePopup();
  const pathname = usePathname();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // const errorAlert = useSelector((state) => state.settings.errorAlert);
  // const warningAlert = useSelector((state) => state.settings.warningAlert);
  // const successAlert = useSelector((state) => state.settings.successAlert);
  // let roleType = tokenService.getLocalRole(); test changes
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     localStorage.clear();
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);
  const FreeDays = async () => {
    try {
      let response = await userService.get(FREEBIES_EXPIRE_DAYS);

      if (response?.response?.status === "Ok") {
        setRemainingDays(response?.remainingDays || null);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (roleType?.includes("Freebies")) {
      FreeDays();
    }
  }, [roleType]);

  useEffect(() => {
    if (remaingDays === 0) {
      showPopup();
    }
  }, [remaingDays]);
  const mobileView = () => {
    setMobileMenu(true);
  };
  const mainNav = [
    {
      name: "Home",
      //url: "journalist-search",
      url: "/dashboard",
    },

    // {
    //   name: "Brand",
    //   url: "brandDashboard",
    // },

    // {
    //   name: "Social",
    //   url: "",
    //   children: [
    //     {
    //       name: "X",
    //       url: "X",
    //     },
    //     {
    //       name: "Instagram",
    //       url: "instagram",
    //       // url: "insta-detail",
    //     },
    //     {
    //       name: "Podcast",
    //       url: "podcast",
    //     },
    //   ],
    // },
    // {
    //   name: "Campaigns",
    //   url: "",
    //   children: [
    //     {
    //       name: "Create Campaign",
    //       url: "campaigns",
    //       // url: "insta-detail",
    //     },
    //     {
    //       name: "Campaign Tracker",
    //       url: "campaign-summary",
    //     },
    //     {
    //       name: "Media Lists ",
    //       url: "mediaLists",
    //     },
    //   ],
    // },

    {
      name: "MyCRM",
      url: "/mycrm",
    },

    // {
    //   name: "Top Journalists",
    //   url: "/pro-list",
    // },
    // {
    //   name: "Campaigns",
    //   url: "campaign-manager",
    // },
  ];

  const applogout = async () => {
    await userService
      .post(`Authenticate/logout`, "")
      .then((res) => {})
      .catch(() => {});
    localStorage.clear();
    service.logout();
    window.location.href = "/";
  };

  useEffect(() => {
    window.addEventListener("click", outSide);
    return () => {
      document.removeEventListener("click", outSide);
    };
  }, []);
  const outSide = (e) => {
    if (openDD.current && !openDD.current.contains(e.target)) {
      setSocialDropDown(false); // Close dropdown if clicked outside
    }

    if (openDD1.current && !openDD1.current.contains(e.target)) {
      setCampaignDropDown(false); // Close dropdown if clicked outside
    }
    // if (closeDD.current && !closeDD.current.contains(e.target)) {
    //   setSocialDropDown(true);
    // }
  };

  const postTracking = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const Url = pathname.split("/");

    const pageName = Url[1] || "home";

    let pageId;
    if (
      [
        "journalist-by-outlet",
        "OutletEditor",
        "BureauChief",
        "Columnist",
        "Supplements",
        "International",
      ].includes(pageName)
    ) {
      pageId = Url[3] || "";
    }
    if (["create-campaign"].includes(pageName)) {
      pageId = Url[2] || "";
    } else if (["viewList"].includes(pageName)) {
      pageId = Url[3] || "";
    } else {
      pageId = Url[2] || "";
    }
    const trackingData = {
      userId: userInfo?.id,
      pageName: pageName,
      clickId: pageId,
    };
    userService
      .post(`PostTracking`, trackingData)
      .then((res) => {
        console.log("Tracking data posted successfully");
      })
      .catch((error) => {
        console.log(error, "Error posting tracking data");
      });
  };
  useEffect(() => {
    postTracking();
  }, [pathname]);

  const stripAnnouncement = () => {
    setStripLoading(true);
    userService
      .get(ACTIVE_ANNOUNCEMENT)
      .then((result) => {
        if (result?.response?.status === "Ok") {
          setStripData(result?.data);
        } else {
          console.log(result, "check else condition");
        }
      })
      .catch((error) => {
        console.log(error, "error in catch");
      })
      .finally(() => {
        setStripLoading(false);
      });
  };
  useEffect(() => {
    stripAnnouncement();
  }, []);
  // [FOLLOWING GA TRACKING CODE GIVEN BY RAZI ON 06/02/2025 START]
  // const GA_TRACKING_ID = "G-L6REHKD7DC";
  // useEffect(() => {
  //   const initializeGA = () => {
  //     try {
  //       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //       const userId = userInfo?.name || ""; // Update source as needed
  //       const userName = userInfo?.agencyName || "";
  //       const formattedUsername = `${userId}(${userName})`; // Update source as needed
  //       const script = document.createElement("script");
  //       script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  //       script.async = true;
  //       document.head.appendChild(script);
  //       script.onload = () => {
  //         window.dataLayer = window.dataLayer || [];
  //         function gtag() {
  //           window.dataLayer.push(arguments);
  //         }
  //         window.gtag = gtag;
  //         gtag("js", new Date());
  //         gtag("config", GA_TRACKING_ID);
  //         gtag("config", GA_TRACKING_ID, {
  //           user_id: userId,
  //         });

  //         gtag("set", "user_properties", {
  //           ActiveUsers: formattedUsername,
  //           SkribeClients: userName,
  //         });
  //       };
  //     } catch (error) {
  //       console.error("Error initializing Google Analytics:", error);
  //     }
  //   };
  //   initializeGA();
  // }, []);
  useEffect(() => {
    const currentPath = pathname;

    if (currentPath === "/press-release") {
      // Always hide on this route
      setShowNotification(false);
    } else {
      // Only show if user hasn't manually closed it
      const stored = localStorage.getItem("strip");
      if (stored !== "false") {
        setShowNotification(true);
      }
    }
  }, [pathname]);

  const handleClose = () => {
    localStorage.setItem("strip", "false");
    setShowNotification(false);
  };
  return (
    <>
      {typeof remaingDays === "number" &&
        roleType?.includes("Freebies") &&
        remaingDays <= 7 && (
          <p className="bg-red-500 text-white text-sm py-2 z-50 fixed text-center bottom-0 left-0 right-0">
            {`Your trial period ends in ${remaingDays} days. Please upgrade to a paid plan to continue using Skribe.`}
          </p>
        )}
      <TawkMessenger />
      {/* {roleType?.includes("Freebies") && ( */}

      {/* <SessionOut /> */}
      {!isOnline && <ErrorToast msg="It seems your Internet is not working" />}
      {/* {errorAlert.msg && erroractive && <ErrorToast msg={errorAlert.msg} />}
      {warningAlert.msg && warningactive && (
        <WarningToast msg={warningAlert.msg} />
      )}
      {successAlert.msg && successactive && (
        <SuccessToast msg={successAlert.msg} />
      )} */}
      {/* bg-[#f7f7aa] */}
      <ErrorAlerts />
      <header className={`${mobileMenu ? "absolute" : "sticky"}  top-0 z-50`}>
        {showNotification && stripData[0]?.isActive && (
          //bg-[#f7f7aa]
          <div className="text-sm text-center flex items-center justify-center gap-x-4 p-1 bg-white">
            {parse(stripData[0]?.content || "")}
            <span
              className="material-icons-outlined icon-16 bg-[#ccc] cursor-pointer hover:bg-[#acac62] text-gray-800 p-1 rounded-sm"
              onClick={handleClose}
            >
              close
            </span>
          </div>
        )}

        <div className="flex flex-col-reverse justify-between border-b border-t  border-gray-300 bg-white p-3 md:flex-row md:items-center lg:flex-row">
          <Searchbar />
          <div className="flex items-center justify-between mb-4 gap-x-3 md:mb-0">
            <div className="flex flex-row gap-2">
              <Link
                href={""}
                onClick={() => mobileView()}
                className="lg:hidden"
              >
                <span className="px-3 py-2 text-lg text-white border border-white rounded-lg material-icons-outlined hover:text-white">
                  menu
                </span>
              </Link>
              <div className="pr-2 lg:hidden">
                <Link href="/dashboard">
                  <img src={logo.src} alt="image" width="80" />
                </Link>
              </div>
            </div>

            <ul
              role="Primary Navigation"
              aria-label="Main Navigation"
              className={`${
                mobileMenu
                  ? "fixed block z-[70] inset-0 p-10 bg-[#002b5b]"
                  : "hidden"
              }  pb-5 gap-x-5 md:pb-0 lg:flex items-center text-sm`}
            >
              {roleType?.includes("Freebies") && remaingDays !== null && (
                <>
                  <span className="bg-[#002b5b] md:text-[8px] xl:text-[10px] font-medium text-white p-[2px] px-2 rounded-md  flex items-center gap-x-1 lg:absolute right-[20px] -top-1 xl:static">
                    <span className="material-icons-outlined icon-14">
                      history
                    </span>
                    {`${remaingDays} Days Left`}{" "}
                  </span>
                </>
              )}
              {mobileMenu && (
                <>
                  <span
                    onClick={() => setMobileMenu(!mobileMenu)}
                    className="material-icons-outlined text-white absolute top-10 right-10"
                  >
                    close
                  </span>
                  <h3 className="text-white text-xl font-medium border-b border-gray-500 pb-1 mb-2">
                    Main Menu
                  </h3>
                </>
              )}{" "}
              {mainNav.map((curElem, index) => (
                <React.Fragment key={index}>
                  {curElem?.name === "Social" ? (
                    <li className="relative pb-4 lg:pb-0">
                      <span
                        ref={openDD}
                        className="flex items-center text-white cursor-pointer gap-x-1"
                        onClick={() => setSocialDropDown(!socialDropDown)}
                      >
                        {curElem.name}
                        {curElem?.children?.length > 0 && (
                          <span
                            className={
                              socialDropDown
                                ? "material-icons-outlined icon-16 rotate-180 transition-all duration-500"
                                : "material-icons-outlined icon-16 -rotate-360 transition-all duration-500"
                            }
                          >
                            expand_more
                          </span>
                        )}
                      </span>
                      {socialDropDown && curElem?.name === "Social" && (
                        <ul
                          ref={closeDD}
                          className={`${
                            mobileMenu ? "static" : "absolute bg-[#6521AD] mt-2"
                          } -left-1 w-32  shadow-2xl`}
                        >
                          {curElem?.children?.map((childElem, childIndex) => (
                            <li key={childIndex}>
                              <Link
                                className="block px-2 py-1 text-white hover:bg-[#591b9b]"
                                href={childElem.url}
                                onClick={() =>
                                  mobileMenu && setMobileMenu(!mobileMenu)
                                }
                              >
                                {childElem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : curElem?.name === "Campaigns" ? (
                    <li className="relative pb-4 lg:pb-0">
                      <span
                        ref={openDD1}
                        className="flex items-center text-white cursor-pointer gap-x-1"
                        onClick={() => setCampaignDropDown(!campaignDropDown)}
                      >
                        {curElem.name}
                        {curElem?.children?.length > 0 && (
                          <>
                            <span
                              className={
                                campaignDropDown
                                  ? "material-icons-outlined icon-16 rotate-180 transition-all duration-500"
                                  : "material-icons-outlined icon-16 -rotate-360 transition-all duration-500"
                              }
                            >
                              expand_more
                            </span>
                            <span className="absolute right-0 -top-4 text-[11px] bg-white text-gray-600 rounded-lg px-1 py-0 leading-4">
                              Beta
                            </span>
                          </>
                        )}
                      </span>
                      {campaignDropDown && curElem?.name === "Campaigns" && (
                        <ul
                          ref={closeDD1}
                          className={`${
                            mobileMenu ? "static" : "absolute mt-2 bg-[#6521AD]"
                          } -left-1  w-44  shadow-2xl text-sm`}
                        >
                          {curElem?.children?.map((childElem, childIndex) => (
                            <li key={childIndex}>
                              <Link
                                className="flex gap-x-2 px-2 py-1 text-white hover:bg-[#591b9b]"
                                href={childElem.url}
                                onClick={() =>
                                  mobileMenu && setMobileMenu(!mobileMenu)
                                }
                              >
                                {childElem.name}{" "}
                                {/* <span className="self-center text-[11px] bg-white text-gray-600 rounded-lg px-1 py-0 leading-4">
                                Beta
                              </span> */}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : // Check roleType and conditionally render the "Brand" tab
                  roleType?.includes("Agency") && curElem?.name !== "Brand" ? (
                    <li key={index} className="relative">
                      <Link
                        href={curElem.url}
                        className="flex items-center gap-x-1"
                        onClick={() => mobileMenu && setMobileMenu(!mobileMenu)}
                      >
                        {curElem.name}
                      </Link>
                    </li>
                  ) : roleType?.includes("Freebies") &&
                    curElem?.name === "Brand" ? (
                    <li
                      key={index}
                      onClick={() => showPopup()}
                      className="cursor-pointer relative flex items-center gap-x-1 text-gray-800"
                    >
                      {curElem.name}
                      <HeaderLock
                        left="-right-[18px]"
                        top="top-[3px]"
                        leftPosition="-left-[0px]"
                        topPosititon="top-[38px]"
                        title="Feature Locked!"
                      />
                    </li>
                  ) : roleType?.includes("Freebies") &&
                    curElem?.name !== "Brand" ? (
                    <li
                      key={index}
                      className="relative flex items-center gap-x-1 text-gray-800"
                    >
                      {" "}
                      <Link
                        href={curElem.url}
                        className="flex items-center text-gray-800 gap-x-1"
                        onClick={() => mobileMenu && setMobileMenu(!mobileMenu)}
                      >
                        {curElem.name}
                      </Link>
                    </li>
                  ) : (
                    roleType?.includes("Enterprise") && (
                      <li key={index} className="relative pb-4 lg:pb-0">
                        <Link
                          href={curElem.url}
                          className="flex items-center text-gray-800 gap-x-1"
                          onClick={() =>
                            mobileMenu && setMobileMenu(!mobileMenu)
                          }
                        >
                          {curElem.name}
                        </Link>
                      </li>
                    )
                  )}
                </React.Fragment>
              ))}
              {/* [/ROLE BASED NAVIGATION END]*/}
            </ul>

            <div className="flex leading-none gap-x-3">
              {/* <Link href="Geo Location">
              <span className="text-lg text-white material-icons-outlined">
                settings
              </span>
            </Link> */}
              {/* accountSettings */}
              {/* <Link href="changePassword">
                <span className="text-lg text-gray-800 material-icons-outlined">
                  apps
                </span>
              </Link> */}
              <span
                // onClick={() => alert("Notification will be received")}
                className="relative cursor-pointer"
              >
                <span className="text-lg text-gray-800 material-icons-outlined">
                  notifications
                </span>
                {/* <span className="absolute right-[2px] top-[3px] block h-2 w-2 rounded-full bg-red-500"></span> */}
              </span>

              {/* <span
                //onClick={() => dispatch(logOut(logout_API, authToken))}
                onClick={applogout}
                className="text-lg text-gray-800 cursor-pointer material-icons-outlined"
              >
                power_settings_new
              </span> */}
            </div>

            {/* //add after loagin username */}
            <div
              className="flex cursor-pointer gap-x-2 items-center relative"
              ref={openDD}
              onClick={() => setSocialDropDown((prev) => !prev)}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f1f1e6] text-[#002b5b] text-lg uppercase">
                {userInfo?.name?.charAt(0)}
              </div>
              <div className="relative overflow-hidden">
                <div className="text-sm font-normal text-gray-700 flex items-center">
                  <span className="text-nowrap"> {userInfo?.name}</span>
                  <span className="material-icons-outlined text-gray-700">
                    arrow_drop_down
                  </span>
                </div>
              </div>
              {socialDropDown && (
                <div
                  className="absolute right-0 top-10 text-sm text-gray-700 bg-white shadow-lg rounded-md p-2 w-[160px]"
                  ref={openDD1}
                >
                  <div className="leading-7 flex flex-col">
                    <Link
                      href="/change-password"
                      className="hover:bg-gray-300 px-2 py-0"
                    >
                      Forgot Password
                    </Link>
                    <Link
                      href="#"
                      onClick={applogout}
                      className="hover:bg-gray-300 px-2 py-0"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <MorePower
          open={isOpen}
          onClose={() => {
            document.body.classList.remove("overflow-hidden");
            setIsOpen(!isOpen);
          }}
        /> */}
        </div>
      </header>
    </>
  );
});

export default Header;
