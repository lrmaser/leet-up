import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import SignupFormPage from './components/SignupFormPage';
import EventsList from './components/EventsList';
import EventDetailPage from './components/EventDetailPage';

function App() {
  const dispatch = useDispatch();
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/events'>
            <EventsList />
          </Route>
          <Route path='/events/:eventId'>
            <EventDetailPage />
          </Route>
          <Route>
            404 Not Found!
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
