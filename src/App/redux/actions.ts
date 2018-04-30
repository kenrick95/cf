import * as types from './actionTypes';

import { Entry, EntryDocument } from '../types/entry';
import { Filter } from '../types/filter';

export function addEntry(entry: Entry) {
  const _id = `${entry.date}-${entry.number}`;
  return {
    type: types.INSERT_ENTRY,
    payload: {
      doc: {
        ...entry,
        _id
      }
    }
  };
}
export function updateEntry(entry: EntryDocument) {
  return {
    type: types.UPDATE_ENTRY,
    payload: {
      doc: { ...entry }
    }
  };
}
export function deleteEntry(entry: EntryDocument) {
  return {
    type: types.DELETE_ENTRY,
    payload: {
      _id: entry._id
    }
  };
}
export function updateFilter(filter: Filter, filterValue?: string) {
  return {
    type: types.UPDATE_FILTER,
    payload: { filter, filterValue }
  };
}
