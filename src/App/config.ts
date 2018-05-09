import { Filter, FilterType } from './types/filter';

function pad(number: number): string {
  if (number < 10) {
    return '0' + number;
  }
  return '' + number;
}

export const FILTERS: Filter[] = [
  {
    name: 'Deleted',
    type: FilterType.Boolean,
    function: entries => {
      return entries.filter(entry => {
        return !!entry.deleted;
      });
    }
  },
  {
    name: 'Month',
    type: FilterType.Value,
    values: entries => {
      const valueKeys: Set<string> = new Set();
      for (const entry of entries) {
        const date = new Date(entry.date);
        const month = pad(date.getMonth() + 1);
        const year = date.getFullYear();
        valueKeys.add(year + '-' + month);
      }
      return Array.from(valueKeys);
    },
    function: (entries, selectedFilter) => {
      const selectedMonth = new Date(selectedFilter);
      const selectedNextMonth = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
        1
      );
      return entries.filter(entry => {
        const date = new Date(entry.date);
        return !!date && selectedMonth <= date && date < selectedNextMonth;
      });
    }
  }
];
