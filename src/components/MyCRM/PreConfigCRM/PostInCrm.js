import { PRECRM_POSTDATA } from "../../../constants";
// import { SuccessAlert } from "../../../Redux/Action/Settings";
import userService from "../../../Services/user.service";
// import { useNotification } from "../../ErrorAlert/ErrorContextNotification";

const PostInCrm = async (data, showNotification) => {
  const success = (msg, type) => showNotification(msg, type);
  // const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);
  try {
    let { id } = JSON.parse(localStorage.getItem("userInfo"));
    const postData = {
      clientId: 0,
      userId: id,
      jourId: data,
    };
    userService.post(PRECRM_POSTDATA, postData).then((dataSubmit) => {
      if (dataSubmit?.response?.status === "Ok") {
        success(dataSubmit?.response?.message, "success");
      }
    });
  } catch (error) {
    console.log(error?.message);
  }
};
export default PostInCrm;
