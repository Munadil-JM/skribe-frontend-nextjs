"use client";
// import { ChakraProvider } from "@chakra-ui/react";
// import theme from "./theme"; // Assuming the theme.js file is in the src folder
// import AppRoute from "./AppRoutes";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "../reactQuery/queryClient";
import MainContainer from "../components/MainContainer/MainContainer";
import CacheBuster from "react-cache-buster";
import Loader from "../components/Loader/Loader";
import AppProvider from "../components/UserAuth/AppProvider";
import ErrorContextNotification from "../components/ErrorAlert/ErrorContextNotification";
// import "../index.css";
// import "../styles/layout.css";

// const theme = extendTheme({
//   colors: {
//     brand: {
//       900: "#1a365d",
//       800: "#153e75",
//       700: "#2a69ac",
//     },
//   },
// });

export default function Providers({ children }) {
  const [appVersion, setAppVersion] = useState("");

  useEffect(() => {
    fetch("/version.json")
      .then((res) => res.json())
      .then((data) => setAppVersion(data.version))
      .catch((error) => {
        console.error("Error fetching version.json:", error);
      });
  }, []);

  return (
    <>
      <CacheBuster
        currentVersion={appVersion}
        isEnabled={true}
        isVerboseMode={false}
        loadingComponent={<Loader />}
        metaFileDirectory={"."}
        metaFileName="version.json"
      >
        {/* <ChakraProvider> */}
        {/* <ChakraProvider theme={theme}> */} {/* Pass custom theme here */}
        {/* <ErrorContextNotification> */}
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <MainContainer>{children}</MainContainer>
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
        {/* </ErrorContextNotification> */}
        {/* </ChakraProvider> */}
      </CacheBuster>
    </>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<RouterProvider router={AppRoute} />);
