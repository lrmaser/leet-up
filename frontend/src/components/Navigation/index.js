import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to='/groups/new'>Start a New Group</NavLink>
        <NavLink to='events/new'>Create an Event</NavLink>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to='/signup'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className='nav-ul'>
      <li>
        <div className='nav-container'>
          <div className='nav-logo'>
            <NavLink exact to='/'>
              <img src='/images/LeetUpLogo.png' alt='LeetUp Logo'></img>
            </NavLink>
          </div>
          <div className='nav-links'>
            {isLoaded && sessionLinks}
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Navigation;
