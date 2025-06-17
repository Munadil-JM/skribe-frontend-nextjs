import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
// import { useDispatch, useSelector } from "react-redux";
//import { logOut, refreshT } from "../../Redux/Action/UserAuth";
// import { logout_API, REFRESHTOKEN_API } from "../../constants";

const SessionOut = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [timer, setTimer] = useState(-1);
  // const dispatch = useDispatch();
  //  const token = useSelector((state) => state.auth.authToken);
  const token = localStorage.getItem("userToken");
  //const { authToken, refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (timer === 1) {
      document.body.classList.remove("overflow-hidden");
      //dispatch(logOut(logout_API, token));
    }
  }, [timer]);

  // let localToken = localStorage.getItem("userToken");
  // let localRefreshToken = localStorage.getItem("refreshToken");
  const expireTime = localStorage.getItem("expireTime");
  const checkForInactivity = () => {
    if (expireTime < Date.now()) {
      setLoggedIn(false);
      setTimer(50);
    }
  };

  const updateExpireTime = () => {
    const expireTime = Date.now() + 1000 * 60;
    localStorage.setItem("expireTime", expireTime);
  };

  const continueSession = (data) => {
    const expireTime = Date.now() + 1000 * 60;
    setTimer(-1);
    setLoggedIn(true);
    localStorage.setItem("expireTime", expireTime);
    document.body.classList.remove("overflow-hidden");

    //dispatch(refreshT(REFRESHTOKEN_API, localToken, localRefreshToken));
  };

  // access token expire hota hai with in 15 min,
  // access token and refresh token ki help se new access token genrate hoga
  // refresh token expire time 15 mins hai abhi k liy.

  //REFRESH TOKEN UPDATE LOGIC
  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity();
      //dispatch(refreshT(REFRESHTOKEN_API, localToken, localRefreshToken));
    }, 1000 * 50);

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    updateExpireTime();
    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);
    return () => {
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
    };
  }, []);

  useEffect(() => {
    if (timer > 0) {
      let st = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(st);
    }
  }, [loggedIn, timer]);

  useEffect(() => {
    if (!loggedIn) {
      document.body.classList.add("overflow-hidden");
    }
  }, [loggedIn]);

  return createPortal(
    <div>
      {!loggedIn && (
        <div>
          <div className="fixed inset-0 z-[4] bg-gray-700 opacity-70 "></div>
          <div className="fixed left-1/2 top-1/2 z-[5] w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4 shadow-2xl md:w-3/5 lg:w-2/5 xl:w-1/5">
            <div className="flex flex-col justify-start gap-y-1 px-5 py-2">
              <h2 className="text-md text-gray-800">Session Expiry Warning</h2>
              <div>
                <p className="text-sm text-gray-500">
                  Your session is about to expire. You will be automatically
                  logged out in {timer} seconds
                </p>
              </div>
              <div className="flex flex-col gap-x-3 gap-y-3 pt-3 sm:flex-row md:gap-3">
                <button
                  // onClick={() => dispatch(logOut(logout_API, token))}
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm font-normal text-gray-500 hover:border-gray-600 hover:text-gray-800"
                >
                  Log Out
                </button>
                <button
                  onClick={() => continueSession(1)}
                  className="rounded-md border border-orange-400 px-4 py-2 text-sm font-normal text-orange-400 hover:bg-orange-400 hover:text-white"
                >
                  Continue Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.getElementById("portal")
  );
};

export default SessionOut;
