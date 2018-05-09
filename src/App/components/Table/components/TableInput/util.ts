import { EntryDocument } from '../../../../types/entry';

function getFieldSet(entries: EntryDocument[], fieldName: keyof EntryDocument) {
  const set = new Set();
  for (const entry of entries) {
    set.add(entry[fieldName]);
  }
  return Array.from(set);
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
