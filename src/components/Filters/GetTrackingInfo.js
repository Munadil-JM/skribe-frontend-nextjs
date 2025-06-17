"use client";

import userService from "../../Services/user.service";
import { POSTTRACK } from "../../constants";

const GetTrackingInfo = (type, id, urlRead, userId, trackingId) => {
  //console.log(type, id, path, userId, trackingId);
  //const trackingData = [type, id, path, userId, trackingId];
  const trackingData = {
    userId: userId,
    pageName: urlRead,
    pageId: trackingId,
    type: type,
    clickId: id,
  };
  userService
    .post(POSTTRACK, trackingData)
    .then(() => {
      console.log("Tracking data posted successfully");
    })
    .catch((error) => {
      console.error("Error posting tracking data:", error);
    });
};

export default GetTrackingInfo;
