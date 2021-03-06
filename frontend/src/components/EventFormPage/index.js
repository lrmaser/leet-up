import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createEvent } from '../../store/events';
import { getGroups } from '../../store/groups';
import './EventForm.css';

const defaultDate = () => {
  // yyyy-mm-dd
  const date = new Date().toISOString().slice(0, 10);
  return date;
};

const EventFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);
  const allGroupsObj = useSelector(state => state.groups.groups);
  const allGroups = Object.values(allGroupsObj);
  const groups = allGroups.filter(group => sessionUser.id === group.ownerId);

  const [ categoryId, setCategoryId ] = useState('');
  const [ name, setName ] = useState('');
  const [ date, setDate ] = useState(`${defaultDate()}`);
  const [ time, setTime ] = useState('09:00');
  const [ capacity, setCapacity ] = useState(1);
  const [ image, setImage ] = useState('');
  const [ details, setDetails ] = useState('');
  const [ errors, setErrors ] = useState([]);

  const updateCategoryId = (e) => setCategoryId(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDate = (e) => setDate(e.target.value);
  const updateTime = (e) => setTime(e.target.value);
  const updateCapacity = (e) => setCapacity(e.target.value);
  const updateImage = (e) => setImage(e.target.value);
  const updateDetails = (e) => setDetails(e.target.value);

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      hostId: sessionUser.id,
      categoryId,
      name,
      date: `${date} ${time}`,
      capacity,
      image,
      details
    };

    return dispatch(createEvent(payload))
      .then(() => history.push('/events'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push('/events');
  };

  let errorBox;
  if (errors.length > 0) {
    errorBox = (
      <div className='event-form-errors'>
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
    <main className='event-form-main'>
      <div className='event-form-container'>
        <form onSubmit={handleSubmit}>
          <h2>Create an Event</h2>
          {errorBox}
          <div className='event-form-group-container'>
            <label htmlFor='event-form-group'>Hosting Group</label>
            <select
              id='event-form-group'
              name='event-form-group'
              value={categoryId}
              onChange={updateCategoryId}
            >
              <option value=''>Please choose an option</option>
              {groups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
            </select>
          </div>
          <div className='event-form-name-container'>
            <label htmlFor='event-form-name'>Event Name</label>
            <input
              type='text'
              id='event-form-name'
              name='event-form-name'
              value={name}
              onChange={updateName}
              required
            />
          </div>
          <div className='event-form-date-and-time'>
            <div className='event-form-date-container'>
              <label htmlFor='event-form-date'>Event Date</label>
              <input
                type='date'
                id='event-form-date'
                name='event-form-date'
                value={date}
                onChange={updateDate}
                required
              />
            </div>
            <div className='event-form-time-container'>
              <label htmlFor='event-form-time'>Event Time</label>
              <input
                type='time'
                id='event-form-time'
                name='event-form-time'
                value={time}
                onChange={updateTime}
                required
              />
            </div>
          </div>
          <div className='event-form-capacity-container'>
            <label htmlFor='event-form-capacity'>Capacity</label>
            <input
              type='number'
              id='event-form-capacity'
              name='event-form-capacity'
              value={capacity}
              onChange={updateCapacity}
              required
            />
          </div>
          <div className='event-form-image-container'>
            <label htmlFor='event-form-image'>Image URL</label>
            <input
              type='text'
              id='event-form-image'
              name='event-form-image'
              value={image}
              onChange={updateImage}
              placeholder='Paste copied image address here'
            />
          </div>
          <div className='event-form-details-container'>
            <label htmlFor='event-form-details'>Event Details</label>
            <textarea
              id='event-form-details'
              name='event-form-details'
              value={details}
              onChange={updateDetails}
              rows='8'
            />
          </div>
          <button type='submit' className='event-form-button'>Submit</button>
          <button type='button' className='event-form-button' onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </main>
  );
};

export default EventFormPage;
