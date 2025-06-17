const MediaSettingAction = (selectedData) => {
  return {
    type: "ALL_MEDIA_SELECTED_DATA",
    payload: selectedData,
  };
};

const clickedMediaData = (data, checkStatus) => {
  //console.log("CLICKED DATA", data);
  return {
    type: "CLICKED_MEDIA_DATA",
    payload: [data, checkStatus],
  };
};

const emptyMEDIATYPE = () => {
  return {
    type: "EMPTY_MEDIATYPE",
  };
};
export { MediaSettingAction, clickedMediaData, emptyMEDIATYPE };
