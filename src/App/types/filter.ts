import { EntryDocument } from './entry';

export enum FilterType {
  Toggle,
  Date
}
export type FilterFunction = (inputs: EntryDocument[]) => EntryDocument[];
export type Filter = {
  function: FilterFunction;
  name: string;
  type: FilterType;
};
