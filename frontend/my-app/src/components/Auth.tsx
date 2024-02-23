import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase";

const SignInWithGoogle = () => {
  signInWithPopup(auth, provider);
};

const Auth = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl">Googleで認証</h1>
      <button
        onClick={SignInWithGoogle}
        className="w-32 h-9 rounded-xl text-white bg-blue-500 mt-4"
      >
        アカウントを選択
      </button>
    </div>
  );
};

export default Auth;
