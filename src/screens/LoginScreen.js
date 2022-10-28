import React, { useState } from 'react';
import './LoginScreen.css';
import SignInScreen from './SignInScreen';

export default function LoginScreen() {
  const [siginIn, setSignIn] = useState(false);

  return (
    <div className="loginScreen">
      <div>
        <img
          className="loginScreen_logo"
          src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=684&h=456"
          alt="Netflix Logo"
        />
        <button
          className="loginScreen_button"
          onClick={() => {
            setSignIn(true);
          }}
        >
          Sign In
        </button>

        <div className="loginScreen_gradient" />
        <div className="loginScreen_body">
          {siginIn ? (
            <SignInScreen />
          ) : (
            <>
              <h1>Unlimited movies, TV shows, and more.</h1>
              <h2>Watch anywhere. Cancel at any time.</h2>
              <h3>
                Ready to watch? Enter you email to create or restart your
                membership.
              </h3>
              <div className="loginScreen_input">
                <form action="">
                  <input type="email" placeholder="Email Adress" />
                  <button
                    className="loginScreen_getStarted"
                    onClick={() => {
                      setSignIn(true);
                    }}
                  >
                    Get Started
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
