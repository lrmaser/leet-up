import { csrfFetch } from './csrf';

const LOAD_GROUPS = '/groups/LOAD_GROUPS';
const ADD_GROUP = '/groups/ADD_GROUP';
const REMOVE_GROUP = '/groups/REMOVE_GROUP';
const EDIT_GROUP = '/groups/EDIT_GROUP';
const SELECTED_GROUP = '/groups/SELECTED_GROUP';

/******************** Action Creators ********************/
const loadGroups = (groups) => {
  return {
    type: LOAD_GROUPS,
    groups
  };
};

const addGroup = (newGroup) => {
  return {
    type: ADD_GROUP,
    newGroup
  };
};

const removeGroup = (groupId) => {
  return {
    type: REMOVE_GROUP,
    groupId
  };
};

const editGroup = (group) => {
  return {
    type: EDIT_GROUP,
    group
  };
};

const selectedGroup = (group) => {
  return {
    type: SELECTED_GROUP,
    group
  };
};

/******************** Thunk Actions ********************/
// GET /api/groups - READ
export const getGroups = () => async (dispatch) => {
  const res = await csrfFetch('/api/groups');

  if (res.ok) {
    const groups = await res.json();
    dispatch(loadGroups(groups));
  }

  return res;
};

// POST /api/groups - CREATE
export const createGroup = (newGroup) => async (dispatch) => {
  const res = await csrfFetch('/api/groups', {
    method: 'POST',
    body: JSON.stringify(newGroup)
  });

  if (res.ok) {
    const group = await res.json();
    dispatch(addGroup(group));
  }

  return res;
};

// DELETE /api/groups/:groupId - DELETE
export const deleteGroup = (groupId) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${groupId}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const group = await res.json();
    dispatch(removeGroup(group.id));
  }

  return res;
};

// PUT /api/groups/:groupId - UPDATE
export const updateGroup = (group) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${group.id}`, {
    method: 'PUT',
    body: JSON.stringify(group)
  });

  if (res.ok) {
    const editedGroup = await res.json();
    dispatch(editGroup(editedGroup));
    return editedGroup;
  }
};

// GET /api/groups/:groupId - READ
export const getGroupDetails = (groupId) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${groupId}`);

  if (res.ok) {
    const group = await res.json();
    dispatch(selectedGroup(group));
  }

  return res;
};

/******************** Reducer ********************/
const initialState = { groups: {} };

const groupReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_GROUPS:
      newState = {...state};
      const groups = {};
      action.groups.forEach(group => groups[group.id] = group);
      newState.groups = groups;
      return newState;
    case ADD_GROUP:
      newState = {
        ...state,
        [action.newGroup.id]: action.newGroup
      };
      return newState;
    case REMOVE_GROUP:
      newState = {...state};
      delete newState[action.groupId];
      return newState;
    case EDIT_GROUP:
      newState = {
        ...state,
        [action.group.id]: action.group
      };
      return newState;
    case SELECTED_GROUP:
      newState = {
        ...state,
        [action.group.id]: {
          ...state[action.group.id],
          ...action.group
        }
      };
      return newState;
    default:
      return state;
  }
};

export default groupReducer;
