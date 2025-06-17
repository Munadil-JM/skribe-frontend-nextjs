const initialState = {
  allUserInfo: [],
};
const UserInfoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ALL_USER_INFO": {
      return {
        ...state,
        allUserInfo: payload,
      };
    }
    default:
      return state;
  }
};
export default UserInfoReducer;
