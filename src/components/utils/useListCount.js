import { useEffect, useState } from "react";
import userService from "../../Services/user.service";
import { LISTCOUNT } from "../../constants";

const useListCount = (ids) => {
  const [journalistCount, setjournalistCount] = useState([]);
  const [mediaCount, setMediaCount] = useState([]);
  const [languageCount, setLanguageCount] = useState([]);
  const [locationCount, setLocationCount] = useState([]);
  const [mediaTypes, setMediaTypes] = useState([]);
  const postData = {journalistIds: ids};

  useEffect(() => {
    if(ids.length>0){
      getList(`${LISTCOUNT}`);
    }
  }, []);

  const getList = (url) => {
    userService.post(url, postData).then((result) => {
      if (result?.response?.status === "Ok") {
        setjournalistCount(result?.counts.jourCount);
        setMediaCount(result?.counts.mediaCount);
        setLanguageCount(result?.counts.languageCount);
        setLocationCount(result?.counts.locationCount);
        setMediaTypes(result?.counts.medias);
      }
    });
  };
  return { journalistCount, mediaCount, languageCount, locationCount, mediaTypes };
};

export default useListCount;
