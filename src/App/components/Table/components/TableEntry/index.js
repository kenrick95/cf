import React from 'react';

class TableEntry extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { id, date, category, name, location, amount } = this.props;
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
