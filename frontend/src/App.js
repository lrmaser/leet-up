import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import * as sessionActions from './store/session';
import { getEvents } from './store/events';
import { getGroups } from './store/groups';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import SignupFormPage from './components/SignupFormPage';
import EventsList from './components/EventsList';
import EventDetailPage from './components/EventDetailPage';
import EventFormPage from './components/EventFormPage';
import EditEventForm from './components/EditEventForm';
import GroupsList from './components/GroupsList';
import GroupDetailPage from './components/GroupDetailPage';
import GroupFormPage from './components/GroupFormPage';
import EditGroupForm from './components/EditGroupForm';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();

  const events = useSelector(state => state.events.events);
  const groups = useSelector(state => state.groups.groups);

  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(dispatch(getEvents()))
      .then(dispatch(getGroups()))
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className='wrapper'>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>

            <Route path='/signup'>
              <SignupFormPage />
            </Route>

            <Route exact path='/events'>
              <EventsList />
            </Route>

            <Route path='/events/new'>
              <EventFormPage />
            </Route>

            <Route path='/events/:eventId/edit'>
              <EditEventForm events={events} />
            </Route>

            <Route path='/events/:eventId'>
              <EventDetailPage />
            </Route>

            <Route exact path='/groups'>
              <GroupsList />
            </Route>

            <Route path='/groups/new'>
              <GroupFormPage />
            </Route>

            <Route path='/groups/:groupId/edit'>
              <EditGroupForm groups={groups} />
            </Route>

            <Route path='/groups/:groupId'>
              <GroupDetailPage />
            </Route>

            <Route>
              404 Not Found!
            </Route>
          </Switch>
        )}
        <div className='push'></div>
      </div>
      <Footer />
    </>
  );
}

export default App;
