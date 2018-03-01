import { pad } from './pad';
export function formatDate(date: Date, format: string) {
  let dateString = format;
  dateString = dateString.replace('yyyy', date.getFullYear() + '');
  dateString = dateString.replace('MM', pad(date.getMonth() + 1 + '', 2, '0'));
  dateString = dateString.replace('dd', pad(date.getDate() + '', 2, '0'));
  return dateString;
}
export const ISO_8601_DATE_FORMAT = 'yyyy-MM-dd';
