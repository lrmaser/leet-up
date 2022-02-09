import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getEventDetails } from '../../store/events';
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
  const event = useSelector(state => state.events[eventId]);
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventDetails(eventId));
  }, [dispatch, eventId]);

  if (!event) return null;

  // If user hosts event, show edit/delete buttons, else show attend event button
  let eventButtons;
  if (sessionUser && sessionUser.id === event.hostId) {
    eventButtons = (
      <div className='event-details-buttons'>
        <button type='button'>Edit</button>
        <button type='button'>Delete</button>
      </div>
    );
  } else if (sessionUser && sessionUser.id !== event.hostId) {
    eventButtons = (
      <div className='event-details-buttons'>
        <button type='button'>Attend</button>
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
              {/* <img></img> */}
            </div>
            <div className='event-details-host-info'>
              <div>Hosted By</div>
              <div>{event.hostId}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='event-details-bottom'>
        <div className='event-details-left-container'>
          <div className='event-details-left'>
            <div className='event-details-image-details'>
              <div className='event-details-image'>
                <img src={event.image} alt='Event'></img>
              </div>
              <div className='event-details-details-header'>Details</div>
              <div className='event-details-details'>{event.details}</div>
            </div>
            <div className='event-details-attendees-container'>
              <div className='event-details-attendees-header'>
                {/* Replace hardcoded attendees */}
                Attendees (0)</div>
              <div className='event-details-attendees'>
                {/* Component for attendees? */}
              </div>
            </div>
          </div>
          <div className='event-details-right-container'>
            <div className='event-details-right'>
              <div className='event-details-group'>
                {event.categoryId}
                {/* Event host's group name */}
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
