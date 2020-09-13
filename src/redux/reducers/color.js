import { ADD_COLOR } from '../actionTypes';

const initialState = {
  colors: [],
};

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COLOR: {
      return {
        ...state,
        colors: action.payload,	
      };
    }
    default:
      return state;
  }
};

export default colorReducer;
