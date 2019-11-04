import * as React from 'react';
import { connect } from 'react-redux';
// import { formatDate, ISO_8601_DATE_FORMAT } from '../../../../utils/date';
import { Entry, EntryDocument } from '../../../../types/entry';
import Autosuggest from 'react-autosuggest';

import AutocompleteItem from './components/AutocompleteItem';
import { matchItemToTerm, identityFn } from './util';
import {
  getNamesFromEntries,
  getCategoriesFromEntries,
  getLocationsFromEntries
} from './util';

import './style.scss';
import { ReduxStore } from '../../../../redux/reducers';

interface PropsFromStore {
  names: string[];
  categories: string[];
  locations: string[];
}

interface Props extends Entry, PropsFromStore {
  handleDateChanged: (e: React.FormEvent<HTMLInputElement>) => void;
  handleCategoryChanged: (newValue: string) => void;
  handleNameChanged: (newValue: string) => void;
  handleLocationChanged: (newValue: string) => void;
  handleAmountChanged: (e: React.FormEvent<HTMLInputElement>) => void;

  showCancelButton: boolean;
  handleCancelButtonClicked: (e: React.FormEvent<HTMLButtonElement>) => void;
}

interface State {
  suggestedNames: string[];
  suggestedCategories: string[];
  suggestedLocations: string[];
}

class TableInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      suggestedNames: props.names || [],
      suggestedCategories: props.categories || [],
      suggestedLocations: props.locations || []
    };
  }

  handleSuggestedNamesFetchRequested = ({ value }) => {
    const { names } = this.props;
    this.setState({
      suggestedNames: names.filter(name => {
        return matchItemToTerm(name, value);
      })
    });
  };
  handleSuggestedCategoriesFetchRequested = () => {
    this.setState({
      suggestedCategories: []
    });
  };
  handleSuggestedLocationsFetchRequested = () => {
    this.setState({
      suggestedLocations: []
    });
  };

  handleSuggestedNamesClearRequested = () => {
    this.setState({
      suggestedNames: []
    });
  };
  handleSuggestedCategoriesClearRequested = () => {
    this.setState({
      suggestedCategories: []
    });
  };
  handleSuggestedLocationsClearRequested = () => {
    this.setState({
      suggestedLocations: []
    });
  };

  handleCategoryInputChanged = (
    e: React.FormEvent<HTMLInputElement>,
    { newValue }: { newValue: string }
  ) => {
    const { handleCategoryChanged } = this.props;
    handleCategoryChanged(newValue);
  };
  handleNameInputChanged = (
    e: React.FormEvent<HTMLInputElement>,
    { newValue }: { newValue: string }
  ) => {
    const { handleNameChanged } = this.props;
    handleNameChanged(newValue);
  };
  handleLocationInputChanged = (
    e: React.FormEvent<HTMLInputElement>,
    { newValue }: { newValue: string }
  ) => {
    const { handleLocationChanged } = this.props;
    handleLocationChanged(newValue);
  };
  renderAutocompleteItem = (item: string, isHighlighted: boolean) => {
    console.log('renderAutocompleteItem', item, isHighlighted)
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
      showCancelButton,
      handleCancelButtonClicked
    } = this.props;
    const {
      suggestedCategories,
      suggestedNames,
      suggestedLocations
    } = this.state;
    console.log('suggestedNames', suggestedNames)
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
          <Autosuggest
            inputProps={{
              className: 'table-input__category-input',
              type: 'text',
              required: true,
              value: category,
              onChange: this.handleCategoryInputChanged
            }}
            onSuggestionSelected={handleCategoryChanged}
            onSuggestionsClearRequested={
              this.handleSuggestedCategoriesClearRequested
            }
            onSuggestionsFetchRequested={
              this.handleSuggestedCategoriesFetchRequested
            }
            suggestions={suggestedCategories}
            getSuggestionValue={identityFn}
            renderSuggestion={this.renderAutocompleteItem}
            highlightFirstSuggestion={true}
          />
        </td>
        <td className="table-input__name">
          <Autosuggest
            inputProps={{
              className: 'table-input__name-input',
              type: 'text',
              required: true,
              value: name,
              onChange: this.handleNameInputChanged
            }}
            onSuggestionSelected={handleNameChanged}
            onSuggestionsClearRequested={
              this.handleSuggestedNamesClearRequested
            }
            onSuggestionsFetchRequested={
              this.handleSuggestedNamesFetchRequested
            }
            suggestions={suggestedNames}
            getSuggestionValue={identityFn}
            renderSuggestion={this.renderAutocompleteItem}
            highlightFirstSuggestion={true}
          />
        </td>
        <td className="table-input__location">
          <Autosuggest
            inputProps={{
              className: 'table-input__location-input',
              type: 'text',
              required: true,
              value: location,
              onChange: this.handleLocationInputChanged
            }}
            onSuggestionSelected={handleLocationChanged}
            onSuggestionsClearRequested={
              this.handleSuggestedLocationsClearRequested
            }
            onSuggestionsFetchRequested={
              this.handleSuggestedLocationsFetchRequested
            }
            suggestions={suggestedLocations}
            getSuggestionValue={identityFn}
            renderSuggestion={this.renderAutocompleteItem}
            highlightFirstSuggestion={true}
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
          {showCancelButton ? (
            <button onClick={handleCancelButtonClicked}>Cancel</button>
          ) : null}
          <button type="submit">Submit</button>
        </td>
      </tr>
    );
  }
}

function mapStateToProps(state: ReduxStore): PropsFromStore {
  return {
    categories: getCategoriesFromEntries(state.entries.items),
    names: getNamesFromEntries(state.entries.items),
    locations: getLocationsFromEntries(state.entries.items)
  };
}

export default connect<PropsFromStore>(mapStateToProps)(TableInput);
