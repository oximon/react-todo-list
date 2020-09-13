import { ADD_LIST, DELETE_LIST, EDIT_LIST, PLUS_LIST } from '../actionTypes';

const initialState = {
  lists: [],
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST: {
      return {
        ...state,
        lists: action.payload,
      };
    }
    case PLUS_LIST: {
      return {
        ...state,
        lists: [
          ...state.lists,
          {
            name: action.payload.text,
            colorId: action.payload.color,
            id: state.lists.length + 1,
          },
        ],
      };
    }
    case EDIT_LIST: {
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (action.payload.id === list.id) {
            return {
              ...list,
              name: action.payload.text,
            };
          }
          return list;
        }),
      };
    }
    case DELETE_LIST: {
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default listReducer;
