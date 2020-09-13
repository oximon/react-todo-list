import {
  ADD_TASK,
  COMPLETE_TOGGLE,
  DELETE_TASK,
  PLUS_TASK,
} from '../actionTypes';

const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
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
          if (action.payload === item.id) {
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
            listId: action.payload.id,
            text: action.payload.text,
            completed: false,
            id: state.tasks.length + 1,
          },
        ],
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default taskReducer;
