import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getEvents } from '../../store/events';
import EventDetail from './EventDetail';

const EventsList = () => {
  const dispatch = useDispatch();

  const eventsObj = useSelector(state => state.events.events);
  const events = Object.values(eventsObj);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  return (
    <div>
      <div>
        <Link to='/events'>Events</Link>
        <Link to='/groups'>Groups</Link>
      </div>
      <div>
        {events.map(({ id, image, date, name, categoryId }) => (
          <EventDetail key={id} id={id} image={image} date={date} name={name} categoryId={categoryId}/>
        ))}
      </div>
    </div>
  );
};

export default EventsList;