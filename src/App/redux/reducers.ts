import { combineReducers } from 'redux';
import * as types from './actionTypes';
import { EntryDocument } from '../types/entry';

export type EntryReducer = {
  items: EntryDocument[];
};
const initialState = {
  items: []
};

function entryReducer(state: EntryReducer = initialState, action) {
  const actionMatcher = {
    [types.INSERT_ENTRY]: (state: EntryReducer, action) => {
      return {
        items: state.items.concat([action.payload.doc])
      };
    },
    [types.UPDATE_ENTRY]: (state: EntryReducer, action) => {
      const currentItems = state.items;
      const updatedEntry = action.payload.doc;
      const updatedIndex = currentItems.findIndex(entry => {
        return entry._id === updatedEntry._id;
      });
      return {
        items: [
          ...currentItems.slice(0, updatedIndex),
          updatedEntry,
          ...currentItems.slice(updatedIndex + 1)
        ]
      };
    },
    [types.DELETE_ENTRY]: (state: EntryReducer, action) => {
      const currentItems = state.items;
      const updatedEntry = action.payload.doc;
      const updatedIndex = currentItems.findIndex(entry => {
        return entry._id === updatedEntry._id;
      });
      return {
        items: [
          ...currentItems.slice(0, updatedIndex),
          ...currentItems.slice(updatedIndex + 1)
        ]
      };
    },
    [types.BATCH_INSERT_ENTRY]: (state: EntryReducer, action) => {
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
