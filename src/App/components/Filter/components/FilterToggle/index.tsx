import * as React from 'react';

import { connect } from 'react-redux';
import { updateFilter } from '../../../../redux/actions';
import { Filter } from '../../../../types/filter';

import './style.scss';

interface PropsFromActions {
  updateFilter: typeof updateFilter;
}
interface Props extends PropsFromActions {
  filter: Filter;
}

class FilterToggle extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleCheck() {
    this.props.updateFilter(this.props.filter);
  }
  render() {
    const { filter } = this.props;
    return (
      <label className="filter-toggle">
        <input type="checkbox" onChange={this.handleCheck} className="filter-toggle-checkbox" />
        <div className="filter-toggle-name">{filter.name}</div>
      </label>
    );
  }
}

export default connect(null, {
  updateFilter
})(FilterToggle);
