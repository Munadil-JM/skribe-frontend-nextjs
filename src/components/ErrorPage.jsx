// import 404error from "../assets/404error.jpg"
// import noUser from "../assets/noUser.png";

import { useRouteError } from "react-router-dom";
import { useRouter } from "next/navigation";
import Error from "../components/assets/Error.jpg";

const ErrorPage = () => {
  const error = useRouteError();
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  if (error.status === 404) {
    return (
      <div className="text-center ">
        <span onClick={goBack} className="cursor-pointer">
          <img src={Error.src} className="mx-auto" />
        </span>
      </div>
    );
  }
};

export default ErrorPage;
