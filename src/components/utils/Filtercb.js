import userService from "../../Services/user.service";

export const getFilter = async (url) => {
  const { filters } = await userService.get(url);
  return filters;
};
