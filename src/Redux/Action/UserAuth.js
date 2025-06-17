// import { LOGINAPI } from "../../constants";
// import { changePassAfterLogin } from "../../constants";
// import { FORGOTTOKEN } from "../../constants";
// import { WarningAlert, ErrorAlert, SuccessAlert } from "./Settings";
// import { MAILPASSRESET } from "../../constants";
// import axios from "axios";

// const UserAuth = (creds) => async (dispatch) => {
//   try {
//     dispatch({ type: "AUTHLOADING" });
//     let response = await axios.post(LOGINAPI, creds);
//     let { accessToken, refreshToken } = await response.data;
//     dispatch({
//       type: "AUTHSUCCESS",
//       payload: accessToken,
//     });
//     dispatch({
//       type: "REFRESH_TOKEN",
//       payload: refreshToken,
//     });
//   } catch (error) {
//     dispatch({
//       type: "AUTHFAILURE",
//     });
//   }
// };

//dispatch(refreshT(REFRESHTOKEN_API,authToken,refreshToken));

// const refreshT = (refreshAPI, tk, rToken) => async (dispatch) => {
//   const regenToken = {
//     accessToken: tk,
//     refreshToken: rToken,
//   };
//   console.log("going to refresh my token via refresh api in UserAuth.js");
//   try {
//     let response = await axios.post(refreshAPI, regenToken);
//     let { accessToken, refreshToken } = await response.data;
//     dispatch({
//       type: "AUTHSUCCESS",
//       payload: accessToken,
//     });
//     dispatch({
//       type: "REFRESH_TOKEN",
//       payload: refreshToken,
//     });
//   } catch (error) {
//     dispatch({
//       type: "AUTHFAILURE",
//     });
//   }
// };

//const PassToken = (email) => async (dispatch) => {
// try {
//   const passLink = await axios.get(
//     //FORGOTTOKEN + email + "&Url=http://localhost:3000/reset-password"
//     FORGOTTOKEN + email + "&Url=http://localhost:3000/reset-password"
//   );
//   const datas = passLink.data.response.message;
//   dispatch(SuccessAlert(datas));
// } catch (error) {
//   dispatch(ErrorAlert(error.message));
//   //console.log(error.message);
// }
//};

//const ResetMailPassword = (data) => async (dispatch) => {
// try {
//   let fData = await axios.post(MAILPASSRESET, data, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (fData.data.status === "error") {
//     dispatch(WarningAlert(fData.data.message));
//   } else if (fData.data.response.status === "Success") {
//     setTimeout(() => {
//       window.location.replace("/");
//     }, 5000);
//     dispatch(SuccessAlert(fData.data.response.message));
//   }
// } catch (error) {
//   dispatch(ErrorAlert(error));
// }
//};
//const changePassAfter = (data, token) => async (dispatch) => {
// try {
//   let response = await axios.post(changePassAfterLogin, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   dispatch(SuccessAlert(response.data.message));
// } catch (error) {
//   console.log(error);
//   dispatch(ErrorAlert(error));
// }
//};
// const logOut = (LOGOUT__API, token) => async (dispatch) => {
//   try {
//     let fData = await axios.post(
//       LOGOUT__API,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     const datas = fData.data.response.message;
//     dispatch(SuccessAlert(datas));
//     dispatch({
//       type: "LOGOUT",
//       payload: datas,
//     });
//   } catch (error) {
//     //dispatch(ErrorAlert(error));
//     console.log(error);
//   }
// };

//export default ResetMailPassword;
//UserAuth,
//refreshT,
//PassToken,
//changePassAfter,
//logOut,
