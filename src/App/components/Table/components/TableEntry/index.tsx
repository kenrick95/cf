import * as React from 'react';
import { Entry } from '../../../../types/entry';

interface Props extends Entry {}

class TableEntry extends React.Component<Props> {
  constructor(props) {
    super(props);
  }
  render() {
    const { number: id, date, category, name, location, amount } = this.props;
    return (
      <tr className="table-entry">
        <td>{id}</td>
        <td>{date}</td>
        <td>{category}</td>
        <td>{name}</td>
        <td>{location}</td>
        <td>{amount}</td>
        <td>&nbsp;</td>
      </tr>
    );
  }
}

export default TableEntry;
