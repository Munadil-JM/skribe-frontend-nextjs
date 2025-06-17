const initialState = {
  reportTabSelected: 0,
  mobileLeftMenu: false,
  mobileFilterView: false,
  sideMenu: false,
  stateData: [],
  selectedMediaTypes: [],
  allBeats: [],
  allArticles: [],
  filterArticles: [],
  competitor: [],
  topics: [],
  errorAlert: {
    msg: "",
    trigger: "",
  },
  warningAlert: {
    msg: "",
    trigger: "",
  },
  successAlert: {
    msg: "",
    trigger: "",
  },
};

const allBeats = (state = initialState, { type, payload }) => {
  switch (type) {
    case "MOBILE_LFET_MENU": {
      return {
        ...state,
        mobileLeftMenu: !state.mobileLeftMenu,
      };
    }

    case "REPORT_TAB_SELECTED": {
      return {
        ...state,
        reportTabSelected: payload,
      };
    }
    case "SIDEBAR_MENU": {
      let handle = !state.sideMenu;
      return {
        ...state,
        sideMenu: handle,
      };
    }
    case "STORE_MEDIATYPES": {
      return {
        ...state,
        selectedMediaTypes: payload,
      };
    }

    case "STORE_STATES": {
      return {
        ...state,
        stateData: payload,
      };
    }
    case "SELECTED_BEATS": {
      return {
        ...state,
        allBeats: payload,
      };
    }
    case "GET_ARTICLES": {
      return {
        ...state,
        allArticles: payload,
        filterArticles: payload,
      };
    }

    // SELECT ALL DATA
    case "SELECT_ALL": {
      return {
        ...state,
        filterArticles: state.allArticles,
      };
    }

    // LAST DAY DATA ON BEAT WATCH PAGE
    case "LAST_DAY": {
      return {
        ...state,
        filterArticles: state.allArticles.filter((curItem) => {
          let databaseDateTime = new Date(curItem.PublishDate);
          //let currentTime = new Date();
          var yesterday = new Date(new Date().getTime() - 48 * 60 * 60 * 1000);
          if (databaseDateTime >= yesterday) {
            return curItem;
          }
        }),
      };
    }

    // PAST WEEK DATA ON BEAT WATCH PAGE
    case "PAST_WEEK": {
      return {
        ...state,
        filterArticles: state.allArticles.filter((curItem) => {
          let dateObj = new Date(curItem.PublishDate);
          let now = new Date();
          let lastSeven = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 7
          );

          if (dateObj >= lastSeven) {
            return curItem;
          }
        }),
      };
    }

    // PAST MONTH DATA ON BEAT WATCH PAGE
    case "PAST_MONTH": {
      let filterPastMonth;

      filterPastMonth = state.allArticles.filter((curItem) => {
        let dateObj = new Date(curItem.PublishDate);
        let month = dateObj.getMonth();
        let year = dateObj.getFullYear();
        let currentDate = new Date();

        if (
          month === currentDate.getMonth() &&
          year === currentDate.getFullYear()
        ) {
          return curItem;
        }
      });
      return {
        ...state,
        filterArticles: filterPastMonth,
      };
    }
    // PAST YEAR DATA ON BEAT WATCH PAGE
    case "PAST_YEAR": {
      let filterPastMonth;

      filterPastMonth = state.allArticles.filter((curItem) => {
        let dateObj = new Date(curItem.PublishDate);
        let year = dateObj.getFullYear();
        let currentDate = new Date();
        if (year === currentDate.getFullYear() - 1) {
          return curItem;
        }
      });
      return {
        ...state,
        filterArticles: filterPastMonth,
      };
    }

    // CUSTOM RANGE DATA ON BEAT WATCH PAGE
    case "CUSTOM_RANGE": {
      let selectArt;

      let startDate = new Date(payload[0]);
      let endDate = new Date(payload[1]);

      selectArt = state.allArticles.filter((curItem) => {
        let dbObj = new Date(curItem.PublishDate);
        if (dbObj >= startDate && dbObj <= endDate) {
          return curItem;
        }
      });
      return {
        ...state,
        filterArticles: selectArt,
      };
    }

    case "COMPETITOR_DATA": {
      if (payload.length > 1) {
        return {
          ...state,
          competitor: payload,
        };
      }
      return {
        ...state,
        competitor: [...state.competitor, payload],
      };
    }

    case "TOPICS_DATA": {
      if (payload.length > 1) {
        return {
          ...state,
          topics: payload,
        };
      }
      return {
        ...state,
        topics: [...state.topics, payload],
      };
    }
    case "REMOVE_TOPIC": {
      let topicRemove = state.topics.filter((curItem) => curItem !== payload);
      return {
        ...state,
        topics: topicRemove,
      };
    }
    case "ERROR_ALERT": {
      return {
        ...state,
        errorAlert: { ...payload },
      };
    }
    case "WARNING_ALERT": {
      return {
        ...state,
        warningAlert: { ...payload },
      };
    }
    case "SUCCESS_ALERT": {
      //alert(payload);
      return {
        ...state,
        successAlert: { ...payload },
      };
    }

    case "REMOVE_COMP": {
      let dataRemove = state.competitor.filter(
        (curItem) => curItem !== payload
      );
      return {
        ...state,
        competitor: dataRemove,
      };
    }

    default:
      return state;
  }
};
export default allBeats;
