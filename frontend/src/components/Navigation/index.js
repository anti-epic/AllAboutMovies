import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if(sessionUser) {
    sessionLinks = (
      <div className='navUserInfo'>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className='navButton'>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    );
  }

  return (
    <div className='NavBarContainer'>
      <div className='NavHomeButton'>


        <NavLink exact to="/" className="navTitle">   <img className='NavLogoImage' src="/abm-logo.png" />All About Movies</NavLink>
      </div>
      <div>




      {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
