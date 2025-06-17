"use client";

import { useEffect, useRef, useState } from "react";
import { TawkLiveChat } from "tawk-react";

const TawkMessenger = () => {
  const [AllInfo, setAllInfo] = useState({}); // Initialize with an empty object
  const tawkMessengerRef = useRef();
  const [isTawkLoaded, setIsTawkLoaded] = useState(false);
  const [getInfo, setGetInfo] = useState(null);

  useEffect(() => {
    const info = localStorage.getItem("userInfo");
    if (info) {
      setGetInfo(JSON.parse(info));
    }
  }, []);

  // const userInfo = async () => {
  //   try {
  //     const output = await userService.get(USERINFO);
  //     const result = output?.data;

  //     setAllInfo(result);
  //   } catch (error) {
  //     console.error("Error fetching user info:", error);
  //   }
  // };
  // useEffect(() => {
  //   userInfo();
  // }, []);

  useEffect(() => {
    if (!tawkMessengerRef.current || !isTawkLoaded || !getInfo) return;

    if (getInfo?.name && getInfo?.email) {
      tawkMessengerRef.current.setAttributes(
        {
          name: getInfo.name,
          email: getInfo.email,
          phone: getInfo.phoneNumber,
          hash: "hash-value",
        },
        function (error) {
          if (error) {
            console.error("Error setting Tawk attributes:", error);
          }
        }
      );
    } else {
      console.warn("AllInfo is missing name or email:", AllInfo);
    }
  }, [getInfo, isTawkLoaded]);

  return (
    <TawkLiveChat
      propertyId="66502ec29a809f19fb345a68"
      widgetId="1hukjdabn"
      ref={tawkMessengerRef}
      onLoad={() => {
        setIsTawkLoaded(true);
      }}
    />
  );
};

export default TawkMessenger;
