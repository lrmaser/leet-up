import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getGroups } from '../../store/groups';
import GroupDetail from './GroupDetail';
import './GroupsList.css';

const GroupsList = () => {
  const dispatch = useDispatch();

  const groupsObj = useSelector(state => state.groups.groups);
  const groups = Object.values(groupsObj);

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  let groupsList;
  if (groups.length > 0) {
    groupsList = (
      groups.map(group => (
        <GroupDetail key={group.id} id={group.id} name={group.name} details={group.details}/>
      ))
    );
  } else {
    groupsList = (
      <div className='group-list-no-groups'>
        <span>There are currently no groups!</span>
      </div>
    );
  }

  return (
    <main className='group-list-main'>
      <div className='group-list-container'>
        <div className='group-list-headers'>
          <Link to='/events'>Events</Link>
          <Link to='/groups'>Groups</Link>
        </div>
        <div className='group-list-contents'>
          {groupsList}
        </div>
      </div>
    </main>
  );
};

export default GroupsList;
