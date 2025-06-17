"use client";

import React, { Suspense } from "react";
import Sidebar from "../Sidebar/Sidebar";
// import Header from "../Header/Header";
import { Poppins } from "next/font/google";

// import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import RouterTracker from "./RouteTracker";
import MainSearchContext from "../../context/MainSearchContext";
import ErrorBoundary from "../ErrorBoundary";
import CreatePopup from "../Header/CreatePopup";
const Header = React.lazy(() => import("../Header/Header"));

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "100", // Thin
    "200", // Extra Light
    "300", // Light
    "400", // Regular
    "500", // Medium
    "600", // Semi Bold
    "700", // Bold
    "800", // Extra Bold
    "900", // Black
  ],
});

const MainContainer = ({ children }) => {
  const { sideMenu } = useSelector((state) => state.settings);

  return (
    <div className={poppins.className}>
      <MainSearchContext>
        <CreatePopup>
          <Sidebar />
          <main
            className={
              !sideMenu
                ? " transition-all lg:ml-[64px]"
                : " transition-all  lg:ml-[192px] lg:mr-[0px]"
            }
          >
            <RouterTracker />
            {/* <main className="transition-all relative"> */}
            <ErrorBoundary>
              <Suspense fallback={""}>
                <Header />
              </Suspense>
              {children}
              {/* <Outlet /> */}
            </ErrorBoundary>
          </main>
        </CreatePopup>
      </MainSearchContext>
    </div>
  );
};

export default MainContainer;
