import * as React from 'react';

import './style.scss';

import { FILTERS } from '../../config';
import { FilterType } from '../../types/filter';
import FilterToggle from './components/FilterToggle';
import FilterValue from './components/FilterValue';

interface Props {}

class Filter extends React.Component<Props> {
  render() {
    return (
      <div className="filter">
        Filters
        <div className="filter-list">
          {FILTERS.map(filter => {
            if (filter.type === FilterType.Boolean) {
              return <FilterToggle key={filter.name} filter={filter} />;
            } else if (filter.type === FilterType.Value) {
              return <FilterValue key={filter.name} filter={filter} />;
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

export default Filter;
