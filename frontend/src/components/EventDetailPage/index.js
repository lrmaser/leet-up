import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { getEventDetails, deleteEvent } from '../../store/events';
import './EventDetail.css';

// Refactor to get full day name and full month name
const formatFullDate = (date) => {
  const dateString = new Date(date).toDateString();
  const dateStringSplit = dateString.split(' ');
  const formattedDate = `${dateStringSplit[0]}, ${dateStringSplit[1]} ${dateStringSplit[2]}, ${dateStringSplit[3]}`;
  return formattedDate;
};

const formatTime = (time) => {
  const timeString = new Date(time).toLocaleTimeString();
  const timeStringSplit = timeString.split(':');
  const formattedTime = `${timeStringSplit[0]}:${timeStringSplit[1]} ${timeStringSplit[2][3]}M`;
  return formattedTime;
};

const EventDetailPage = () => {
  const { eventId } = useParams();
  const history = useHistory();
  const event = useSelector(state => state.events[eventId]);
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();

  const [ attend, setAttend ] = useState('Attend');

  useEffect(() => {
    dispatch(getEventDetails(eventId));
  }, [dispatch, eventId]);

  const handleEdit = async (e) => {
    e.preventDefault();
    history.push(`/events/${eventId}/edit`);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (window.confirm(`Are you sure you'd like to delete ${event.name}?`)) {
      dispatch(deleteEvent(eventId));
      history.push('/events');
    } else {
      history.push(`/events/${eventId}`);
    }
  };

  const handleAttend = async (e) => {
    e.preventDefault();

    if (attend === 'Attend') {
      setAttend('Attending')
    } else {
      setAttend('Attend');
    }
  };

  if (!event) return null;

  // If user hosts event, show edit/delete buttons, else show attend event button
  let eventButtons;
  if (sessionUser && sessionUser.id === event.hostId) {
    eventButtons = (
      <div className='event-details-buttons'>
        <button type='button' onClick={handleEdit}>Edit</button>
        <button type='button' onClick={handleDelete}>Delete</button>
      </div>
    );
  } else if (sessionUser && sessionUser.id !== event.hostId) {
    eventButtons = (
      <div className='event-details-buttons'>
        <button type='button' onClick={handleAttend}>{attend}</button>
      </div>
    );
  }

  return (
    <main className='event-details-main'>
      <div className='event-details-top'>
        <div className='event-details-headers'>
          <span>{`${formatFullDate(event.date)} @ ${formatTime(event.date)}`}</span>
          <h1>{event.name}</h1>
          <div className='event-details-host-container'>
            <div className='event-details-host-icon'>
              <i className="fas fa-user-circle"></i>
            </div>
            <div className='event-details-host-info'>
              <div>Hosted By</div>
              <div className='event-details-host-name'>{event?.User?.username}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='event-details-bottom'>
        <div className='event-details-bottom-contents'>
          <div className='event-details-left-container'>
            <div className='event-details-left'>
              <div className='event-details-image-details'>
                <div className='event-details-image'>
                  <img src={event.image.length > 0 ? event.image : 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'} alt='Event'></img>
                </div>
                <div className='event-details-details-container'>
                  <h2 className='event-details-details-header'>Details</h2>
                  <p className='event-details-details'>{event.details}</p>
                </div>
              </div>
              <div className='event-details-attendees-container'>
                <h2 className='event-details-attendees-header'>
                  {/* Replace hardcoded attendees */}
                  Attendees (0)
                </h2>
                <div className='event-details-attendees'>
                  {/* Component for attendees? */}
                </div>
              </div>
            </div>
          </div>
          <div className='event-details-right-container'>
            <div className='event-details-right'>
              <div className='event-details-group-container'>
                <div className='event-details-group'>
                  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEBsn_UBdDUqkiMUoOQYUjLRQB6D4UC_fdFg&usqp=CAU' alt='Group of People Icons'></img>
                  <span>{event?.Group?.name}</span>
                </div>
              </div>
              {eventButtons}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetailPage;
