const initialState = {
  selectedMedia: [],
  add: [],
  remove: [],
};

// type: "ALL_GEO_DATA",
// payload:allData,

const MediaSettingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ALL_MEDIA_SELECTED_DATA": {
      return {
        ...state,
        selectedMedia: payload,
      };
    }

    case "CLICKED_MEDIA_DATA": {
      let data = { intMediaId: payload[0] };
      let checkStatus = payload[1];
      let status = state.selectedMedia.findIndex(
        (ele) => ele.intMediaId === data.intMediaId
      );

      if (status !== -1 && checkStatus === true) {
        return {
          ...state,
          remove: [...state.remove, state.selectedMedia[status]],
        };
      } else if (status !== -1 && checkStatus === false) {
        let flag = state.remove.findIndex(
          (ele) => ele.intMediaId === data.intMediaId
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
            (ele) => ele.intMediaId === data.intMediaId
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

    case "EMPTY_MEDIATYPE": {
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

export default MediaSettingReducer;
