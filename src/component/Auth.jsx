import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleProvider, auth } from "../config/firebase";
import "./Auth.css"
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(auth?.currentUser?.email);
  const navigate = useNavigate();
  const signin = async () => {
    navigate(+1);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
       
    } catch (err) {
      console.log(err);
    }
  };
  const signinwithGoogle = async () => {
    try {
      await signInWithPopup(auth, GoogleProvider);
      
    } catch (err) {
      console.log(err);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="box">
      <input
        className="box_email"
        value={email}
        placeholder="  Email..."
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="box_password"
        value={password}
        type="assword"
        placeholder="  Password..."
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="box_signin" onClick={signin}>Sign in</button>
      <button className="box_google" onClick={signinwithGoogle}>Sign in with google</button>
      <button className="box_logout" onClick={logout}>Logout</button>
    </div>
  );
};
