import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function searchReducer(
  state = initialState.customers,
  action
) {
  switch (action.type) {
    case types.SEARCH_ALL_CUSTOMERS_SUCCESS:
      return action.payload;
   
    default:
      return state;
  }
}
