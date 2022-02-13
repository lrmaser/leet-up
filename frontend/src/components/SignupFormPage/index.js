import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import './SignupForm.css';

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ age, setAge ] = useState(false);
  const [ errors, setErrors ] = useState([]);

  if (sessionUser) return (
    <Redirect to='/'/>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ username, email, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  let errorBox;
  if (errors.length > 0) {
    errorBox = (
      <div className='signup-form-errors'>
        <p>The following error(s) occurred:</p>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
    );
  } else {
    errorBox = null;
  }

  return (
    <main className='signup-main'>
      <div className='signup-form-container'>
        <form onSubmit={handleSubmit}>
          <div className='signup-headers'>
            <img src='/images/LeetUpLogo.png' alt='LeetUp Logo'></img>
            <h1>Sign Up</h1>
          </div>
          {errorBox}
          <div className='signup-form-contents'>
            <div className='signup-name-container'>
              <label htmlFor='signup-name'>Username</label>
                <input
                  type='text'
                  id='signup-name'
                  name='signup-name'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
            </div>
            <div className='signup-email-container'>
              <label htmlFor='signup-email'>Email Address</label>
                <input
                  type='text'
                  id='signup-email'
                  name='signup-email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='example@email.com'
                  required
                />
            </div>
            <div className='signup-password-container'>
              <label htmlFor='signup-password'>Password</label>
                <input
                  type='password'
                  id='signup-password'
                  name='signup-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
            </div>
            <div className='signup-confirm-password-container'>
              <label htmlFor='signup-confirm-password'>Confirm Password</label>
                <input
                  type='password'
                  id='signup-confirm-password'
                  name='signup-confirm-password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
            </div>
            <div className='signup-age-container'>
              <label htmlFor='signup-age'>Age</label>
                <div className='signup-age-input'>
                  <input
                    type='checkbox'
                    id='signup-age'
                    name='signup-age'
                    value={age}
                    onChange={(e) => setAge(e.target.checked)}
                    required
                  />
                  <span>I am 18 years of age or older.</span>
                </div>
            </div>
            <button type='submit' className='signup-form-button'>Sign Up</button>
          </div>
          <div className='signup-already-member'>
            <span>Already a member?</span>
            <LoginFormModal />
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignupFormPage;
