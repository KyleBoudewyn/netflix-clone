import React, { useState, useEffect } from 'react';
import './Nav.css';

export default function Nav() {
  const [show, handleShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && 'nav_black'}`}>
      <div className="nav_content">
        <img
          className="nav_logo"
          src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=684&h=456"
          alt="Netflix Logo"
        />
        <img
          className="nav_avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="Avatar Image"
        />
      </div>
    </div>
  );
}
