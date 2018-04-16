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
    payload: { ...entry }
  };
}
export function deleteEntry(entry: EntryDocument) {
  return {
    type: types.DELETE_ENTRY,
    payload: { ...entry }
  };
}
export function updateFilter(filter: Filter) {
  return {
    type: types.UPDATE_FILTER,
    payload: { filter }
  };
}
