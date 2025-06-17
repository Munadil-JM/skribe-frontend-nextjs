import { PERMISSION } from "./RoleAccess";

// Convert PERMISSION object keys to lowercase
const lowerCasePermission = Object.keys(PERMISSION).reduce((acc, key) => {
  acc[key.toLowerCase()] = PERMISSION[key];
  return acc;
}, {});

export const checkRole = (role, path) => {
  const pathConvert = path.toLowerCase();
  // const multipleRole = role?.slice(",");

  if (
    role?.some((curElem) => lowerCasePermission[pathConvert]?.includes(curElem))
  ) {
    return true;
  }
  // if (PERMISSION[path]?.includes(role)) {
  //   return true;
  // }
  return false;
};
