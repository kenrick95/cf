import * as types from './actionTypes';

import { Entry } from '../types/entry';

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
