import Axios from 'axios';

import { ADD_COLOR, Color, ColorActionType } from '../actionTypes';

export async function fetchColor(dispatch: any) {
  const colors = await Axios.get('http://localhost:9999/colors');
  dispatch(addColor(colors.data));
}

export function addColor(payload: Color[]): ColorActionType {
  return {
    type: ADD_COLOR,
    payload,
  };
}
