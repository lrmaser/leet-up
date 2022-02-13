import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getEvents } from '../../store/events';
import { getGroups } from '../../store/groups';
import './Home.css';

const selectFourEvents = (sortedEvents) => {
  let selectedEvents = [];

  for (let i = 0; i <= 3; i++) {
    selectedEvents.push(sortedEvents[i]);
  }

  return selectedEvents;
};

const formatDate = (date) => {
  const dateString = new Date(date).toDateString();
  const dateStringSplit = dateString.split(' ');
  const formattedDate = `${dateStringSplit[0]}, ${dateStringSplit[1]} ${dateStringSplit[2]}`;
  return formattedDate;
};

const formatTime = (time) => {
  const timeString = new Date(time).toLocaleTimeString();
  const timeStringSplit = timeString.split(':');
  const formattedTime = `${timeStringSplit[0]}:${timeStringSplit[1]} ${timeStringSplit[2][3]}M`;
  return formattedTime;
};

const selectThreeGroups = (groups) => {
  let selectedGroups = [];

  for (let i = 0; i <= 2; i++) {
    selectedGroups.push(groups[i]);
  }

  return selectedGroups
};

const HomePage = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const eventsObj = useSelector(state => state.events.events);
  const events = Object.values(eventsObj);
  const upcomingEvents = events.filter(event => event.date >= new Date().toISOString());
  const upcomingEventsSorted = upcomingEvents.sort((eventA, eventB) =>  new Date(eventA.date) - new Date(eventB.date));
  const selectedEvents = selectFourEvents(upcomingEventsSorted);

  const groupsObj = useSelector(state => state.groups.groups);
  const groups = Object.values(groupsObj);
  const selectedGroups = selectThreeGroups(groups);
  console.log('test', selectedGroups)

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getGroups());
  }, [dispatch]);

  let eventsList;
  if (selectedEvents.length > 0) {
    eventsList = (
      selectedEvents.map(event => (
        event &&
        <div key={event.id} className='home-event'>
          <Link to={`/events/${event.id}`}>
            <div className='home-event-image'>
              <img src={event.image ? event.image : 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'} alt='Event'></img>
            </div>
            <div className='home-event-info'>
              <div className='home-event-date'>{`${formatDate(event.date).toUpperCase()} @ ${formatTime(event.date).toUpperCase()}`}</div>
              <p className='home-event-name'>{event.name}</p>
              <div className='home-event-group'>{event.Group?.name}</div>
            </div>
          </Link>
        </div>
      ))
    );
  } else {
    eventsList = (
      <div className='home-no-events'>
        <span>There are currently no upcoming events!</span>
      </div>
    );
  }

  let groupsList = null;
  if (selectedGroups.length > 0) {
    groupsList = (
      selectedGroups.map(group => (
        group &&
        <div key={group.id} className='home-group'>
          <Link to={`/groups/${group.id}`}>
            <div className='home-group-image'>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEBsn_UBdDUqkiMUoOQYUjLRQB6D4UC_fdFg&usqp=CAU' alt='Group of People Icons'></img>
            </div>
            <div className='home-group-name'>
              <h3>{group.name}</h3>
            </div>
          </Link>
        </div>
      ))
    );
  } else {
    <div className='home-no-groups'>
      <span>There are currently no groups!</span>
    </div>
  }

  return (
    <main className='home-main'>
      <div className='home-about-container'>
        <div className='home-about-description'>
          <h1>Welcome to LeetUp!</h1>
          <p>LeetUp, a clone of Meetup, is a place for developers to find and gather with like-minded peers. Need friends who understand the difference between Java and a cup of java? Create a group! Have you spent hours debugging and need someone to take a look? Join a peer review session! Are you a skilled developer with time on their hands? Host a workshop! Find your community today.</p>
        </div>
        <div className='home-about-image'>
          <img src='https://www.whitesourcesoftware.com/wp-content/media/2021/05/aHViPTcyNTE0JmNtZD1pdGVtZWRpdG9yaW1hZ2UmZmlsZW5hbWU9aXRlbWVkaXRvcmltYWdlXzVlMjA1MWQxOWY2NTUuanBnJnZlcnNpb249MDAwMCZzaWc9NGJhMDhmZWU5ZDQ4ZGVjNjcwNzFlNmFhMDg3NzliNzA3D.jpeg' alt='Cartoon of Developers'></img>
        </div>
      </div>
      <div className='home-how-container'>
        <h2>How LeetUp Works</h2>
        <p>Meet new people through groups and events.</p>
      </div>
      <div className='home-join-find-start-container'>
        <div className='home-join-container'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9CWVtsvt8EJzyXS4cBS8EO6R8QZ3cUi1pKA&usqp=CAU' alt='People Waving to Join Them'></img>
          <Link to={sessionUser ? '/groups' : '/signup'}>
            <h3>Join a Group</h3>
          </Link>
          <p>Find your fellow coders in a variety of fields and interests.</p>
        </div>
        <div className='home-find-container'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe5gVhKVLV1W1zz9eRgqDmGWRjgoeQleGevQ&usqp=CAU' alt='Speaker Event'></img>
          <Link to='/events'>
            <h3>Find an Event</h3>
          </Link>
          <p>From cafe code-alongs to professional networking. There's something for everyone.</p>
        </div>
        <div className='home-start-container'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfc59OBFTv6Jv5ZFlLS1Rn-RitMlNA3CgkvA&usqp=CAU' alt='Group of People'></img>
          {/* /signup if not logged in, /groups/new if logged in */}
          <Link to={sessionUser ? '/groups/new' : '/signup'}>
            <h3>Start a Group</h3>
          </Link>
          <p>Not seeing the right group for you? That's just because you haven't created it yet!</p>
        </div>
      </div>
      <div className='home-join-button-container'>
        <Link to='/signup'>Join LeetUp</Link>
      </div>
      <div className='home-upcoming-events-container'>
        <div className='home-upcoming-events'>
          <h2>Upcoming Events</h2>
        </div>
        <div className='home-explore-events'>
          <Link to='/events'>Explore more events...</Link>
        </div>
      </div>
      <div className='home-events-container'>
        {eventsList}
      </div>
      <div className='home-popular-groups-container'>
        <div className='home-popular-groups'>
          <h2>Popular Groups</h2>
        </div>
        <div className='home-explore-groups'>
          <Link to='/groups'>Explore more groups...</Link>
        </div>
      </div>
      <div className='home-groups-container'>
        {groupsList}
      </div>
    </main>
  );
};

export default HomePage;
