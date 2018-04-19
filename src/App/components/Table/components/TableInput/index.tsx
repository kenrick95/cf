import * as React from 'react';
import { connect } from 'react-redux';
import { formatDate, ISO_8601_DATE_FORMAT } from '../../../../utils/date';
import { Entry, EntryDocument } from '../../../../types/entry';
import Autocomplete from 'react-autocomplete';

import AutocompleteItem from './components/AutocompleteItem';
import { matchItemToTerm, identityFn } from './util';

import './style.scss';

interface Props extends Entry {
  handleDateChanged: (e: React.FormEvent<HTMLInputElement>) => void;
  handleCategoryChanged: (newValue: string) => void;
  handleNameChanged: (newValue: string) => void;
  handleLocationChanged: (newValue: string) => void;
  handleAmountChanged: (e: React.FormEvent<HTMLInputElement>) => void;
  autocompleteNames: string[];
  autocompleteCategories: string[];
  autocompleteLocations: string[];
}

class TableInput extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleCategoryInputChanged = (
    e: React.FormEvent<HTMLInputElement>,
    newValue: string
  ) => {
    const { handleCategoryChanged } = this.props;
    handleCategoryChanged(newValue);
  };
  handleNameInputChanged = (
    e: React.FormEvent<HTMLInputElement>,
    newValue: string
  ) => {
    const { handleNameChanged } = this.props;
    handleNameChanged(newValue);
  };
  handleLocationInputChanged = (
    e: React.FormEvent<HTMLInputElement>,
    newValue: string
  ) => {
    const { handleLocationChanged } = this.props;
    handleLocationChanged(newValue);
  };
  renderAutocompleteItem = (item: string, isHighlighted: boolean) => {
    return (
      <AutocompleteItem item={item} isHighlighted={isHighlighted} key={item} />
    );
  };

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
      autocompleteNames,
      autocompleteCategories,
      autocompleteLocations
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
          <Autocomplete
            value={category}
            inputProps={{
              className: 'table-input__category-input',
              type: 'text',
              required: true
            }}
            onChange={this.handleCategoryInputChanged}
            onSelect={handleCategoryChanged}
            items={autocompleteCategories}
            getItemValue={identityFn}
            shouldItemRender={matchItemToTerm}
            renderItem={this.renderAutocompleteItem}
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
            onChange={this.handleNameInputChanged}
            onSelect={handleNameChanged}
            items={autocompleteNames}
            getItemValue={identityFn}
            shouldItemRender={matchItemToTerm}
            renderItem={this.renderAutocompleteItem}
          />
        </td>
        <td className="table-input__location">
          <Autocomplete
            value={location}
            inputProps={{
              className: 'table-input__location-input',
              type: 'text',
              required: true
            }}
            onChange={this.handleLocationInputChanged}
            onSelect={handleLocationChanged}
            items={autocompleteLocations}
            getItemValue={identityFn}
            shouldItemRender={matchItemToTerm}
            renderItem={this.renderAutocompleteItem}
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
