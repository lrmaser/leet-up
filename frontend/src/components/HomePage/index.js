import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getEvents } from '../../store/events';
import './Home.css';

const HomePage = () => {
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
          {/* /signup if not logged in, /groups if logged in */}
          <Link to=''>
            <h3>Join a Group</h3>
          </Link>
          <p>Find your fellow coders in your areas of interest.</p>
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
          <Link>
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
      {/* Show only 4 of the soonest events */}
      <div className='home-events-container'>
        <div className='home-event'>
          <Link>
            <div className='home-event-image'>
              <img></img>
            </div>
            <div className='home-event-info'>
              <div className='home-event-date'></div>
              <p className='home-event-name'></p>
              <div className='home-event-group'></div>
            </div>
          </Link>
        </div>
        <div className='home-event'>
          <Link>
            <div className='home-event-image'>
              <img></img>
            </div>
            <div className='home-event-info'>
              <div className='home-event-date'></div>
              <p className='home-event-name'></p>
              <div className='home-event-group'></div>
            </div>
          </Link>
        </div>
        <div className='home-event'>
          <Link>
            <div className='home-event-image'>
              <img></img>
            </div>
            <div className='home-event-info'>
              <div className='home-event-date'></div>
              <p className='home-event-name'></p>
              <div className='home-event-group'></div>
            </div>
          </Link>
        </div>
        <div className='home-event'>
          <Link>
            <div className='home-event-image'>
              <img></img>
            </div>
            <div className='home-event-info'>
              <div className='home-event-date'></div>
              <p className='home-event-name'></p>
              <div className='home-event-group'></div>
            </div>
          </Link>
        </div>
      </div>
      <div className='home-popular-groups-container'>
        <div className='home-popular-groups'>
          <h2>Popular Groups</h2>
        </div>
        <div className='home-explore-groups'>
          <Link to='/groups'>Explore more groups...</Link>
        </div>
      </div>
      {/* Show only 3 of whichever groups */}
      <div className='home-groups-container'>
        <div className='home-group'>
          <Link>
            <div className='home-group-image'>
              <img></img>
            </div>
            <div className='home-group-name'>
              <h3></h3>
            </div>
          </Link>
        </div>
        <div className='home-group'>
          <Link>
            <div className='home-group-image'>
              <img></img>
            </div>
            <div className='home-group-name'>
              <h3></h3>
            </div>
          </Link>
        </div>
        <div className='home-group'>
          <Link>
            <div className='home-group-image'>
              <img></img>
            </div>
            <div className='home-group-name'>
              <h3></h3>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
