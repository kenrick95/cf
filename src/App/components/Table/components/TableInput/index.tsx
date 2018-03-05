import * as React from 'react';
import { connect } from 'react-redux';
import { formatDate, ISO_8601_DATE_FORMAT } from '../../../../utils/date';
import { Entry } from '../../../../types/entry';

import './style.scss';

interface Props extends Entry {
  handleDateChanged: (e: React.FormEvent<HTMLInputElement>) => void;
  handleCategoryChanged: (e: React.FormEvent<HTMLInputElement>) => void;
  handleNameChanged: (e: React.FormEvent<HTMLInputElement>) => void;
  handleLocationChanged: (e: React.FormEvent<HTMLInputElement>) => void;
  handleAmountChanged: (e: React.FormEvent<HTMLInputElement>) => void;
}

class TableInput extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      number,
      handleDateChanged,
      handleCategoryChanged,
      handleNameChanged,
      handleLocationChanged,
      handleAmountChanged,
      date,
      category,
      name,
      location,
      amount
    } = this.props;
    return (
      <tr className="table-input">
        <td className="table-input__id">
          <input
            className="table-input__id-input"
            type="number"
            disabled
            value={number}
          />
        </td>
        <td className="table-input__date">
          <input
            className="table-input__date-input"
            type="date"
            required
            value={date}
            onChange={handleDateChanged}
          />
        </td>
        <td className="table-input__category">
          <input
            className="table-input__category-input"
            type="text"
            required
            value={category}
            onChange={handleCategoryChanged}
          />
        </td>
        <td className="table-input__name">
          <input
            className="table-input__name-input"
            type="text"
            required
            value={name}
            onChange={handleNameChanged}
          />
        </td>
        <td className="table-input__location">
          <input
            className="table-input__location-input"
            type="text"
            required
            value={location}
            onChange={handleLocationChanged}
          />
        </td>
        <td className="table-input__amount">
          <input
            className="table-input__amount-input"
            type="number"
            step="0.01"
            min="0.00"
            required
            value={amount}
            onChange={handleAmountChanged}
          />
        </td>
        <td className="table-input__action">
          <button type="submit">Submit</button>
        </td>
      </tr>
    );
  }
}

export default TableInput;
