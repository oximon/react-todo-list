import {
  ADD_TASK,
  COMPLETE_TOGGLE,
  DELETE_TASK,
  PLUS_TASK,
} from '../actionTypes';
import Axios from 'axios';

export async function fetchTask(dispatch) {
  const tasks = await Axios.get('http://localhost:9999/tasks');
  dispatch(addTask(tasks.data));
}

export function addTask(payload) {
  return {
    type: ADD_TASK,
    payload,
  };
}

export const patchCompleteTask = async (dispatch, id, completed) => {
  const task = await Axios.patch('http://localhost:9999/tasks/' + id, {
    completed: !completed,
  });
  dispatch(toggleComplete(task.data.id));
};

export function toggleComplete(id) {
  return {
    type: COMPLETE_TOGGLE,
    payload: id,
  };
}

export const postTask = async (dispatch, id, text) => {
  const task = await Axios.post('http://localhost:9999/tasks', {
    listId: id,
    text,
  });
  dispatch(plusTask(task.data.listId, task.data.text));
};

export function plusTask(id, text) {
  return {
    type: PLUS_TASK,
    payload: {
      text,
      id,
    },
  };
}

export const fetchDeleteTask = async (dispatch, id) => {
  const task = await Axios.delete('http://localhost:9999/tasks/' + id);
  dispatch(deleteTask(task.data.id));
};

export function deleteTask(id) {
  return {
    type: DELETE_TASK,
    id,
  };
}
