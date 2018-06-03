import * as React from 'react';

import { connect } from 'react-redux';
import { updateFilter } from '../../../../../../redux/actions';
import { Filter } from '../../../../../../types/filter';
import { ReduxStore } from '../../../../../../redux/reducers';

import './style.scss';

interface PropsFromActions {
  updateFilter: typeof updateFilter;
}
interface PropsFromStore {
  isFilterActive: boolean;
}
interface Props extends PropsFromActions, PropsFromStore {
  filter: Filter;
}

class FilterToggle extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleCheck() {
    const { isFilterActive, filter } = this.props;
    this.props.updateFilter(filter, isFilterActive ? null : filter.name);
  }
  render() {
    const { filter, isFilterActive } = this.props;
    return (
      <>
        <input
          type="checkbox"
          onChange={this.handleCheck}
          className="filter-toggle-checkbox"
          id={filter.name}
          checked={isFilterActive}
        />
        <label className="filter-toggle-name" htmlFor={filter.name}>
          {filter.name}
        </label>
      </>
    );
  }
}

function mapStateToProps(state: ReduxStore, ownProps: Props): PropsFromStore {
  const { filter } = ownProps;
  const isFilterActive = state.entries
    ? !!state.entries.activeFilters[filter.name]
    : false;
  return {
    isFilterActive
  };
}
export default connect<PropsFromStore, PropsFromActions>(
  mapStateToProps,
  {
    updateFilter
  }
)(FilterToggle);
