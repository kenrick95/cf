import { combineReducers } from 'redux';
import * as types from './actionTypes';
import { EntryDocument } from '../types/entry';
import { Filter } from '../types/filter';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'entries',
  whitelist: ['activeFilters'],
  storage
}; 

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
      const updatedIndex = currentItems.findIndex((entry: EntryDocument) => {
        return entry._id === action.payload.doc._id;
      });
      const currentItem = currentItems[updatedIndex];
      const updatedEntry = {
        ...currentItem,
        ...action.payload.doc
      };
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
      action: {
        type: string;
        payload: { filter: Filter; filterValue?: string };
      }
    ) => {
      const filterName = action.payload.filter.name;
      const filterValue = action.payload.filterValue;
      const newActiveFilters = { ...state.activeFilters };
      if (filterValue) {
        newActiveFilters[filterName] = filterValue ? filterValue : filterName;
      } else {
        if (newActiveFilters[filterName]) {
          delete newActiveFilters[filterName];
        }
      }
      return {
        ...state,
        activeFilters: newActiveFilters
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
  entries: persistReducer(persistConfig, entryReducer)
});

export interface ReduxStore {
  entries: EntryReducer;
}

export default rootReducer;
