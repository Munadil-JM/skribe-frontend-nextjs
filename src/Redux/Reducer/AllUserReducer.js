const initialState = {
  selectedGeo: [],
  add: [],
  remove: [],
};

// type: "ALL_GEO_DATA",
// payload:allData,

const AllUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ALL_GEO_SELECTED_DATA": {
      return {
        ...state,
        selectedGeo: payload,
      };
    }

    case "CLICKED_DATA": {
      let data = { intGeoId: payload[0] };
      let checkStatus = payload[1];
      let status = state.selectedGeo.findIndex(
        (ele) => ele.intGeoId == data.intGeoId
      );

      if (status !== -1 && checkStatus === true) {
        return {
          ...state,
          remove: [...state.remove, state.selectedGeo[status]],
        };
      } else if (status !== -1 && checkStatus === false) {
        let flag = state.remove.findIndex(
          (ele) => ele.intGeoId === data.intGeoId
        );

        if (flag !== -1) {
          state.remove.splice(flag, 1);
        }
        return {
          ...state,
          remove: [...state.remove],
        };
      } else {
        if (status === -1 && checkStatus === false) {
          return {
            ...state,
            add: [...state.add, data],
          };
        } else {
          let flag = state.add.findIndex(
            (ele) => ele.intGeoId === data.intGeoId
          );

          if (flag !== -1) {
            state.add.splice(flag, 1);
          }

          return {
            ...state,
            add: [...state.add],
          };
        }
      }
    }

    case "EMPTY_GEO": {
      return {
        ...state,
        add: [],
        remove: [],
      };
    }

    default:
      return state;
  }
};

export default AllUserReducer;
