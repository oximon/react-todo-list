import { ADD_COLOR, ColorActionType, ColorState } from '../actionTypes';

const initialState: ColorState = {
  colors: [],
};

const colorReducer = (
  state = initialState,
  action: ColorActionType
): ColorState => {
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
