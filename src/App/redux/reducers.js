import { combineReducers } from 'redux';

const initialState = {};

function entryReducer(state = initialState, action) {
  return state;
}

const rootReducer = combineReducers({
  entries: entryReducer
});

export default rootReducer;
