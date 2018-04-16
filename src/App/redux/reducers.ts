import { combineReducers } from 'redux';
import * as types from './actionTypes';
import { EntryDocument } from '../types/entry';
import { Filter } from '../types/filter';

export type EntryReducer = {
  items: EntryDocument[];
  activeFilters: {
    [name: string]: string;
  };
};
const initialState = {
  items: [] as EntryDocument[],
  activeFilters: {}
};

function entryReducer(
  state: EntryReducer = initialState,
  action: { type: string; payload: any }
) {
  const actionMatcher: {
    [actionName: string]: (
      state: EntryReducer,
      action: { type: string; payload: any }
    ) => EntryReducer;
  } = {
    [types.INSERT_ENTRY]: (
      state: EntryReducer,
      action: { type: string; payload: { doc: EntryDocument } }
    ) => {
      return {
        ...state,
        items: state.items.concat([action.payload.doc])
      };
    },
    [types.UPDATE_ENTRY]: (
      state: EntryReducer,
      action: { type: string; payload: { doc: EntryDocument } }
    ) => {
      const currentItems = state.items;
      const updatedEntry = action.payload.doc;
      const updatedIndex = currentItems.findIndex((entry: EntryDocument) => {
        return entry._id === updatedEntry._id;
      });
      return {
        ...state,
        items: [
          ...currentItems.slice(0, updatedIndex),
          updatedEntry,
          ...currentItems.slice(updatedIndex + 1)
        ]
      };
    },
    [types.DELETE_ENTRY]: (
      state: EntryReducer,
      action: { type: string; payload: { _id: string } }
    ) => {
      const currentItems = state.items;
      const actionId = action.payload._id;

      let updatedIndex = 0;
      let updatedEntry = null;
      for (let i = 0; i < currentItems.length; i++) {
        const item = currentItems[i];
        if (item._id === actionId) {
          updatedEntry = item;
          updatedIndex = i;
          break;
        }
      }
      return {
        ...state,
        items: [
          ...currentItems.slice(0, updatedIndex),
          {
            ...updatedEntry,
            deleted: true
          },
          ...currentItems.slice(updatedIndex + 1)
        ]
      };
    },
    [types.BATCH_INSERT_ENTRY]: (
      state: EntryReducer,
      action: { type: string; payload: { docs: EntryDocument[] } }
    ) => {
      return {
        ...state,
        items: state.items.concat(action.payload.docs)
      };
    },
    [types.UPDATE_FILTER]: (
      state: EntryReducer,
      action: { type: string; payload: { filter: Filter } }
    ) => {
      return {
        ...state,
        activeFilters: {
          ...state.activeFilters,
          [action.payload.filter.name]: action.payload.filter.name
        }
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
