const BeatSettingAction = (selectedData) => {
  return {
    type: "ALL_BEAT_SELECTED_DATA",
    payload: selectedData,
  };
};

const clickedBeatData = (data, checkStatus) => {
  //console.log("CLICKED DATA", data);
  return {
    type: "CLICKED_BEAT_DATA",
    payload: [data, checkStatus],
  };
};

const emptyBEAT = () => {
  return {
    type: "EMPTY_BEAT",
  };
};

export { BeatSettingAction, clickedBeatData, emptyBEAT };
