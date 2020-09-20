import {
  ADD_TASK,
  COMPLETE_TOGGLE,
  DELETE_TASK,
  EDIT_DATE,
  EDIT_TASK,
  PLUS_TASK,
  Task,
  TaskActionTypes,
} from '../actionTypes';
import Axios from 'axios';

export async function fetchTask(dispatch: any) {
  const tasks = await Axios.get('http://localhost:9999/tasks');
  dispatch(addTask(tasks.data));
}

export function addTask(payload: Task[]): TaskActionTypes {
  return {
    type: ADD_TASK,
    payload,
  };
}

export const patchCompleteTask = async (
  dispatch: any,
  id: number,
  completed: boolean
) => {
  const task = await Axios.patch('http://localhost:9999/tasks/' + id, {
    completed: !completed,
  });
  dispatch(toggleComplete(task.data.id));
};

export function toggleComplete(id: number): TaskActionTypes {
  return {
    type: COMPLETE_TOGGLE,
    payload: { id },
  };
}

export const postTask = async (
  dispatch: any,
  id: number,
  text: string,
  date: string
) => {
  const task = await Axios.post('http://localhost:9999/tasks', {
    listId: id,
    text,
    date,
  });
  dispatch(
    plusTask(task.data.id, task.data.text, task.data.date, task.data.listId)
  );
};

export function plusTask(
  id: number,
  text: string,
  date: string,
  listId: number
): TaskActionTypes {
  return {
    type: PLUS_TASK,
    payload: {
      id,
      text,
      date,
      listId,
    },
  };
}

export const fetchDeleteTask = async (dispatch: any, id: number) => {
  const task = await Axios.delete('http://localhost:9999/tasks/' + id);
  dispatch(deleteTask(task.data.id));
};

export function deleteTask(id: number): TaskActionTypes {
  return {
    type: DELETE_TASK,
    payload: { id },
  };
}

export const patchTask = async (dispatch: any, text: string, id: number) => {
  const list = await Axios.patch('http://localhost:9999/tasks/' + id, {
    text: text,
  });
  dispatch(editTask(list.data.text, list.data.id));
};

export function editTask(text: string, id: number): TaskActionTypes {
  return {
    type: EDIT_TASK,
    payload: {
      text,
      id,
    },
  };
}

export const patchDate = async (dispatch: any, date: string, id: number) => {
  const list = await Axios.patch('http://localhost:9999/tasks/' + id, {
    date: date,
  });
  dispatch(editDate(list.data.date, list.data.id));
};

export function editDate(date: string, id: number): TaskActionTypes {
  return {
    type: EDIT_DATE,
    payload: {
      date,
      id,
    },
  };
}
