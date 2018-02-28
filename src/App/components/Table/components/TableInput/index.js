import React from 'react';
import { connect } from 'react-redux';
import { addEntry } from '../../../../redux/actions';

class TableInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.addEntry({
      number: 5,
      date: '2018-03-01',
      category: 'Breakfast',
      name: 'Bread',
      location: 'Kopitiam',
      amount: 2
    });
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
        <td className="table-input__action">
          <button type="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </td>
      </tr>
    );
  }
}

export default connect(undefined, { addEntry })(TableInput);
