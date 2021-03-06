import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as sessionActions from '../../store/session';

const ProfileButton = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ showMenu, setShowMenu ] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  return (
    <>
      <button className='user-icon-button' onClick={openMenu}>
        <div className='user-icon'>
          <i className="fas fa-user"></i>
        </div>
      </button>
      {showMenu && (
        <ul className='profile-dropdown'>
          <li>{user.username}</li>
          {/* <li>{user.email}</li> */}
          <li>
            <button className='profile-dropdown-logout' onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
};

export default ProfileButton;
