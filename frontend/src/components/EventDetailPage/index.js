import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getEventDetails } from '../../store/events';

const EventDetailPage = () => {
  const { eventId } = useParams();
  const event = useSelector(state => state.events[eventId]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventDetails(eventId));
  }, [dispatch, eventId]);

  return (
    <div>
      <h1>Event Detail</h1>
      <p>{event.id}</p>
      <p>{event.hostId}</p>
      <p>{event.categoryId}</p>
      <p>{event.name}</p>
      <p>{event.date}</p>
      <p>{event.capacity}</p>
      <p>{event.image}</p>
      <p>{event.details}</p>
    </div>
  );
};

export default EventDetailPage;
