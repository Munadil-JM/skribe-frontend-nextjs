"use client";

import userService from "../../Services/user.service";
import { journalist_API } from "../../constants";
import { queryKeys } from "../../reactQuery/constants";
// import axios from "axios";
import { useQuery } from "react-query";

async function journalistProfile(id) {
  try {
    const result = await userService.get(`${journalist_API}${id}`);
    if (result?.response?.status === "Ok") {
      return result.data;
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    // You can customize the error object here if needed
    throw error?.response?.data?.status || { message: "Something went wrong" };
  }
}

export function useJournalistProfile(id) {
  const fallback = {};

  const {
    data = fallback,
    isLoading,
    error,
    isError,
  } = useQuery([queryKeys.JOURNALISTPROFILE, id], () => journalistProfile(id));

  return {
    journalistProfileData: data,
    isLoadingJournalistProfile: isLoading,
    journalistProfileError: error,
    isJournalistProfileError: isError,
    fallback,
  };
}
