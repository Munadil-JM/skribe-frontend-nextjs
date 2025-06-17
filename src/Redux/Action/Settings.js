import { v4 as uuidv4 } from "uuid";

const mobileMenu = () => {
  return {
    type: "MOBILE_LFET_MENU",
  };
};

const sidebarMenu = () => {
  return {
    type: "SIDEBAR_MENU",
  };
};

// GET GEO
const StoreStates = (data) => {
  return {
    type: "STORE_STATES",
    payload: data,
  };
};

// GET Medi Types
const getAllMediaTypes = (data) => {
  return {
    type: "STORE_MEDIATYPES",
    payload: data,
  };
};

// CUSTOM RANGE DATA ON BEAT WATCH PAGE
const prevData = (val, data) => {
  return {
    type: val,
    payload: data,
  };
};

// ADD BEATS
const beatsData = (beatData) => {
  return {
    type: "SELECTED_BEATS",
    payload: beatData,
  };
};
// ADD COMPETITORS
const CompData = (data) => {
  return {
    type: "COMPETITOR_DATA",
    payload: data,
  };
};
// REMOVE COMPETITORS
const RComp = (data) => {
  return {
    type: "REMOVE_COMP",
    payload: data,
  };
};
// TOPICS DATA
const TopicsData = (data) => {
  return {
    type: "TOPICS_DATA",
    payload: data,
  };
};

// REMOVE TOPICS
const RTopic = (data) => {
  return {
    type: "REMOVE_TOPIC",
    payload: data,
  };
};

//ERROR ALERT DISPATCH
const ErrorAlert = (errorMSG) => {
  let genId = uuidv4();
  return {
    type: "ERROR_ALERT",
    payload: {
      msg: errorMSG,
      trigger: genId,
    },
  };
};

//REPORT PAGE TAB SELECTED
const tabSelect = (data) => {
  return {
    type: "REPORT_TAB_SELECTED",
    payload: data,
  };
};

//WARNING ALERT DISPATCH
const WarningAlert = (warningMSG) => {
  let genId = uuidv4();
  return {
    type: "WARNING_ALERT",
    payload: {
      msg: warningMSG,
      trigger: genId,
    },
  };
};

//SUCCESS ALERT DISPATCH
const SuccessAlert = (sucessMSG) => {
  let genId = uuidv4();
  return {
    type: "SUCCESS_ALERT",
    payload: {
      msg: sucessMSG,
      trigger: genId,
    },
  };
};

export {
  mobileMenu,
  sidebarMenu,
  StoreStates,
  getAllMediaTypes,
  prevData,
  beatsData,
  CompData,
  RComp,
  TopicsData,
  RTopic,
  WarningAlert,
  SuccessAlert,
  ErrorAlert,
  tabSelect,
};
