import React from 'react';

class TableInput extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { id, date, category, name, location, amount } = this.props;
    return (
      <tr className="table-input">
        <td className="table-input__id">
          <input className="table-input__id" type="number" disabled />
        </td>
        <td className="table-input__date">
          <input className="table-input__date-input" type="date" required />
        </td>
        <td className="table-input__category">
          <input className="table-input__category-input" type="text" required />
        </td>
        <td className="table-input__name">
          <input className="table-input__name-input" type="text" required />
        </td>
        <td className="table-input__location">
          <input className="table-input__location-input" type="text" required />
        </td>
        <td className="table-input__amount">
          <input
            className="table-input__amount-input"
            type="number"
            step="0.01"
            min="0.00"
            required
          />
        </td>
        <td className="table-input__action">&nbsp;</td>
      </tr>
    );
  }
}

export default TableInput;
