import { Filter, FilterType } from './types/filter';

export const FILTERS: Filter[] = [
  {
    name: 'even',
    type: FilterType.Toggle,
    function: input => {
      return input.filter((v, i) => i % 2 === 0);
    }
  }
];
