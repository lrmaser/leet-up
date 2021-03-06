import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createGroup } from '../../store/groups';
import './GroupForm.css';

const GroupFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const [ name, setName ] = useState('');
  const [ details, setDetails ] = useState('');
  const [ errors, setErrors ] = useState([]);

  const updateName = (e) => setName(e.target.value);
  const updateDetails = (e) => setDetails(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      ownerId: sessionUser.id,
      name,
      details
    };

    return dispatch(createGroup(payload))
      .then(() => history.push('/groups'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push('/groups');
  };

  let errorBox;
  if (errors.length > 0) {
    errorBox = (
      <div className='group-form-errors'>
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
    <main className='group-form-main'>
      <div className='group-form-container'>
        <form onSubmit={handleSubmit}>
          <h2>Create a Group</h2>
          {errorBox}
          <div className='group-form-name-container'>
            <label htmlFor='group-form-name'>Group Name</label>
            <input
              type='text'
              id='group-form-name'
              name='group-form-name'
              value={name}
              onChange={updateName}
              required
            />
          </div>
          <div className='group-form-details-container'>
            <label htmlFor='group-form-details'>Group Details</label>
            <textarea
              id='group-form-details'
              name='group-form-details'
              value={details}
              onChange={updateDetails}
              rows='8'
            />
          </div>
          <button type='submit' className='group-form-button'>Submit</button>
          <button type='button' className='group-form-button' onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </main>
  );
};

export default GroupFormPage;
