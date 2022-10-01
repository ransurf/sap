import type { NextPage } from 'next'
import Head from 'next/head'
import {useState} from 'react'
import { useAuth } from '../back-end/authContext'
import * as APIFirebase from '../back-end/functions'

const Home: NextPage = () => {
  const { user , loading} = useAuth()
  const [ email , setEmail ] =  useState<string>('')
  const [ password , setPassword ] =  useState<string>('')

  if(loading) return null

  if(user) return <h1>U already logged</h1>

  const createUserCredentials = async () => {
  const request = await APIFirebase.signUp(
    email,
    password,
  );
  if (!request) {
    console.log("Signup Failed!");
  } else {
    console.log("Signup Successful!");
  }
}

  
const loginWithGoogle = async () => {
    const request = await APIFirebase.signUpGoogle(
    );
    if (!request) {
      console.log("Signup With Google Failed!");
    } else {
      console.log("Signup With Google Successful!");
    }
}

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>

      <div className="m-auto my-24 w-1/3 h-1/3 divide-y-4 space-y-1"> 
          <div className="space-y-1">
              <input type="email" onChange={(e) => setEmail(e.target.value)} className="border border-current	" /><br />
              <input type="password" onChange={(e) => setPassword(e.target.value)} className="border border-current	"/><br />
              <button onClick={createUserCredentials}>Signup</button>
          </div>
          <div>
              <button onClick={loginWithGoogle}>Login with Google</button>
          </div>
      </div>
    </>
  )
}

export default Home
