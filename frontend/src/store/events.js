import { csrfFetch } from './csrf';

const LOAD_EVENTS = 'events/LOAD_EVENTS';
const ADD_EVENT = 'events/ADD_EVENT';
const REMOVE_EVENT = 'events/REMOVE_EVENT';
const EDIT_EVENT = 'events/EDIT_EVENT';
const SELECTED_EVENT = 'events/SELECTED_EVENT';

/******************** Action Creators ********************/
const loadEvents = (events) => {
  return {
    type: LOAD_EVENTS,
    events
  };
};

const addEvent = (newEvent) => {
  return {
    type: ADD_EVENT,
    newEvent
  };
};

const removeEvent = (eventId) => {
  return {
    type: REMOVE_EVENT,
    eventId
  };
};

const editEvent = (event) => {
  return {
    type: EDIT_EVENT,
    event
  };
};

const selectedEvent = (event) => {
  return {
    type: SELECTED_EVENT,
    event
  };
};

/******************** Thunk Actions ********************/
// GET /api/events - READ
export const getEvents = () => async (dispatch) => {
  const res = await csrfFetch('/api/events');

  if (res.ok) {
    const events = await res.json();
    dispatch(loadEvents(events));
  }

  return res;
};

// POST /api/events - CREATE
export const createEvent = (newEvent) => async (dispatch) => {
  const res = await csrfFetch('/api/events', {
    method: 'POST',
    body: JSON.stringify(newEvent)
  });

  if (res.ok) {
    const event = await res.json();
    dispatch(addEvent(event));
  }

  return res;
};

// DELETE /api/events/:eventId - DELETE
export const deleteEvent = (eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const event = await res.json();
    dispatch(removeEvent(event.id));
  }

  return res;
};

// PUT /api/events/:eventId - UPDATE
export const updateEvent = (event) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${event.id}`, {
    method: 'PUT',
    body: JSON.stringify(event)
  });

  if (res.ok) {
    const editedEvent = await res.json();
    dispatch(editEvent(editedEvent));
    return editedEvent;
  }
};

// GET /api/events/:eventId - READ
export const getEventDetails = (eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}`);

  if (res.ok) {
    const event = await res.json();
    dispatch(selectedEvent(event));
  }

  return res;
};

/******************** Reducer ********************/
const initialState = { events: {} };

// Complete cases
const eventReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_EVENTS:
      newState = {...state};
      const events = {};
      action.events.forEach(event => events[event.id] = event);
      newState.events = events;
      return newState;
    case ADD_EVENT:
      newState = {
        ...state,
        [action.newEvent.id]: action.newEvent
      };
      return newState;
    case REMOVE_EVENT:
      newState = {...state};
      delete newState[action.eventId];
      return newState;
    case EDIT_EVENT:
      newState = {
        ...state,
        [action.event.id]: action.event
      };
      return newState;
    case SELECTED_EVENT:
      newState = {
        ...state,
        [action.event.id]: {
          ...state[action.event.id],
          ...action.event
        }
      };
      return newState;
    default:
      return state;
  }
};

export default eventReducer;
