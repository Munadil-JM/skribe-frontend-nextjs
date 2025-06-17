import { useEffect, useState } from "react";
import userService from "../../Services/user.service";
import { GETLISTSENDMAIL } from "../../constants";

const useGetListSendMail = (id) => {
  const [ccSuggestions, setCcSuggestions] = useState([]);
  const [emailSignature, setEmailSignature] = useState("");
  const [getmailCount, setEmailCount] = useState("");
  const [getEmail, setEmail] = useState("");

  useEffect(() => {
    if (id !== "" && id !== null) {
      getList(`${GETLISTSENDMAIL}${id}`);
    }
  }, []);

  const getList = (url) => {
    userService.get(url).then((result) => {
      if (result?.response?.status === "Ok") {
        setCcSuggestions(result?.userInfoCc);
        setEmailSignature(result?.emailSignature[0].emailSignature);
        setEmailCount(result?.listTo.listMail);
        setEmail(result?.listTo.mail);
      }
    });
  };
  return { ccSuggestions, emailSignature, getmailCount, getEmail };
};

export default useGetListSendMail;
