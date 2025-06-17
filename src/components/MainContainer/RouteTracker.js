"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const RouteTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    const previousRoute = localStorage.getItem("currentRoute");

    if (previousRoute) {
      localStorage.setItem("previousRoute", previousRoute);
    }

    localStorage.setItem("currentRoute", pathname);
  }, [pathname]);

  return null;
};

export default RouteTracker;
