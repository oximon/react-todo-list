import Axios from 'axios';

import { ADD_COLOR } from '../actionTypes';

export async function fetchColor(dispatch) {
  const colors = await Axios.get('http://localhost:9999/colors');
  dispatch(addColor(colors.data));
}

export function addColor(payload) {
  return {
    type: ADD_COLOR,
    payload,
  };
}
