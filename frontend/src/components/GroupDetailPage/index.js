import React, { useEffect } from 'react';
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

  useEffect(() => {
    dispatch(getGroupDetails(groupId));
  }, [dispatch, groupId]);

  const handleEdit = async (e) => {
    e.preventDefault();
    history.push(`/groups/${groupId}/edit`);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deleteGroup(groupId));
    history.push('/groups');
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    // TODO
  };

  if (!group) return null;

  // If logged in user owns group show edit/delete buttons,
  // if logged in user does not own group, show join button,
  // else show nothing
  let groupButtons;
  // TODO, may need workaround to grab sessionUser id as data from create group form
  groupButtons = null;

  return (
    <main className='group-details-main'>
      <div className='group-details-left-container'>
        <div className='group-details-image-details'>
          <div className='group-details-image'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmiX6KlsV8U1SURHBcVTfPRgqyMUctbciwCg&usqp=CAU' alt='Group of People Icons'></img>
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
            Organized by
          </span>
          {groupButtons}
        </div>
      </div>
    </main>
  );


};

export default GroupDetailPage;
