import React, { useRef } from 'react';
import { auth } from '../firsbase';
import './SignInScreen.css';

export default function SignInScreen() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="signInScreen">
      <form action="">
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signInScreen_gray">New to Netflix?</span>{' '}
          <span className="signInScreen_link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}
