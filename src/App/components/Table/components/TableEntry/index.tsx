import * as React from 'react';
import { Entry } from '../../../../types/entry';

import './style.scss';

interface Props extends Entry {}

class TableEntry extends React.Component<Props> {
  constructor(props) {
    super(props);
  }
  render() {
    const { number: id, date, category, name, location, amount } = this.props;
    return (
      <tr className="table-entry">
        <td className="table-entry__id">{id}</td>
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
