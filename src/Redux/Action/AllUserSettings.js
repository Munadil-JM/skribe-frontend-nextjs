const emptyGEO = () => {
  return {
    type: "EMPTY_GEO",
  };
};

const selectGeo = (selectedData) => {
  return {
    type: "ALL_GEO_SELECTED_DATA",
    payload: selectedData,
  };
};
const clickedData = (data, checkStatus) => {
  return {
    type: "CLICKED_DATA",
    payload: [data, checkStatus],
  };
};

export { clickedData, selectGeo, emptyGEO };
