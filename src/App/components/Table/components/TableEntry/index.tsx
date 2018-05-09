import * as React from 'react';
import { Entry } from '../../../../types/entry';

import './style.scss';

interface Props extends Entry {
  onDoubleClick: (index: number) => void;
  index: number;
}

class TableEntry extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }
  handleDoubleClick() {
    this.props.onDoubleClick(this.props.index);
  }
  render() {
    const { number, date, category, name, location, amount } = this.props;
    return (
      <tr className="table-entry" onDoubleClick={this.handleDoubleClick}>
        <td className="table-entry__id">{number}</td>
        <td className="table-entry__date">{date}</td>
        <td className="table-entry__category">{category}</td>
        <td className="table-entry__name">{name}</td>
        <td className="table-entry__location">{location}</td>
        <td className="table-entry__amount">{amount.toFixed(2)}</td>
        <td className="table-entry__action">&nbsp;</td>
      </tr>
    );
  }
}

export default TableEntry;
