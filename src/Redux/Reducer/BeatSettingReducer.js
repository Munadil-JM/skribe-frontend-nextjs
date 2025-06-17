const initialState = {
  selectedBeat: [],
  add: [],
  remove: [],
};

// type: "ALL_GEO_DATA",
// payload:allData,

const BeatSettingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ALL_BEAT_SELECTED_DATA": {
      return {
        ...state,
        selectedBeat: payload,
      };
    }

    case "CLICKED_BEAT_DATA": {
      let data = { intBeatId: payload[0] };
      let checkStatus = payload[1];
      let status = state.selectedBeat.findIndex(
        (ele) => ele.intBeatId === data.intBeatId
      );

      if (status !== -1 && checkStatus === true) {
        return {
          ...state,
          remove: [...state.remove, state.selectedBeat[status]],
        };
      } else if (status !== -1 && checkStatus === false) {
        let flag = state.remove.findIndex(
          (ele) => ele.intBeatId === data.intBeatId
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
            (ele) => ele.intBeatId === data.intBeatId
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

    case "EMPTY_BEAT": {
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

export default BeatSettingReducer;
