interface EntryCommon {
  number: number;
  date: string;
  category: string;
  name: string;
  location: string;
  amount: number;
}
export interface Entry extends EntryCommon {}
export interface EntryDocument extends EntryCommon {
  _id: string;
}
