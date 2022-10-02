import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import FirebaseProvider from "../back-end/authContext";
import "../back-end/firebaseConfig/init";
import analytics from "../utils/analytics";
import { useEffect } from "react";
import onRouteChange from "@analytics/router-utils";
import "../styles/global.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // run function on when all providers are finished loading
    //analytics.ready(()=>{
    analytics.page();
    //})
    // run function on route change
    onRouteChange(() => {
      analytics.page();
    });
  }, [analytics]);

  return (
    <FirebaseProvider>
      <Layout>
        <html data-theme="corporate"></html>
        <Component {...pageProps} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Layout>
    </FirebaseProvider>
  );
}
export default MyApp;
