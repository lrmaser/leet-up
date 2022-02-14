import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { getGroupDetails, deleteGroup } from '../../store/groups';
import './GroupDetail.css';

const GroupDetailPage = () => {
  const { groupId } = useParams();
  const history = useHistory();
  const group = useSelector(state => state.groups[groupId]);
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();

  const [ join, setJoin ] = useState('Join');

  useEffect(() => {
    dispatch(getGroupDetails(groupId));
  }, [dispatch, groupId]);

  const handleEdit = async (e) => {
    e.preventDefault();
    history.push(`/groups/${groupId}/edit`);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (window.confirm(`Are you sure you'd like to delete ${group.name}?`)) {
      dispatch(deleteGroup(groupId));
      history.push('/groups');
    } else {
      history.push(`/groups/${groupId}`);
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (join === 'Join') {
      setJoin('Joined')
    } else {
      setJoin('Join');
    }
  };

  if (!group) return null;

  // If logged in user owns group and has no events show edit/delete buttons,
  // if logged in user owns group and has events show edit button,
  // if logged in user does not own group, show join button,
  // else show nothing
  let groupButtons = null;
  if (sessionUser && sessionUser.id === group.ownerId && group.Events?.length === 0) {
    groupButtons = (
      <div className='group-details-buttons'>
        <button type='button' onClick={handleEdit}>Edit</button>
        <button type='button' onClick={handleDelete}>Delete</button>
      </div>
    );
  } else if (sessionUser && sessionUser.id === group.ownerId && group.Events?.length > 0) {
    groupButtons = (
      <div className='group-details-buttons'>
        <button type='button' onClick={handleEdit}>Edit</button>
      </div>
    );
  } else if (sessionUser && sessionUser.id !== group.ownerId) {
    groupButtons = (
      <div className='group-details-buttons'>
        <button type='button' onClick={handleJoin}>{join}</button>
      </div>
    );
  } else {
    groupButtons = null;
  }

  return (
    <main className='group-details-main'>
      <div className='group-details-left-container'>
        <div className='group-details-image-details'>
          <div className='group-details-image'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEBsn_UBdDUqkiMUoOQYUjLRQB6D4UC_fdFg&usqp=CAU' alt='Group of People Icons'></img>
          </div>
          <div className='group-details-details-container'>
            <h2 className='group-details-headers'>About</h2>
            <p className='group-details-details'>{group.details}</p>
          </div>
        </div>
        <div className='group-details-past-events-container'>
          <h2 className='group-details-past-events-header'>
            {/* Replace hardcoded past events */}
            Past Events (0)
          </h2>
          <div className='group-details-past-events'>
            {/* Component for past events? */}
          </div>
        </div>
      </div>
      <div className='group-details-right-container'>
        <div className='group-details-right'>
          <h1>{group.name}</h1>
          <span className='group-details-members'>
            {/* Remove hardcoded members */}
            0 members
          </span>
          <span className='group-details-organizer'>
            {/* Find way to check if sessionUser is owner */}
            Organized by {group?.User?.username}
          </span>
          {groupButtons}
        </div>
      </div>
    </main>
  );


};

export default GroupDetailPage;
