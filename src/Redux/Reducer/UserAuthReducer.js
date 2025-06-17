// const accessLocal = () => {
//   const userToken = localStorage.getItem("userToken");
//   if (userToken) {
//     return userToken;
//   } else {
//     return "";
//   }
// };

const initialState = {
  failure: false,
  loading: false,
  //authToken: accessLocal(),
  //refreshToken: "",
};
const UserAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHLOADING": {
      return { ...state, loading: true };
    }
    // case "REFRESH_TOKEN": {
    //   localStorage.setItem("refreshToken", action.payload);
    //   return {
    //     ...state,
    //     refreshToken: action.payload,
    //   };
    // }

    case "AUTHSUCCESS": {
      localStorage.setItem("userToken", action.payload);
      return {
        ...state,
        isLoading: true,
        authToken: action.payload,
      };
    }
    case "AUTHFAILURE": {
      return {
        ...state,
        failure: true,
        loading: false,
      };
    }
    //case "LOGOUT": {
    //console.log(action.payload,"custom logout message")
    //   localStorage.clear();
    // localStorage.removeItem("userToken");
    // localStorage.removeItem("refreshToken");
    // localStorage.removeItem("AllStates");
    // localStorage.removeItem("allMediaTypes");
    //   return {
    //     ...state,
    //     loading: false,
    //     authToken: "",
    //   };
    // }
    case "PASSTOKEN": {
      return {
        ...state,
        passToken: action.payload,
      };
    }
    default:
      return state;
  }
};

export default UserAuthReducer;
