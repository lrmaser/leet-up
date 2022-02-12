import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { updateGroup } from '../../store/groups';
import './EditGroupForm.css';

const EditGroupForm = ({ groups }) => {
  const { groupId } = useParams();
  const group = groups[groupId];

  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const [ name, setName ] = useState(group.name);
  const [ details, setDetails ] = useState(group.details);
  const [ errors, setErrors ] = useState([]);

  const updateName = (e) => setName(e.target.value);
  const updateDetails = (e) => setDetails(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors([]);

    const payload = {
      ...group,
      name,
      details
    };

    return dispatch(updateGroup(payload))
      .then(() => history.push(`/groups/${groupId}`))
      // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) setErrors(data.errors);
      // });

    // Add cancel option
  };


  return (
    <main className='group-form-main'>
      <div className='group-form-container'>
        <form onSubmit={handleSubmit}>
          <h2>Edit a Group</h2>
          {/* <ul className='group-form-errors'>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul> */}
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
        </form>
      </div>
    </main>
  );
};

export default EditGroupForm;
