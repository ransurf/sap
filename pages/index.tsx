import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import { useAuth } from "../back-end/authContext";
import * as APIFirebase from "../back-end/functions";
import analytics from "../utils/analytics";
import React from "react";
const Home: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, loading } = useAuth();
  if (loading) return null;

  if (user) return <h1>U already logged</h1>;

  const loginWithGoogle = async () => {
    const request = await APIFirebase.signUpGoogle();
    if (!request) {
      console.log("Signin With Google Failed!");
    } else {
      console.log("Signin With Google Successful!", request);
      analytics.identify(`${request.uid}`, {
        email: request.email,
        name: request.displayName,
      });
      analytics.track(`user-signed-in`);
      Router.push("/dashboard");
    }
  };

  return (
    <>
      <Head>
        <title>Signin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="m-auto my-24 w-1/4 h-1/3 divide-y-4 space-y-1 justify-center">
        {/* <input type="email" placeholder="email" className="input input-bordered w-full max-w-xs" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="password" className="input input-bordered w-full max-w-xs" onChange={(e) => setPassword(e.target.value)}/>
            <button className="btn btn-wide justify-center" onClick={login}>Login</button> */}
        <button
          className="btn btn-wide"
          onClick={() => {
            loginWithGoogle();
          }}
        >
          Login with Google
        </button>
      </div>
    </>
  );
};

export default Home;
