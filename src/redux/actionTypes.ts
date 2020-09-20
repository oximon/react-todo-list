// LIST

export const ADD_LIST = 'ADD_LIST';
export const PLUS_LIST = 'PLUS_LIST';
export const EDIT_LIST = 'EDIT_LIST';
export const DELETE_LIST = 'DELETE_LIST';

export interface List {
  name: string;
  colorId: number;
  id: number;
}

export interface ListState {
  lists: List[];
}

interface AddListAction {
  type: typeof ADD_LIST;
  payload: List[];
}

interface PlusListAction {
  type: typeof PLUS_LIST;
  payload: {
    text: string;
    color: number;
  };
}

interface EditListAction {
  type: typeof EDIT_LIST;
  payload: {
    text: string;
    id: number;
  };
}

interface DeleteListAction {
  type: typeof DELETE_LIST;
  payload: {
    id: number;
  };
}

export type ListActionTypes =
  | AddListAction
  | PlusListAction
  | EditListAction
  | DeleteListAction;

// TASK

export const ADD_TASK = 'ADD_TASK';
export const COMPLETE_TOGGLE = 'COMPLETE_TOGGLE';
export const PLUS_TASK = 'PLUS_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const EDIT_DATE = 'EDIT_DATE';

export interface Task {
  listId: number;
  text: string;
  id: number;
  completed: boolean;
  date: string;
}

export interface TaskState {
  tasks: Task[];
  searchedTask: string;
}

interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: Task[];
}

interface PlusTaskAction {
  type: typeof PLUS_TASK;
  payload: {
    text: string;
    id: number;
    date: string;
    listId: number;
  };
}

interface ToggleTaskAction {
  type: typeof COMPLETE_TOGGLE;
  payload: {
    id: number;
  };
}

interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: {
    id: number;
  };
}

interface EditTaskAction {
  type: typeof EDIT_TASK;
  payload: {
    text: string;
    id: number;
  };
}

interface EditDateAction {
  type: typeof EDIT_DATE;
  payload: {
    date: string;
    id: number;
  };
}

export type TaskActionTypes =
  | AddTaskAction
  | PlusTaskAction
  | ToggleTaskAction
  | EditTaskAction
  | EditDateAction
  | DeleteTaskAction;

// COLOR

export const ADD_COLOR = 'ADD_COLOR';

export interface Color {
  id: number;
  hex: string;
  name: string;
}

export interface ColorState {
  colors: Color[];
}

interface AddColorAction {
  type: typeof ADD_COLOR;
  payload: Color[];
}

export type ColorActionType = AddColorAction;
