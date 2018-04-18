import { EntryDocument } from '../../../../types/entry';

export function getNamesFromEntries(entries: EntryDocument[]) {
  const names = new Set();
  for (const entry of entries) {
    names.add(entry.name);
  }
  return Array.from(names);
}
export function matchItemToTerm(item: string, term: string) {
  return item.toLowerCase().indexOf(term.toLowerCase()) !== -1;
}
export function identityFn<T>(item: T): T {
  return item;
}
