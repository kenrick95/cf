import * as React from 'react';

import { connect } from 'react-redux';
import { updateFilter } from '../../../../../../redux/actions';
import { Filter } from '../../../../../../types/filter';
import { ReduxStore } from '../../../../../../redux/reducers';
import { EntryDocument } from '../../../../../../types/entry';

import './style.scss';
interface PropsFromActions {
  updateFilter: typeof updateFilter;
}
interface PropsFromParent {
  filter: Filter;
}
interface PropsFromStore {
  filterEntries: string[];
  currentFilterValue: string;
  isFilterActive: boolean;
}
interface Props extends PropsFromStore, PropsFromActions, PropsFromParent {}
interface State {
  currentValueIndex: number;
}

class FilterValue extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentValueIndex: 0
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.currentFilterValue !== this.props.currentFilterValue ||
      prevProps.filterEntries.length !== this.props.filterEntries.length
    ) {
      const { filterEntries, currentFilterValue } = this.props;
      const currentValueIndex = filterEntries.indexOf(currentFilterValue);
      this.setState({
        currentValueIndex
      });
    }
  }
  handleCheck() {
    const { filterEntries, isFilterActive } = this.props;
    this.props.updateFilter(
      this.props.filter,
      isFilterActive ? null : filterEntries[this.state.currentValueIndex]
    );
  }
  handleChange(e: React.FormEvent<HTMLSelectElement>) {
    const { filterEntries, isFilterActive } = this.props;
    const currentValueIndex = filterEntries.indexOf(e.currentTarget.value);
    this.setState({
      currentValueIndex
    });
    if (isFilterActive) {
      this.props.updateFilter(
        this.props.filter,
        filterEntries[currentValueIndex]
      );
    }
  }
  render() {
    const { filterEntries, filter, isFilterActive } = this.props;
    const { currentValueIndex } = this.state;
    return (
      <>
        <input
          type="checkbox"
          onChange={this.handleCheck}
          className="filter-value-checkbox"
          id={filter.name}
          checked={isFilterActive}
        />
        <label className="filter-value-name" htmlFor={filter.name}>
          {filter.name}
        </label>
        <select
          onChange={this.handleChange}
          className="filter-value-select"
          id={filter.name}
          value={filterEntries[currentValueIndex]}
        >
          {filterEntries.map(entry => {
            return (
              <option key={entry} value={entry}>
                {entry}
              </option>
            );
          })}
        </select>
      </>
    );
  }
}

function mapStateToProps(state: ReduxStore, ownProps: Props): PropsFromStore {
  const { filter } = ownProps;
  const entries = state.entries ? state.entries.items : [];
  const currentFilterValue =
    state.entries &&
    state.entries.activeFilters &&
    state.entries.activeFilters[filter.name]
      ? state.entries.activeFilters[filter.name]
      : null;
  const isFilterActive = !!currentFilterValue;
  return {
    filterEntries: filter.values(entries),
    currentFilterValue,
    isFilterActive
  };
}

export default connect<PropsFromStore, PropsFromActions>(
  mapStateToProps,
  {
    updateFilter
  }
)(FilterValue);
