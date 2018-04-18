import * as React from 'react';
import { connect } from 'react-redux';
import { formatDate, ISO_8601_DATE_FORMAT } from '../../../../utils/date';
import { Entry, EntryDocument } from '../../../../types/entry';
import Autocomplete from 'react-autocomplete';

import './style.scss';
import { getNamesFromEntries, matchItemToTerm, identityFn } from './util';

interface Props extends Entry {
  handleDateChanged: (e: React.FormEvent<HTMLInputElement>) => void;
  handleCategoryChanged: (e: React.FormEvent<HTMLInputElement>) => void;
  handleNameChanged: (newValue: string) => void;
  handleLocationChanged: (e: React.FormEvent<HTMLInputElement>) => void;
  handleAmountChanged: (e: React.FormEvent<HTMLInputElement>) => void;
  entries: EntryDocument[];
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
      amount,
      entries
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
          <Autocomplete
            value={name}
            inputProps={{
              className: 'table-input__name-input',
              type: 'text',
              required: true
            }}
            onChange={(e: Event, newValue: string) => {
              // TODO This is quite inefficient, see if we can unify onChange and onSelect
              handleNameChanged(newValue);
            }}
            onSelect={handleNameChanged}
            items={getNamesFromEntries(entries)}
            getItemValue={identityFn}
            shouldItemRender={matchItemToTerm}
            renderItem={(item: string, isHighlighted: boolean) => (
              <div
                className={`autocomplete-item ${
                  isHighlighted ? 'autocomplete-item-highlighted' : ''
                }`}
                key={item}
              >
                {item}
              </div>
            )}
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
