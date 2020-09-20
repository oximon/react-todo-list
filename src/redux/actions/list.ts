import Axios from 'axios';

import {
  ADD_LIST,
  DELETE_LIST,
  EDIT_LIST,
  ListActionTypes,
	PLUS_LIST,
	List,
} from '../actionTypes';

export const fetchList = async (dispatch: any) => {
  const lists = await Axios.get('http://localhost:9999/lists');
  dispatch(addList(lists.data));
};

export function addList(payload: List[]): ListActionTypes {
  return {
    type: ADD_LIST,
    payload,
  };
}

export const postList = async (dispatch: any, name: string, colorId: number) => {
  const list = await Axios.post('http://localhost:9999/lists', {
    name,
    colorId,
  });
  dispatch(plusList(list.data.name, list.data.colorId));
};

export function plusList(text: string, color: number): ListActionTypes {
  return {
    type: PLUS_LIST,
    payload: {
      text,
      color,
    },
  };
}

export const patchList = async (dispatch: any, name: string, id: number) => {
  const list = await Axios.patch('http://localhost:9999/lists/' + id, {
    name: name,
  });
  dispatch(editList(list.data.name, list.data.id));
};

export function editList(text: string, id: number): ListActionTypes {
  return {
    type: EDIT_LIST,
    payload: {
      text,
      id,
    },
  };
}

export const fetchDeleteList = async (dispatch: any, id: number) => {
  const list = await Axios.delete('http://localhost:9999/lists/' + id);
  dispatch(deleteList(list.data.id));
};

export function deleteList(id: number): ListActionTypes {
  return {
    type: DELETE_LIST,
    payload: { id },
  };
}
