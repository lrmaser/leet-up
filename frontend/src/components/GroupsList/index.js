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
};

export default GroupsList;
