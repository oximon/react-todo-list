import {
  ADD_TASK,
  COMPLETE_TOGGLE,
  DELETE_TASK,
  EDIT_DATE,
  EDIT_TASK,
  PLUS_TASK,
  TaskActionTypes,
  TaskState,
} from '../actionTypes';

const initialState: TaskState = {
  tasks: [],
  searchedTask: '',
};

const taskReducer = (
  state = initialState,
  action: TaskActionTypes
): TaskState => {
  switch (action.type) {
    case ADD_TASK: {
      return {
        ...state,
        tasks: action.payload,
      };
    }
    case COMPLETE_TOGGLE: {
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          if (action.payload.id === item.id) {
            return {
              ...item,
              completed: !item.completed,
            };
          }
          return item;
        }),
      };
    }
    case PLUS_TASK: {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            listId: action.payload.listId,
            text: action.payload.text,
            completed: false,
            id: action.payload.id,
            date: action.payload.date,
          },
        ],
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    }
    case EDIT_TASK: {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (action.payload.id === task.id) {
            return {
              ...task,
              text: action.payload.text,
            };
          }
          return task;
        }),
      };
    }
    case EDIT_DATE: {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (action.payload.id === task.id) {
            return {
              ...task,
              date: action.payload.date,
            };
          }
          return task;
        }),
      };
    }
    default:
      return state;
  }
};

export default taskReducer;
