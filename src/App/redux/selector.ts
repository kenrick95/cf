import { EntryReducer } from './reducers';
import { FILTERS } from '../config';

export function getEntries(entriesState: EntryReducer) {
  const items =
    entriesState && entriesState.items && entriesState.items.length > 0
      ? entriesState.items
      : [];
  const filters =
    entriesState && entriesState.activeFilters
      ? Object.keys(entriesState.activeFilters)
      : [];
  let transformedItems = items.slice();
  for (const filterName of filters) {
    const filter = FILTERS.find(filter => filter.name === filterName);
    if (filter) {
      transformedItems = filter.function(transformedItems);
    }
  }

  return transformedItems;
}
