import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import * as sessionActions from '../../store/session';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [ credential, setCredential ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ demo, setDemo ] = useState();
  const [ errors, setErrors ] = useState([]);

  const handleDemo = (e) => {
    setDemo(e.target.checked);

    if (!demo) {
      setCredential('user1@demo.com');
      setPassword('password1');
    } else {
      setCredential('');
      setPassword('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className='login-headers'>
        <img src='/images/LeetUpLogo.png' alt='LeetUp Logo'></img>
        <h1>Log In</h1>
      </div>
      <div className='login-form-contents'>
        <div className='login-email-container'>
          <label htmlFor='login-email'>Email</label>
            <input
              type='text'
              id='login-email'
              name='login-email'
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
        </div>
        <div className='login-password-container'>
          <label htmlFor='login-password'>Password</label>
            <input
              type='password'
              id='login-password'
              name='login-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>
        <div className='login-demo-user'>
          <input
            type='checkbox'
            value={demo}
            onChange={handleDemo}
          />
          <span>Log in as Demo User?</span>
        </div>
        <button type='submit' className='login-form-button'>Log In</button>
      </div>
      <div className='login-not-member'>
        <span>Not a member yet?</span>
        <Link to='/signup'>Sign Up</Link>
      </div>
    </form>
  );
};

export default LoginForm;
