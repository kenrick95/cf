import { combineReducers } from 'redux';
import * as types from './actionTypes';

const initialState = {
  items: [],
};

function entryReducer(state = initialState, action) {
  const actionMatcher = {
    [types.BATCH_INSERT_ENTRY]: (state, action) => {
      return {
        items: state.items.concat(action.payload.docs)
      }
    }
  }
  if (action && action.type && action.type in actionMatcher) {
    const actionReducer = actionMatcher[action.type];
    return actionReducer(state, action);
  }
  return state;
}

const rootReducer = combineReducers({
  entries: entryReducer
});

export default rootReducer;
