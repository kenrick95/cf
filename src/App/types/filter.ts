import { EntryDocument } from './entry';

export enum FilterType {
  Boolean,
  Value
}
export type FilterFunction = (
  entries: EntryDocument[],
  selectedValue: string
) => EntryDocument[];
export type Filter = {
  function: FilterFunction;
  name: string;
  type: FilterType;
  values?: (entries: EntryDocument[]) => string[];
};
