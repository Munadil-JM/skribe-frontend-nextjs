"use client";

import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { changePassAfterLogin } from "../../constants";
// import { changePassAfter } from "../../Redux/Action/UserAuth";
import userService from "../../Services/user.service";
import { useNotification } from "../ErrorAlert/ErrorContextNotification";

const ChangePassword = () => {
  // const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const success = (msg, type) => showNotification(msg, type);
  const warning = (msg, type) => showNotification(msg, type);
  // const error = (msg, type) => showNotification(msg, type);
  const [pass, setPass] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  // const { authToken, refreshToken } = useSelector((state) => state.auth);
  const changePass = (e) => {
    const { name, value } = e.target;
    setPass({
      ...pass,
      [name]: value,
    });
  };
  const clearValue = () => {
    setPass({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  const submitData = (e) => {
    e.preventDefault();
    if (!pass.oldPassword) {
      warning("Please enter current password", "warning");
      return;
    }
    if (!pass.newPassword) {
      warning("Please enter new password", "warning");
      return;
    }
    if (!pass.confirmPassword) {
      warning("Please enter confirm password", "warning");
      return;
    }
    if (pass.newPassword !== pass.confirmPassword) {
      warning("Your password does not match the confirm password", "warning");
      return;
    } else {
      //dispatch(changePassAfter(pass, token));
      userService
        .post(changePassAfterLogin, pass)
        .then((output) => {
          if (output?.status === "ResetContent") {
            success("Password Changed Successfully.", "success");
            clearValue();
          }
        })

        .catch((errori) => {
          const errors = errori?.response?.data?.errors;

          if (errors?.NewPassword && errors.NewPassword.length > 0) {
            if (
              errors.NewPassword[0] ===
              "The New password must be at least 6 characters long."
            ) {
              warning(errors.NewPassword[0], "warning");
            }
          }

          if (errors?.ConfirmPassword && errors.ConfirmPassword.length > 0) {
            if (
              errors.ConfirmPassword[0] ===
              "The new password and confirmation password do not match."
            ) {
              warning(errors.ConfirmPassword[0], "warning");
            }
          }

          if (errori?.response?.data?.status === "BadRequest") {
            warning(
              "Password must be at least 6 characters and include one uppercase letter, one number, and one special character.",
              "warning"
            );
          }
        });
    }
  };

  return (
    <div className="w-5/5 border-gray-200 px-8 md:border-l lg:w-3/5 xl:w-2/5">
      <h3 className="text-md font-medium text-gray-600">Change Password</h3>
      <p className="text-xs text-gray-400">
        Password should be case sensitive includes Alpha numeric and special
        Charactor
      </p>
      <form>
        <div className="mt-2 flex flex-col gap-4 xl:flex-row xl:gap-8">
          <div className="flex flex-auto flex-col">
            <label className="text-xs font-normal text-gray-400">
              Current Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={pass.oldPassword}
              className="rounded-md border border-gray-500 p-3 py-1 focus:outline-none "
              onChange={(e) => changePass(e)}
            />
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-4 xl:flex-row xl:gap-8">
          <div className="flex flex-auto flex-col">
            <label className="text-xs font-normal text-gray-400">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={pass.newPassword}
              className="rounded-md border border-gray-500 p-3 py-1  focus:outline-none "
              onChange={(e) => changePass(e)}
            />
          </div>
        </div>
        <div className="mt-2 flex flex-col gap-4 xl:flex-row xl:gap-8">
          <div className="flex flex-auto flex-col">
            <label className="text-xs font-normal text-gray-400">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={pass.confirmPassword}
              className="rounded-md border border-gray-500 p-3 py-1  focus:outline-none"
              onChange={(e) => changePass(e)}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:gap-4">
          <div className="flex gap-2">
            <input
              type="submit"
              value="Change Password"
              className="cursor-pointer rounded-md border border-[#002b5b] px-3 py-1 text-xs text-[#002b5b] hover:bg-[#002b5b] hover:text-white"
              onClick={submitData}
            />
            <input
              type="button"
              value="Clear"
              className=" cursor-pointer rounded-md border border-gray-400 px-3 py-1 text-xs text-gray-400 hover:bg-gray-400 hover:text-white"
              onClick={() => clearValue()}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
