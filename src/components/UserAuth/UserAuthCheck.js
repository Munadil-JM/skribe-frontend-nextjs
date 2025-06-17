import { useAuth } from "./AppProvider";
import { checkRole } from "./CheckRole";
// import { useEffect } from "react";

const UserAuthCheck = ({ children, path }) => {
  // const navigate = useNavigate();
  const token = localStorage.getItem("user");
  const { user } = useAuth();
  // useEffect(() => {
  //   if (!token || !checkRole(user, path)) {
  //  navigate("/dashboard");
  //   }
  // }, [token, user, path, navigate]);

  return token && checkRole(user, path) ? children : null;
};

export default UserAuthCheck;
