import { combineReducers } from 'redux';
import * as types from './actionTypes';
import { EntryDocument } from '../types/entry';

export type EntryReducer = {
  items: EntryDocument[];
};
const initialState = {
  items: []
};

function entryReducer(state = initialState, action) {
  const actionMatcher = {
    [types.INSERT_ENTRY]: (state, action) => {
      return {
        items: state.items.concat([action.payload.doc])
      };
    },
    [types.BATCH_INSERT_ENTRY]: (state, action) => {
      return {
        items: state.items.concat(action.payload.docs)
      };
    }
  };
  if (action && action.type && action.type in actionMatcher) {
    const actionReducer = actionMatcher[action.type];
    return actionReducer(state, action);
  }
  return state;
}

const rootReducer = combineReducers({
  entries: entryReducer
});

export interface ReduxStore {
  entries: EntryReducer;
}

export default rootReducer;
