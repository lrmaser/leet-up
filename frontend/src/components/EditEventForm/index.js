import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { updateEvent } from '../../store/events';
import { getGroups } from '../../store/groups';
import './EditEventForm.css';

// Format date in yyyy-mm-dd
const formatDate = (date) => {
  const formattedDate = new Date(date).toISOString().slice(0, 10);
  return formattedDate;
};

// Format time in hh:mm
const formatTime = (time) => {
  const timeString = new Date(time).toTimeString();
  const timeStringSplit = timeString.split(':');
  const formattedTime = `${timeStringSplit[0]}:${timeStringSplit[1]}`;
  return formattedTime;
};

const EditEventForm = ({ events }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { eventId } = useParams();
  const event = events[eventId];

  const sessionUser = useSelector(state => state.session.user);
  const allGroupsObj = useSelector(state => state.groups.groups);
  const allGroups = Object.values(allGroupsObj);
  const groups = allGroups.filter(group => sessionUser.id === group.ownerId);

  const [ categoryId, setCategoryId ] = useState(event.categoryId);
  const [ name, setName ] = useState(event.name);
  const [ date, setDate ] = useState(formatDate(event.date));
  const [ time, setTime ] = useState(formatTime(event.date));
  const [ capacity, setCapacity ] = useState(event.capacity);
  const [ image, setImage ] = useState(event.image);
  const [ details, setDetails ] = useState(event.details);
  const [ errors, setErrors ] = useState([]);

  const updateCategoryId = (e) => setCategoryId(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDate = (e) => setDate(e.target.value);
  const updateTime = (e) => setTime(e.target.value);
  const updateCapacity = (e) => setCapacity(e.target.value);
  const updateImage = (e) => setImage(e.target.value);
  const updateDetails = (e) => setDetails(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      ...event,
      hostId: sessionUser.id,
      categoryId,
      name,
      date: `${date} ${time}`,
      capacity,
      image,
      details
    };

    return dispatch(updateEvent(payload))
      .then(() => history.push(`/events/${eventId}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push(`/events/${eventId}`);
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
          <h2>Edit an Event</h2>
          {errorBox}
          <div className='event-form-group-container'>
            <label htmlFor='event-form-group'>Hosting Group</label>
            <select
              id='event-form-group'
              name='event-form-group'
              value={categoryId}
              onChange={updateCategoryId}
              required
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

export default EditEventForm;
