import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalMenuItem from './OpenModalMenuItem';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import * as sessionActions from '../../store/session';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import { useHistory } from "react-router-dom";
function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  let sessionLinks;
  const history = useHistory()
  const handleSubmit = (e) => {
    const credential = 'Demo-lition';
    const password = 'password'
    return dispatch(sessionActions.login({ credential, password })).then(history.push('/'))
      .catch(
        async (res) => {
          const data = await res.json();
        }
      );
  }


  if(sessionUser) {
    sessionLinks = (<div className='navSessionContainer'>
        <NavLink className='NavbarWatchlist' to={`/watchlist`}>WatchList</NavLink>
      <div className='navUserInfo'>
        <ProfileButton user={sessionUser} />
      </div>
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
        <OpenModalMenuItem
          itemText="Demo User"
          onItemClick={handleSubmit}
          />
          <i className="fa-solid fa-clapperboard"></i>
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
