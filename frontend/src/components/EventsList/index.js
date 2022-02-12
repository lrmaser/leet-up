import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getEvents } from '../../store/events';
import EventDetail from './EventDetail';
import './EventsList.css';

const EventsList = () => {
  const dispatch = useDispatch();

  const eventsObj = useSelector(state => state.events.events);
  const events = Object.values(eventsObj);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  let eventsList;
  if (events.length > 0) {
    eventsList = (
      events.map(event => (
        <EventDetail key={event.id} id={event.id} image={event.image} date={event.date} eventName={event.name} groupName={event.Group.name}/>
      ))
    );
  } else {
    eventsList = (
      <div className='event-list-no-events'>
        <span>There are currently no upcoming events!</span>
      </div>
    );
  }

  return (
    <main className='event-list-main'>
      <div className='event-list-container'>
        <div className='event-list-headers'>
          <Link to='/events'>Events</Link>
          <Link to='/groups'>Groups</Link>
        </div>
        <div className='event-list-contents'>
          {eventsList}
        </div>
      </div>
    </main>
  );
};

export default EventsList;
