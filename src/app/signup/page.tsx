// Sign Up...!

"use client";

import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import { useDispatch } from "react-redux";
import { signUpUser } from "@/redux/actions/auth-actions/auth-actions";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { LOGIN_USER } from "@/redux/reducers/auth-reducer/auth-reducer";


const provider = new GoogleAuthProvider()

const SignUp = () => {
  const [formStates, setFormStates] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
  });

  const dispatch = useDispatch<AppDispatch>();

  const clearAllStates = () => {
    setFormStates({
      name: "",
      email: "",
      password: "",
      loading: false,
    });
  };

  const router = useRouter();

  // Sign Up Handler...!
  const signUpHandler = async() => {
    setFormStates({ ...formStates, loading: true });
    const user = {
      name: formStates.name,
      email: formStates.email,
      password: formStates.password,
    };
    // console.log("User: ", user);
    dispatch(signUpUser(user)).finally(() => {
      clearAllStates();
    });
     try {
     await dispatch(signUpUser(user)); // assume thunk returns promise
    clearAllStates();
    router.push("/login");
  } catch (error: any) {
    if (error.message.includes("already exists")) {
      alert("User already exists! Please login.");
    } else {
      alert("Signup failed: " + error.message);
    }
    setFormStates({ ...formStates, loading: false });
  }
    router.push('/login');
  };

  const haveAccountHandler = () => {
    router.push('/login');
  }

  // Google sign in handler...!
      const googleSignInHandler = async () => {
          try {
              const gooleRes = await signInWithPopup(auth, provider);
              const userDetails = gooleRes?.user;
              console.log('Google user: ', userDetails);
  
              const saveUser = {
                  email: userDetails?.email,
                  uid: userDetails?.uid,
                  name: userDetails?.displayName,
                  dp: userDetails?.photoURL
              };
  
              const googleToken = await userDetails?.getIdToken();
              console.log('Google token: ' , googleToken);
              if (googleToken) {
                  // Saving token...!
                  setCookie('token', googleToken);
  
                  // Saving auth user in redux...!
                  dispatch(LOGIN_USER(saveUser));
  
                  window.location.reload();
              }
          }
  
          catch (error) {
              console.log('Something went wrong while sign un with google: ', error);
          };
          router.push('/home');
      };

  return (
    <div>
      <h1> Sign Up </h1>

      <label htmlFor="username">
        Name :
        <input
        autoFocus
          type="text"
          placeholder="Enter Your Name"
          value={formStates.name}
          onChange={(e) => {
            setFormStates({ ...formStates, name: e.target.value });
          }}
          id="username"
        />
      </label>
      <br />
      <label htmlFor="email">
        Email :
        <input
          type="email"
          placeholder="Enter Your Email"
          value={formStates.email}
          onChange={(e) => {
            setFormStates({ ...formStates, email: e.target.value });
          }}
          id="email"
        />
      </label>
      <br />
      <label htmlFor="password">
        Password :
        <input
          type="password"
          placeholder="*****"
          value={formStates.password}
          onChange={(e) => {
            setFormStates({ ...formStates, password: e.target.value });
          }}
          id="password"
        />
      </label>
      <br />
      <button onClick={signUpHandler}> Sign Up </button> <br />
      <button onClick={haveAccountHandler}> Already have an account? </button>
       <hr />
            <button onClick={googleSignInHandler}> Sign in with Google </button>
    </div>
  );
};

export default SignUp;