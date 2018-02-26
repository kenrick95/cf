import * as types from './actionTypes';

export function addEntry(entry: {
  number: number;
  date: string;
  category: string;
  name: string;
  location: string;
  amount: number;
}) {
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
