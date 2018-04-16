import * as React from 'react';

import './style.scss';

import { FILTERS } from '../../config';
import { FilterType } from '../../types/filter';
import FilterToggle from './components/FilterToggle';

interface Props {}

class Filter extends React.Component<Props> {
  render() {
    return (
      <div className="filter">
        Filters
        <div className="filter-list">
          {FILTERS.map(filter => {
            return <FilterToggle key={filter.name} filter={filter} />;
          })}
        </div>
      </div>
    );
  }
}

export default Filter;
