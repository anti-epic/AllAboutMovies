import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button  className="userNavButton" onClick={openMenu}>
      <i class="fa-regular fa-circle-user fa-2xl"></i>
      </button>
      <div className="userNavMenu">
      <ul className={ulClassName} ref={ulRef}>
        <div>username: {user.username}</div>
        <div>name: {user.firstName} {user.lastName}</div>
        <div>email: {user.email}</div>
        <div>
          <button onClick={logout}>Log Out</button>
        </div>
      </ul>
      </div>
    </>
  );
}

export default ProfileButton;
