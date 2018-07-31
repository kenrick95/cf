import { EntryDocument } from '../../../../types/entry';

function getFieldSet(entries: EntryDocument[], fieldName: keyof EntryDocument) {
  const set = new Set();
  const count = new Map();
  for (const entry of entries) {
    set.add(entry[fieldName]);
    if (count.has(entry[fieldName])) {
      count.set(entry[fieldName], count.get(entry[fieldName]) + 1)
    } else {
      count.set(entry[fieldName], 1)
    }
  }
  const arraySet = Array.from(set);
  arraySet.sort((entryA: EntryDocument, entryB: EntryDocument) => {
    if (count.get(entryA) < count.get(entryB)) {
      return 1;
    } else if (count.get(entryA) === count.get(entryB)) {
      return 0;
    } else {
      return -1;
    }
  })

  return arraySet;
}
export function getNamesFromEntries(entries: EntryDocument[]) {
  return getFieldSet(entries, 'name');
}
export function getCategoriesFromEntries(entries: EntryDocument[]) {
  return getFieldSet(entries, 'category');
}
export function getLocationsFromEntries(entries: EntryDocument[]) {
  return getFieldSet(entries, 'location');
}

export function matchItemToTerm(item: string, term: string) {
  return item.toLowerCase().indexOf(term.toLowerCase()) !== -1;
}
export function identityFn<T>(item: T): T {
  return item;
}
