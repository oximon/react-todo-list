import Axios from 'axios';

import { ADD_LIST, DELETE_LIST, EDIT_LIST, PLUS_LIST } from '../actionTypes';

export const fetchList = async (dispatch) => {
  const lists = await Axios.get('http://localhost:9999/lists');
  dispatch(addList(lists.data));
};

export function addList(payload) {
  return {
    type: ADD_LIST,
    payload,
  };
}

export const postList = async (dispatch, name, colorId) => {
  const list = await Axios.post('http://localhost:9999/lists', {
    name,
    colorId,
  });
  dispatch(plusList(list.data.name, list.data.colorId));
};

export function plusList(text, color) {
  return {
    type: PLUS_LIST,
    payload: {
      text,
      color,
    },
  };
}

export const patchList = async (dispatch, name, id) => {
  const list = await Axios.patch('http://localhost:9999/lists/' + id, {
    name: name,
  });
  dispatch(editList(list.data.name, list.data.id));
};

export function editList(text, id) {
  return {
    type: EDIT_LIST,
    payload: {
      text,
      id,
    },
  };
}

export const fetchDeleteList = async (dispatch, id) => {
	const list = await Axios.delete('http://localhost:9999/lists/' + id);
	dispatch(deleteList(list.data.id))
}

export function deleteList(id) {
  return {
    type: DELETE_LIST,
    id,
  };
}
